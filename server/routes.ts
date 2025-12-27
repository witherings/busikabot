import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get message for "today" in Berlin time
  app.get(api.messages.getToday.path, async (req, res) => {
    // Berlin time calculation
    const berlinDate = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Berlin",
    }); // Returns YYYY-MM-DD

    const message = await storage.getMessageByDate(berlinDate);

    if (!message) {
      return res.status(404).json({ message: "No message for today" });
    }

    res.json(message);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      // Handle unique constraint violation (duplicate date)
      if (err instanceof Error && 'code' in err && err.code === '23505') {
         return res.status(400).json({ message: "A message for this date already exists" });
      }
      throw err;
    }
  });

  app.get(api.messages.list.path, async (req, res) => {
    const list = await storage.getAllMessages();
    res.json(list);
  });

  // Send message via Telegram
  app.post(api.messages.sendTelegram.path, async (req, res) => {
    try {
      const input = api.messages.sendTelegram.input.parse(req.body);
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken) {
        return res.status(400).json({ message: "Telegram bot token not configured" });
      }

      if (!chatId) {
        return res.status(400).json({ message: "Telegram chat ID not configured" });
      }

      const text = `${input.time}\n-----\n${input.message}`;
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Telegram API error:", errorData);
        return res.status(400).json({ 
          message: `Failed to send message to Telegram: ${errorData.description || response.statusText}` 
        });
      }

      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error("Telegram send error:", err);
      return res.status(500).json({ message: "Failed to send message to Telegram" });
    }
  });

  // Initial Seed for the specific user request
  await seedMessages();

  return httpServer;
}

async function seedMessages() {
  const berlinDate = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Berlin",
  });
  
  const existing = await storage.getMessageByDate(berlinDate);
  if (!existing) {
    console.log(`Seeding message for ${berlinDate}`);
    await storage.createMessage({
      content: "Ты сегодня прекрасно выглядишь, ну в общем и как всегда)).",
      displayDate: berlinDate
    });
  }
}

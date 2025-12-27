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

  // Initial Seed for the specific user request
  await seedMessages();

  return httpServer;
}

async function seedMessages() {
  const berlinDate = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Berlin",
  });
  
  // Check if we have a message for today (Dec 27 2025 ideally, or just "today")
  const existing = await storage.getMessageByDate(berlinDate);
  if (!existing) {
    console.log(`Seeding message for ${berlinDate}`);
    await storage.createMessage({
      content: "Ты сегодня прекрасно выглядишь, ну в общем и как всегда)).",
      displayDate: berlinDate
    });
  }
}

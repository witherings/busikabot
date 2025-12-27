import { pgTable, text, serial, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  // We will store the date this message should appear (YYYY-MM-DD)
  displayDate: date("display_date").notNull().unique(),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  displayDate: true,
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type CreateMessageRequest = InsertMessage;
export type MessageResponse = Message;

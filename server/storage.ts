import { db } from "./db";
import { messages, type Message, type InsertMessage } from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getMessageByDate(date: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  getAllMessages(): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  async getMessageByDate(date: string): Promise<Message | undefined> {
    const [message] = await db
      .select()
      .from(messages)
      .where(eq(messages.displayDate, date));
    return message;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.displayDate);
  }
}

export const storage = new DatabaseStorage();

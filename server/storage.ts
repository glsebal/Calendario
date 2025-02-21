// Implementación del almacenamiento en base de datos
import { notes, type Note, type InsertNote } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

// Interfaz que define las operaciones disponibles
export interface IStorage {
  getNotes(): Promise<Note[]>;
  getNotesByDate(date: Date): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  deleteNote(id: number): Promise<void>;
}

// Implementación usando PostgreSQL
export class DatabaseStorage implements IStorage {
  // Obtener todas las notas
  async getNotes(): Promise<Note[]> {
    return await db.select().from(notes);
  }

  // Obtener notas por fecha específica
  async getNotesByDate(date: Date): Promise<Note[]> {
    const targetDate = new Date(date.toISOString().split('T')[0]);
    return await db
      .select()
      .from(notes)
      .where(sql`DATE(${notes.date}) = DATE(${targetDate})`);
  }

  // Crear una nueva nota
  async createNote(insertNote: InsertNote): Promise<Note> {
    const [note] = await db
      .insert(notes)
      .values(insertNote)
      .returning();
    return note;
  }

  // Eliminar una nota por ID
  async deleteNote(id: number): Promise<void> {
    await db.delete(notes).where(eq(notes.id, id));
  }
}

export const storage = new DatabaseStorage();
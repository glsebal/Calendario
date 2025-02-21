import { pgTable, text, serial, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Tabla de notas en la base de datos
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),                    // ID único autoincremental
  date: date("date").notNull(),                     // Fecha de la nota
  content: text("content").notNull(),               // Contenido de la nota
  createdAt: timestamp("created_at").notNull().defaultNow(), // Fecha de creación automática
});

// Esquema para validar la inserción de nuevas notas
export const insertNoteSchema = createInsertSchema(notes).pick({
  date: true,
  content: true,
});

// Tipos TypeScript para usar en la aplicación
export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;
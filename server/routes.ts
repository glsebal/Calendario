// Configuración de las rutas de la API
import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertNoteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  // GET /api/notes - Obtener todas las notas
  app.get("/api/notes", async (_req, res) => {
    const notes = await storage.getNotes();
    res.json(notes);
  });

  // GET /api/notes/:date - Obtener notas por fecha
  app.get("/api/notes/:date", async (req, res) => {
    const dateParam = z.string().parse(req.params.date);
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Formato de fecha inválido" });
    }
    const notes = await storage.getNotesByDate(date);
    res.json(notes);
  });

  // POST /api/notes - Crear una nueva nota
  app.post("/api/notes", async (req, res) => {
    const data = insertNoteSchema.parse(req.body);
    const note = await storage.createNote(data);
    res.json(note);
  });

  // DELETE /api/notes/:id - Eliminar una nota
  app.delete("/api/notes/:id", async (req, res) => {
    const id = z.number().parse(Number(req.params.id));
    await storage.deleteNote(id);
    res.json({ success: true });
  });

  return createServer(app);
}
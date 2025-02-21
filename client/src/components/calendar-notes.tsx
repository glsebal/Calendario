// Componente principal del calendario con notas
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type Note } from "@shared/schema";
import { NoteDialog } from "./note-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CalendarDays } from "lucide-react";

export default function CalendarNotes() {
  // Estados locales
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Obtener notas para la fecha seleccionada
  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: [`/api/notes/${format(selectedDate, "yyyy-MM-dd")}`],
  });

  // Mutación para crear notas
  const createNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest("POST", "/api/notes", {
        date: format(selectedDate, "yyyy-MM-dd"),
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/notes/${format(selectedDate, "yyyy-MM-dd")}`] });
      toast({ title: "Nota agregada exitosamente" });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "No se pudo guardar la nota. Por favor intente nuevamente.",
        variant: "destructive" 
      });
    }
  });

  // Mutación para eliminar notas
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/notes/${format(selectedDate, "yyyy-MM-dd")}`] });
      toast({ title: "Nota eliminada exitosamente" });
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sección del calendario */}
      <div className="p-4 bg-white/50 rounded-xl shadow-sm border border-orange-100">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-orange-900">Calendario</h2>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          className="rounded-md"
          classNames={{
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-orange-100 text-orange-900",
            day: "hover:bg-orange-50",
          }}
        />
      </div>

      {/* Sección de notas */}
      <div className="space-y-4">
        {/* Encabezado de notas */}
        <div className="flex items-center justify-between bg-white/50 p-4 rounded-xl shadow-sm border border-orange-100">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-orange-900">
              {format(selectedDate, "d 'de' MMMM, yyyy")}
            </h3>
            <p className="text-sm text-orange-700/80">
              Gestiona tus notas del día
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} className="shadow-sm bg-primary hover:bg-primary/90">
            <Pencil className="w-4 h-4 mr-2" />
            Agregar Nota
          </Button>
        </div>

        {/* Lista de notas */}
        <div className="bg-white/50 p-4 rounded-xl shadow-sm border border-orange-100">
          <ScrollArea className="h-[400px] pr-4">
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
                <CalendarDays className="w-8 h-8 text-orange-300" />
                <p className="text-orange-700/80">
                  No hay notas para este día
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map(note => (
                  <div 
                    key={note.id} 
                    className="group relative p-4 rounded-lg border border-orange-100 bg-white/80 transition-colors hover:bg-orange-50"
                  >
                    <p className="text-sm pr-8 text-orange-900">{note.content}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNoteMutation.mutate(note.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-100/50"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Diálogo para agregar notas */}
        <NoteDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={(content) => createNoteMutation.mutate(content)}
          isLoading={createNoteMutation.isPending}
        />
      </div>
    </div>
  );
}
// Componente de diálogo para agregar notas
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CalendarPlus } from "lucide-react";

// Esquema de validación del formulario
const formSchema = z.object({
  content: z.string().min(1, "El contenido de la nota es requerido"),
});

// Props del componente
interface NoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (content: string) => void;
  isLoading: boolean;
}

export function NoteDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: NoteDialogProps) {
  // Configuración del formulario con validación
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  // Manejador de envío del formulario
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.content);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CalendarPlus className="w-5 h-5 text-primary" />
            <DialogTitle>Agregar Nota</DialogTitle>
          </div>
          <DialogDescription>
            Escribe el contenido de tu nota para este día
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe tu nota aquí..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar Nota"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
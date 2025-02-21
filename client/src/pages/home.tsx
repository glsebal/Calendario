// Página principal que contiene el calendario
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarNotes from "@/components/calendar-notes";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50 p-4 md:p-8">
      <Card className="mx-auto max-w-4xl border-none bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Digital Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarNotes />
        </CardContent>
      </Card>
    </div>
  );
}
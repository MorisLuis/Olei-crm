import { EventInput, EventSourceInput } from '@fullcalendar/core/index.js';
import { CalendarInterface } from '@/interface/calendar';

export const DataCalendarConverted = (calendarData:  CalendarInterface[]) : EventInput[] => {

  const normalizeDate = (date: string | Date): string => {
    const fecha = date instanceof Date ? date : new Date(date);
    return fecha.toISOString().split('T')[0]; // Retorna solo la fecha en formato UTC
  };

  const eventsByDay: { [key: string]: number } = calendarData?.reduce(
    (acc: { [key: string]: number }, event: Partial<CalendarInterface>) => {
      const eventDate = new Date(event.Fecha as Date).toISOString().split('T')[0];
      acc[eventDate] = (acc[eventDate] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number } // Tipamos el objeto vacío inicial
  );

  const transformedEvents: EventSourceInput = calendarData.map(
    (event: Partial<CalendarInterface>) => {
      // Verificar si Fecha está definida y normalizarla a un objeto Date
      if (!event.Fecha) {
        throw new Error('La propiedad Fecha no está definida en la actividad.');
      }

      const fechaNormalizada = event.Fecha instanceof Date ? event.Fecha : new Date(event.Fecha);

      // Convertir la fecha a formato ISO y obtener la parte de la fecha (YYYY-MM-DD)
      const eventDate = fechaNormalizada.toISOString().split('T')[0];

      return {
        title: event.Descripcion,
        start: normalizeDate(event.Fecha), // Usamos la fecha normalizada
        extendedProps: {
          Id_Cliente: event.Id_Cliente,
          TableType: event.TableType,
          Id: event.TableType === 'Bitacora' ? event.Id_Bitacora : event.Id_Sell,
          eventCount: eventsByDay[eventDate], // Agregar el conteo de eventos
        },
      };
    }
  );

  return transformedEvents;
};

import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { useMemo } from 'react';

interface TimelineEventsValidationInterface {
  eventsOfTheDay: TimelineInterface[];
}

const normalizeCalendarEventsByDay = ({
  eventsOfTheDay
}: TimelineEventsValidationInterface): { events: TimelineMeetingInterface[], sellEvents: TimelineInterface[]} => {

  const events = useMemo(() => {
    return eventsOfTheDay
    .filter((meeting: TimelineInterface) => meeting.Hour && meeting.HourEnd)
    .map((meeting: any) => {
        // Asegurarse de que meeting.Fecha sea un objeto Date
        let meetingDate: Date;

        if (meeting.Fecha instanceof Date) {
          meetingDate = meeting.Fecha;
        } else {
          // Convertir el formato de fecha en caso de que no sea Date
          meetingDate = new Date(meeting.Fecha);
        }

        // Crear las fechas de inicio y fin con formato ISO completo
        const [hourStart, minuteStart] = meeting.Hour.split(':');
        const [hourEnd, minuteEnd] = meeting.HourEnd.split(':');

        const startDate = new Date(meetingDate);
        startDate.setHours(parseInt(hourStart, 10), parseInt(minuteStart, 10), 0, 0);

        const endDate = new Date(meetingDate);
        endDate.setHours(parseInt(hourEnd, 10), parseInt(minuteEnd, 10), 0, 0);

        const start = startDate.toISOString();
        const end = endDate.toISOString();

        // Construir el objeto eventMeeting
        const eventMeeting: any = {
          id: meeting.Id_Bitacora?.toString() || '',
          start,
          end,
          title: meeting.Descripcion ?? "Sin descripción",
          extendedProps: { Id_Bitacora: meeting.Id_Bitacora },
        };

        return eventMeeting;
      });
  }, [eventsOfTheDay]); // Recalcular solo cuando eventsOfTheDay cambie

  // Filtrar eventos de ventas
  const sellEvents = useMemo(() => {
    return eventsOfTheDay.filter((item) => item.TableType === 'Ventas');
  }, [eventsOfTheDay]); // Recalcular solo cuando eventsOfTheDay cambie

  return {
    events,
    sellEvents
  };
};

export default normalizeCalendarEventsByDay;

import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { useMemo } from 'react';

interface TimelineEventsValidationInterface {
    eventsOfTheDay: TimelineInterface[];
}

const TimelineEventsValidation = ({
    eventsOfTheDay
}: TimelineEventsValidationInterface) => {

    const events = useMemo(() => {
        return eventsOfTheDay
            .filter((meeting: TimelineInterface) => meeting.Hour && meeting.HourEnd) // Solo eventos con hora
            .map((meeting: TimelineInterface) => {
                // Asegurarse de que meeting.Fecha sea un objeto Date
                let meetingDate: Date;

                if (meeting.Fecha instanceof Date) {
                    meetingDate = meeting.Fecha;
                } else {
                    // Convertir el formato de fecha en caso de que no sea Date
                    meetingDate = new Date(meeting.Fecha);
                }

                // Crear las fechas de inicio y fin
                const start = `${meetingDate.toISOString().split('T')[0]}T${meeting.Hour}`;
                const end = `${meetingDate.toISOString().split('T')[0]}T${meeting.HourEnd}`;

                // Construir el objeto eventMeeting
                const eventMeeting: TimelineMeetingInterface = {
                    id: meeting.Id_Bitacora?.toString() || "",
                    start,
                    end,
                    title: meeting.Titulo,
                    extendedProps: { Id_Bitacora: meeting.Id_Bitacora },
                };

                return eventMeeting;
            });
    }, [eventsOfTheDay]);  // Recalcular solo cuando eventsOfTheDay cambie

    // Filtrar eventos de ventas
    const sellEvents = useMemo(() => {
        return eventsOfTheDay.filter((item) => item.TableType === "Ventas");
    }, [eventsOfTheDay]);  // Recalcular solo cuando eventsOfTheDay cambie

    // Filtrar eventos sin hora
    /* const eventsWithoutHourList = useMemo(() => {
        return eventsOfTheDay.filter(
            (meeting) => !meeting.Hour || !meeting.HourEnd
        );
    }, [eventsOfTheDay]); */

    return {
        events,
        sellEvents,
    };
};

export default TimelineEventsValidation;

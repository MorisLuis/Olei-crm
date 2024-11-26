import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from '@fullcalendar/core/locales/es'; // Idioma español
import { EventClickArg } from "@fullcalendar/core/index.js";
import MeetingInterface from "@/interface/meeting";

interface MyTimelineInterface {
    onClickEvent: (eventBody: MeetingInterface) => void;
    initialDateProp?: string | Date; // La fecha puede ser undefined
    eventsOfTheDay: MeetingInterface[]
}

const MyTimeline = ({
    onClickEvent,
    initialDateProp,
    eventsOfTheDay
}: MyTimelineInterface) => {

    // Mapeo de meetings a formato de FullCalendar
    const events = eventsOfTheDay.map(meeting => ({
        id: meeting.Id_Bitacora?.toString() || "", // Asegúrate de usar un string para `id`
        start: `${meeting.Fecha.toISOString().split('T')[0]}T${meeting.Hour}`, // Fecha y hora de inicio
        end: `${meeting.Fecha.toISOString().split('T')[0]}T${meeting.HourEnd}`, // Fecha y hora de fin
        title: meeting.Title, // Título
        extendedProps: { Id_Bitacora: meeting.Id_Bitacora } // Agrega todas las propiedades adicionales
    }));

    const handeOnClickEvent = (arg: EventClickArg) => {
        onClickEvent(arg.event.extendedProps as MeetingInterface); // Pasar el evento completo al callback
    };

    const getFormattedDate = (date: string | Date | undefined): string => {
        if (!date) {
            // Si la fecha es undefined o nula, retornamos la fecha actual en el formato adecuado
            return new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
        }
    
        // Si la fecha es un string, intentamos convertirlo a un objeto Date
        let dateObj: Date;
        if (typeof date === 'string') {
            // Intentamos parsear el string como una fecha
            dateObj = new Date(date);
            // Si la conversión da como resultado una fecha inválida, usamos la fecha actual
            if (isNaN(dateObj.getTime())) {
                console.warn("Fecha inválida detectada en 'initialDateProp', usando la fecha actual.");
                return new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
            }
        } else {
            // Si ya es un objeto Date, lo usamos directamente
            dateObj = date;
        }
    
        // Convertir la fecha al formato adecuado (YYYY-MM-DD)
        return dateObj.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    };

    // Convertir la fecha que recibimos como prop
    const formattedDate = getFormattedDate(initialDateProp);

    return (
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            initialDate={formattedDate}  // Fecha inicial del calendario
            slotDuration="01:00:00"
            events={events} // Usar el arreglo mapeado
            headerToolbar={{
                start: "",
                center: "title",
                end: "",
            }}
            eventClick={handeOnClickEvent}
            allDaySlot={false}
            locale={esLocale}
            height={"auto"}
        />
    );
};

export default MyTimeline;

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from '@fullcalendar/core/locales/es'; // Idioma español
import { EventClickArg } from "@fullcalendar/core/index.js";
import MeetingInterface from "@/interface/meeting";
import { meetingsExamples } from "@/seed/bitacoraData";

interface MyTimelineInterface {
    onClickEvent: (eventBody: MeetingInterface) => void;
}

const MyTimeline = ({
    onClickEvent
}: MyTimelineInterface) => {

    // Mapeo de meetings a formato de FullCalendar
    const events = meetingsExamples.map(meeting => ({
        id: meeting.Id_Bitacora?.toString() || "", // Asegúrate de usar un string para `id`
        start: `${meeting.Fecha.toISOString().split('T')[0]}T${meeting.Hour}`, // Fecha y hora de inicio
        end: `${meeting.Fecha.toISOString().split('T')[0]}T${meeting.HourEnd}`, // Fecha y hora de fin
        title: meeting.Title, // Título
        extendedProps: { Id_Bitacora: meeting.Id_Bitacora } // Agrega todas las propiedades adicionales
    }));

    const handeOnClickEvent = (arg: EventClickArg) => {
        onClickEvent(arg.event.extendedProps as MeetingInterface); // Pasar el evento completo al callback
    };

    return (
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
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

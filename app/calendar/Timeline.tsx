"use client";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import esLocale from '@fullcalendar/core/locales/es'; // Importar idioma español

const MyTimeline = () => {
    return (
        <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            slotDuration="01:00:00"
            events={[
                { id: "1", start: "2024-11-25T09:00:00", end: "2024-11-25T11:00:00", title: "Tarea 1" },
                { id: "2", start: "2024-11-25T13:00:00", end: "2024-11-25T15:00:00", title: "Tarea 2" },
            ]}
            headerToolbar={{
                start: "", // Oculta el header
                center: "title",
                end: "",
            }}
            allDaySlot={false} // Oculta la fila de "Todo el día"
            locale={esLocale} // Establecer idioma a español
           /*  slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                hour12: true, // Forzar formato de 12 horas
            }} */
            height={"auto"}
        />
    );
};

export default MyTimeline;

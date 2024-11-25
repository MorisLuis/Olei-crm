"use client";

import FullCalendar from '@fullcalendar/react'; // Importa el componente principal
import dayGridPlugin from '@fullcalendar/daygrid'; // Vista mensual
import interactionPlugin from '@fullcalendar/interaction'; // Plugin de interacción
import esLocale from '@fullcalendar/core/locales/es'; // Importar idioma español
import { calendarData } from '@/seed/calendarData';
import { EventClickArg, EventSourceInput } from '@fullcalendar/core/index.js';

const MyCalendar = () => {

    // Transforma calendarData al formato esperado
    const transformedEvents: EventSourceInput = calendarData.map(event => ({
        title: event.Title,
        start: event.Fecha,
        extendedProps: {
            TableType: event.TableType, // Propiedad adicional opcional
            id: event.id
        },
    }));

    const handleEventClick = (info: EventClickArg) => {
        console.log({ info: info.event.extendedProps })
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // Agrega interactionPlugin
            initialView="dayGridMonth" // Vista inicial
            editable={true} // Permite mover eventos
            selectable={true} // Permite seleccionar fechas
            events={transformedEvents} // Lista de eventos transformada
            //dateClick={handleDateClick} // Escucha clics en fechas
            eventClick={handleEventClick} // Escucha clics en eventos
            height="auto" // Ajuste automático de altura
            locale={esLocale} // Establecer idioma a español
        />
    );
};

export default MyCalendar;

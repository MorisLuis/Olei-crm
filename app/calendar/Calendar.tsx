"use client";

import FullCalendar from '@fullcalendar/react'; // Importa el componente principal
import dayGridPlugin from '@fullcalendar/daygrid'; // Vista mensual
import interactionPlugin from '@fullcalendar/interaction'; // Plugin de interacción
import { useState } from 'react';
import esLocale from '@fullcalendar/core/locales/es'; // Importar idioma español

const MyCalendar = () => {
    const [events, setEvents] = useState([
        { title: 'Evento 1', date: '2024-11-22' },
        { title: 'Evento 2', date: '2024-11-25' },
    ]);

    const handleDateClick = (info: { dateStr: string }) => {
        alert(`Se seleccionó la fecha: ${info.dateStr}`);
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // Agrega interactionPlugin
            initialView="dayGridMonth" // Vista inicial
            editable={true} // Permite mover eventos
            selectable={true} // Permite seleccionar fechas
            events={events} // Lista de eventos
            dateClick={handleDateClick} // Escucha clics en fechas
            eventClick={(info) => alert(`Evento: ${info.event.title}`)} // Escucha clics en eventos
            height="auto" // Ajuste automático de altura
            locale={esLocale} // Establecer idioma a español
        />
    );
};

export default MyCalendar;

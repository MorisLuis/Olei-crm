import React, { useRef, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { calendarData } from '@/seed/calendarData';
import { EventClickArg, EventContentArg, EventSourceInput } from '@fullcalendar/core/index.js';
import { CalendarInterface } from '@/interface/calendar';

interface MyCalendarInterface {
    onClickEvent: (info: EventClickArg) => void;
    onClickDay: (arg: DateClickArg) => void;
}

const MyCalendar = ({
    onClickEvent,
    onClickDay,
}: MyCalendarInterface) => {

    // Usamos useRef para mantener el estado de los días procesados sin causar re-renderizados
    const processedDaysRef = useRef<{ [key: string]: boolean }>({});

    const eventsByDay: { [key: string]: number } = calendarData.reduce(
        (acc: { [key: string]: number }, event: Partial<CalendarInterface>) => {
            const eventDate = new Date(event.Fecha as Date).toISOString().split("T")[0];
            acc[eventDate] = (acc[eventDate] || 0) + 1;
            return acc;
        },
        {} as { [key: string]: number } // Tipamos el objeto vacío inicial
    );
    

    const transformedEvents: EventSourceInput = calendarData.map((event: Partial<CalendarInterface>) => {
        const eventDate = new Date(event.Fecha as Date).toISOString().split("T")[0];
        return {
            title: event.Title,
            start: event.Fecha,
            extendedProps: {
                TableType: event.TableType,
                Id: event.TableType === "Bitacora" ? event.Id_Bitacora : event.Id_Sell,
                eventCount: eventsByDay[eventDate], // Agregar el conteo de eventos
            },
        };
    });

    const handleEventClick = (info: EventClickArg) => {
        onClickEvent(info);
    };

    const renderEventContent = useCallback((eventInfo: EventContentArg) => {
        const eventCount = eventInfo.event.extendedProps.eventCount;
        const eventType = eventInfo.event.extendedProps.TableType;
        const eventDate = eventInfo.event.startStr; // Fecha única del evento

        // Si el día ya ha sido procesado y tiene más de 3 eventos, no renderizamos
        if (processedDaysRef.current[eventDate] && eventCount > 3) {
            return null;
        }

        // Marca el día como procesado si es un evento con más de 3
        if (eventCount >= 3) {
            processedDaysRef.current[eventDate] = true; // Actualizamos el ref
            return (
                <div className="fc-event-modified many-events">
                    <span className="white"></span>
                    <p>{eventCount} Eventos hoy</p>
                </div>
            );
        }

        // Renderizado normal para eventos con menos de 4
        let additionalClass = "";
        if (eventCount === 1) additionalClass = "single-event";
        else if (eventCount > 1 && eventCount <= 3) additionalClass = "few-events";

        return (
            <div className={`fc-event-modified ${additionalClass}`}>
                <span className={eventType === 'Bitacora' ? 'blue' : 'red'}></span>
                <p>{eventInfo.event.title}</p>
            </div>
        );
    }, []);

    const handleViewChange = () => {
        // Limpiar el estado de días procesados al cambiar la vista
        processedDaysRef.current = {}; // Resetear el ref
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // Agrega interactionPlugin
            initialView="dayGridMonth" // Vista inicial
            editable={true} // Permite mover eventos
            selectable={true} // Permite seleccionar fechas
            events={transformedEvents} // Lista de eventos transformada
            dateClick={onClickDay} // Escucha clics en fechas
            eventClick={handleEventClick} // Escucha clics en eventos
            height="auto" // Ajuste automático de altura
            locale={esLocale} // Establecer idioma a español
            eventContent={renderEventContent} // Renderizado personalizado
            datesSet={handleViewChange} // Resetear al cambiar la vista
        />
    );
};

export default MyCalendar;

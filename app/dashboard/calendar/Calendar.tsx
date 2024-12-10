import React, { useRef, useState, useCallback, useEffect } from 'react';
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
    
    const [events, setEvents] = useState<EventSourceInput>([]); // Estado para los eventos

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

    // Para asegurar que los eventos se actualizan al regresar del modal
    useEffect(() => {
        setEvents(transformedEvents); // Actualiza los eventos
    }, [transformedEvents]); // Actualiza solo cuando calendarData cambie // before "calendarData"

    const handleEventClick = (info: EventClickArg) => {
        const countEvents = info.event.extendedProps.eventCount;
        if (countEvents >= 3) {
            const dateClickArg: DateClickArg = {
                date: info.event.start as Date,
                dateStr: info.event.startStr,
                allDay: false,
                dayEl: info.el, // Usa el elemento del evento si está disponible
                jsEvent: {} as MouseEvent,
                view: info.view,
            };
            return onClickDay(dateClickArg); // Llama a onClickDay con el argumento
        }
        onClickEvent(info); // Llama a la función que pasa como prop
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
        processedDaysRef.current = {}; // Resetear el ref
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]} // Agrega interactionPlugin
            initialView="dayGridMonth" // Vista inicial
            editable={true} // Permite mover eventos
            selectable={true} // Permite seleccionar fechas
            events={events} // Usa el estado de eventos
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

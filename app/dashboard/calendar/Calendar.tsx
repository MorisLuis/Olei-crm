import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { DatesSetArg, EventClickArg, EventInput, EventSourceInput } from '@fullcalendar/core/index.js';
import { getCalendarByMonth } from '@/services/calendar';
import { DataCalendarConverted } from './TransformedEventsData';
import { renderEventContent } from './RenderEvents';
import { SettingsContext } from '@/context/Settings/SettingsContext';

interface MyCalendarInterface {
    onClickEvent: (info: EventClickArg) => void;
    onClickDay: (arg: DateClickArg) => void;
}

const MyCalendar = ({
    onClickEvent,
    onClickDay,
}: MyCalendarInterface) => {

    const processedDaysRef = useRef<{ [key: string]: boolean }>({});
    const [events, setEvents] = useState<EventSourceInput>([]);
    const { firtRenderCalendar, handleRenderCalendar } = useContext(SettingsContext);

    const handleEventClick = (info: EventClickArg) => {
        const countEvents = info.event.extendedProps.eventCount;

        if (countEvents >= 3) {
            const dateClickArg: DateClickArg = {
                date: info.event.start as Date,
                dateStr: info.event.startStr,
                allDay: false,
                dayEl: info.el,
                jsEvent: {} as MouseEvent,
                view: info.view,
            };
            return onClickDay(dateClickArg);
        }
        onClickEvent(info);
    };

    const handleGetCalendarByMonth = useCallback(async (month: number, year: number) => {
        if (firtRenderCalendar) {
            handleRenderCalendar(false);
            return;
        };
        const dataCalendar = await getCalendarByMonth({ Anio: year, Mes: month });
        const convertedData = DataCalendarConverted(dataCalendar);
        setEvents(convertedData);
    }, [firtRenderCalendar, handleRenderCalendar]);

    const handleViewChange = useCallback((arg: DatesSetArg) => {
        processedDaysRef.current = {};
        // Usamos view.activeStart para obtener el primer día visible del mes
        const activeStartDate = arg.view.activeStart

        // Sumar 7 días a la fecha para obtener una fecha dentro del mes visible.
        const correctedStartDate = new Date(activeStartDate);
        correctedStartDate.setDate(correctedStartDate.getDate() + 7);

        const month = correctedStartDate.getMonth();
        const year = correctedStartDate.getFullYear();
        setEvents([])

        handleGetCalendarByMonth(month + 1, year);

    }, [handleGetCalendarByMonth]);

    useEffect(() => {
        handleGetCalendarByMonth(12, 2024)
    }, [handleGetCalendarByMonth])

    useEffect(() => {
        return () => {
            handleRenderCalendar(true);
        }
    }, [])


    if ((events as EventInput[]).length < 0) {
        return (
            <div>
                <p>Cargando....</p>
            </div>
        )
    };

    //console.log({events})

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            events={events}
            dateClick={onClickDay}
            eventClick={handleEventClick}
            height="auto"
            locale={esLocale}
            eventContent={(eventInfo) => renderEventContent({ eventInfo, processedDaysRef })}
            datesSet={handleViewChange} // Cambiar vista
        />
    );
};

export default MyCalendar;

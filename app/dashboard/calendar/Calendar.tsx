import {
  DatesSetArg,
  EventSourceInput,
} from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import { getCalendarByMonth, getCalendarByMonthAndClient } from '@/services/calendar/calendar.service';
import CalendarComponentSkeleton from './CalendarComponentSkeleton';
import { renderEventContent } from './RenderEvents';
import { DataCalendarConverted } from './temp';

interface CalendarComponentInterface {
  onClickDay: (arg: DateClickArg) => void;
  Id_Cliente?: number;

  clientVersion?: boolean;
  refreshCalendar?: boolean;
  isLoading: boolean;
}

const CalendarComponent = ({
  onClickDay,
  Id_Cliente,
  clientVersion,
  refreshCalendar,
  isLoading
}: CalendarComponentInterface): JSX.Element => {

  const processedDaysRef = useRef<{ [key: string]: boolean }>({});
  const [events, setEvents] = useState<EventSourceInput>([]);
  const { firtRenderCalendar, handleRenderCalendar } = useContext(SettingsContext);

  const fetchCalendarEvents = useCallback(async (month: number, year: number) => {

    if (firtRenderCalendar) {
      handleRenderCalendar(false);
      return;
    }

    let dataCalendar;
    if (clientVersion && Id_Cliente) {
      dataCalendar = await getCalendarByMonthAndClient({ Anio: year, Mes: month, Id_Cliente });
      console.log({dataCalendar})
    } else {
      dataCalendar = await getCalendarByMonth({ Anio: year, Mes: month });
    }

    const convertedData = DataCalendarConverted(dataCalendar.tasks);
    setEvents(convertedData);
  }, [firtRenderCalendar, handleRenderCalendar, clientVersion, Id_Cliente]);

  const onCalendarViewChange = useCallback((arg: DatesSetArg) => {

    processedDaysRef.current = {};
    // Usamos view.activeStart para obtener el primer día visible del mes
    const activeStartDate = arg.view.activeStart;

    // Sumar 7 días a la fecha para obtener una fecha dentro del mes visible.
    const correctedStartDate = new Date(activeStartDate);
    correctedStartDate.setDate(correctedStartDate.getDate() + 7);

    const month = correctedStartDate.getMonth();
    const year = correctedStartDate.getFullYear();
    setEvents([]);

    fetchCalendarEvents(month + 1, year);
  }, [fetchCalendarEvents]);

  // Effect to fetch calendar events on initial render and when refreshCalendar changes
  useEffect(() => {
    const currentDate = new Date(); // Obtiene la fecha actual
    const currentMonth = currentDate.getMonth() + 1; // getMonth() devuelve 0-11, por eso sumamos 1
    const currentYear = currentDate.getFullYear(); // Obtiene el año actual

    fetchCalendarEvents(currentMonth, currentYear);
  }, [fetchCalendarEvents, refreshCalendar]);

  // Cleanup effect to handle when the component unmounts or refreshes
  useEffect(() => {
    return (): void => {
      handleRenderCalendar(true);
    };
  }, [handleRenderCalendar]);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <CalendarComponentSkeleton/>
      </div>
    )
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      events={events}
      dateClick={onClickDay}
      height="auto"
      locale={esLocale}
      eventContent={(eventInfo) => renderEventContent({ eventInfo, processedDaysRef })}
      datesSet={onCalendarViewChange}
    />
  );
};

export default CalendarComponent;

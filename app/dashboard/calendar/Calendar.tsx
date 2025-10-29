import { DatesSetArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useRef, useCallback, useState } from 'react';
import { useGetEventsCalendar } from '@/hooks/calendar/useGetEventsCalendar';
import { getMonthYear } from '@/utils/gets/getMonthYear';
import CalendarComponentSkeleton from './CalendarComponentSkeleton';
import { renderEventContent } from './RenderEvents';

interface CalendarComponentInterface {
  onClickDay: (arg: DateClickArg) => void;
  isLoading: boolean;
}

const CalendarComponent = ({
  onClickDay,
  isLoading
}: CalendarComponentInterface): JSX.Element => {

  const processedDaysRef = useRef<{ [key: string]: boolean }>({});
  const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  })
  const { dataEvents } = useGetEventsCalendar({ month: date.month, year: date.year });

  const onCalendarViewChange = useCallback((arg: DatesSetArg) => {
    processedDaysRef.current = {};
    const { month, year } = getMonthYear(arg.view.activeStart);
    setDate({ month, year });
  }, []);

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <CalendarComponentSkeleton />
      </div>
    )
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      events={dataEvents}
      dateClick={onClickDay}
      height="auto"
      locale={esLocale}
      eventContent={(eventInfo) => renderEventContent({ eventInfo, processedDaysRef })}
      datesSet={onCalendarViewChange}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      }}
      slotDuration="01:00:00"
      slotLabelInterval="01:00"
      slotMinTime="06:00:00"
      slotMaxTime="30:00:00"   
      slotLabelFormat={{
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }}
      allDaySlot={false}
      
    />
  );
};

export default CalendarComponent;

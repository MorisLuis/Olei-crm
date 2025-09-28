import { DatesSetArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useRef, useCallback } from 'react';
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
  /* const [date, setDate] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  }) */
  //const { dataEvents } = useGetEventsCalendar({ month: date.month, year: date.year });

  // 🔹 Mock data para probar
  const mockEvents = [
    {
      id: '1',
      title: 'Reunión con cliente',
      start: '2025-09-26T09:00:00',
      end: '2025-09-26T10:30:00'
    },
    {
      id: '2',
      title: 'Llamada interna',
      start: '2025-09-27T11:00:00',
      end: '2025-09-27T12:00:00'
    },
    {
      id: '3',
      title: 'Almuerzo',
      start: '2025-09-28T13:00:00',
      end: '2025-09-28T14:00:00'
    }
  ];

  const onCalendarViewChange = useCallback((_arg: DatesSetArg) => {
    processedDaysRef.current = {};
    //const { month, year } = getMonthYear(arg.view.activeStart);
    //setDate({ month, year });
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
      events={mockEvents}
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
    />


  );
};

export default CalendarComponent;

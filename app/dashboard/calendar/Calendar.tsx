import {
  DatesSetArg,
  EventClickArg,
  EventInput,
  EventSourceInput,
} from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import { getCalendarByMonth, getCalendarByMonthAndClient } from '@/services/calendar';
import { renderEventContent } from './RenderEvents';
import { DataCalendarConverted } from './TransformedEventsData';

interface MyCalendarInterface {
  onClickEvent: (info: EventClickArg) => void;
  onClickDay: (arg: DateClickArg) => void;

  ClientVersion?: boolean;
  Id_Cliente?: number;
  refreshCalendar?: boolean;
}

const MyCalendar = ({
  onClickEvent,
  onClickDay,
  ClientVersion,
  Id_Cliente,
  refreshCalendar
}: MyCalendarInterface): JSX.Element => {
  const processedDaysRef = useRef<{ [key: string]: boolean }>({});
  const [events, setEvents] = useState<EventSourceInput>([]);
  const { firtRenderCalendar, handleRenderCalendar } = useContext(SettingsContext);

  const handleEventClick = (info: EventClickArg) : void => {
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

  const handleGetCalendarByMonth = useCallback(
    async (month: number, year: number) => {
      if (firtRenderCalendar) {
        handleRenderCalendar(false);
        return;
      }

      let dataCalendar;
      if (ClientVersion && Id_Cliente) {
        dataCalendar = await getCalendarByMonthAndClient({ Anio: year, Mes: month, Id_Cliente });
      } else {
        dataCalendar = await getCalendarByMonth({ Anio: year, Mes: month });
      }

      const convertedData = DataCalendarConverted(dataCalendar.tasks);
      setEvents(convertedData);
    }, [firtRenderCalendar, handleRenderCalendar, ClientVersion, Id_Cliente]
  );

  const handleViewChange = useCallback(
    (arg: DatesSetArg) => {
      processedDaysRef.current = {};
      // Usamos view.activeStart para obtener el primer día visible del mes
      const activeStartDate = arg.view.activeStart;

      // Sumar 7 días a la fecha para obtener una fecha dentro del mes visible.
      const correctedStartDate = new Date(activeStartDate);
      correctedStartDate.setDate(correctedStartDate.getDate() + 7);

      const month = correctedStartDate.getMonth();
      const year = correctedStartDate.getFullYear();
      setEvents([]);

      handleGetCalendarByMonth(month + 1, year);
    },
    [handleGetCalendarByMonth]
  );

  useEffect(() => {
    const currentDate = new Date(); // Obtiene la fecha actual
    const currentMonth = currentDate.getMonth() + 1; // getMonth() devuelve 0-11, por eso sumamos 1
    const currentYear = currentDate.getFullYear(); // Obtiene el año actual

    handleGetCalendarByMonth(currentMonth, currentYear);
  }, [handleGetCalendarByMonth, refreshCalendar]);

  useEffect(() => {
    return () : void => {
      handleRenderCalendar(true);
    };
  }, [handleRenderCalendar]);

  if ((events as EventInput[]).length < 0) {
    return (
      <div>
        <p>Cargando....</p>
      </div>
    );
  }

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
      datesSet={handleViewChange}
    />
  );
};

export default MyCalendar;

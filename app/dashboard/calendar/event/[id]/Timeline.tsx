import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es'; // Idioma español
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TimelineMeetingInterface } from '@/interface/calendar';
import MeetingInterface from '@/interface/meeting';

interface MyTimelineInterface {
  onClickEvent: (eventBody: MeetingInterface) => void;
  initialDateProp?: string | Date; // La fecha puede ser undefined
  eventsOfTheDay: TimelineMeetingInterface[];
}

const MyTimeline = ({ onClickEvent, initialDateProp, eventsOfTheDay }: MyTimelineInterface) : JSX.Element => {
  const handleOnClickEvent = (arg: EventClickArg) : void => {
    onClickEvent(arg.event.extendedProps as MeetingInterface); // Pasar el evento completo al callback
  };

  const getFormattedDate = (date: string | Date | undefined): string => {
    if (!date) {
      return new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
    }

    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.warn("Fecha inválida detectada en 'initialDateProp', usando la fecha actual.");
        return new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
      }
    } else {
      dateObj = date;
    }

    return dateObj.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
  };

  const formattedDate = getFormattedDate(initialDateProp);

  return (
    <div className="custom-timeline">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        initialDate={formattedDate} // Fecha inicial del calendario
        slotDuration="01:00:00"
        events={eventsOfTheDay} // Usar el arreglo mapeado
        headerToolbar={{
          start: '',
          center: 'title',
          end: '',
        }}
        eventClick={handleOnClickEvent}
        allDaySlot={false}
        locale={esLocale}
        height={'auto'}
      />
    </div>
  );
};

export default MyTimeline;

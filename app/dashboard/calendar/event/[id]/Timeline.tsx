import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import MeetingInterface from '@/interface/meeting';
import { RenderEventSelects } from './RenderEventSelects';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {
  onClickEvent: (eventBody: MeetingInterface) => void;
  initialDateProp?: string | Date;
  eventsOfTheDay: TimelineInterface[] | null;

  events: TimelineMeetingInterface[];
  sellEvents: TimelineInterface[];
  eventSelected: number;
  navigateToModalSells: () => void;
}

const Timeline = ({
  onClickEvent,
  initialDateProp,
  eventsOfTheDay,
  events,
  sellEvents,
  eventSelected,
  navigateToModalSells
}: TimelinePropsInterface): JSX.Element => {

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

  if (!events || !sellEvents || !eventsOfTheDay) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={styles.content}>

      {sellEvents.length > 0 && (
        <MessageSecondaryCard
          title={'Hay docuentos que expiran hoy.'}
          icon={faFileExcel}
          action={{
            onClick: () => navigateToModalSells(),
            color: 'blue',
            text: 'Ver documentos',
          }}
        />
      )}

      <div className={styles.timelineContent}>
        <div className="custom-timeline">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            initialDate={formattedDate} // Fecha inicial del calendario
            slotDuration="01:00:00"
            events={events} // Usar el arreglo mapeado
            headerToolbar={{
              start: '',
              center: 'title',
              end: '',
            }}
            eventClick={(arg: EventClickArg): void => onClickEvent(arg.event.extendedProps as MeetingInterface)}
            allDaySlot={false}
            locale={esLocale}
            height={'auto'}
          />
        </div>
      </div>

      {RenderEventSelects({ events, eventsOfTheDay, eventSelected })}
    </div>
  );
};

export default Timeline;

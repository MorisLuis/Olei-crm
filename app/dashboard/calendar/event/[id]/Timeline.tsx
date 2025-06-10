import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { formatDateIsoOrNow } from '@/utils/format/formatDateIsoOrNow';
import { EventSelected } from './TimelineEventRendered';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {
  onClickEvent: (Id_Bitacora: number) => void;
  initialDateProp?: string | Date;

  events: TimelineMeetingInterface[];
  sellEvents: TimelineInterface[];
  eventSelected: number;
  navigateToModalSells: () => void;

  isLoadingEventSelected: boolean;
}

const Timeline = ({
  onClickEvent,
  initialDateProp,
  events,
  sellEvents,
  eventSelected,
  navigateToModalSells,
  isLoadingEventSelected
}: TimelinePropsInterface): JSX.Element => {

  if (!events || !sellEvents) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className={styles.content}>

      <div className={styles.timelineContent}>

        {/* DOCUMENTS */}
        <div className={styles.timelineContent__documents}>
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
        </div>

        {/* TIMELINES */}
        <div className="custom-timeline">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            initialDate={formatDateIsoOrNow(initialDateProp)} // Fecha inicial del calendario
            slotDuration="01:00:00"
            events={events} // Usar el arreglo mapeado
            headerToolbar={{
              start: '',
              center: 'title',
              end: '',
            }}
            eventClick={(arg: EventClickArg): void => onClickEvent(arg.event.extendedProps?.Id_Bitacora as number)}
            allDaySlot={false}
            locale={esLocale}
            height={'auto'}
          />
        </div>
      </div>

      {/* EVENT SELECTED */}
      <EventSelected
        events={events}
        eventSelected={eventSelected}
        isLoading={isLoadingEventSelected}
      />

    </div>
  );
};

export default Timeline;

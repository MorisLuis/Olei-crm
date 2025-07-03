import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import Modal from '@/components/Modals/Modal';
import { useWindowSize } from '@/hooks/useWindowSize';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { formatDateIsoOrNow } from '@/utils/format/formatDateIsoOrNow';
import TimelineEventSelected from './TimelineEventSelected';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {

  events: TimelineMeetingInterface[] | null;
  sellEvents: TimelineInterface[];
  navigateToModalSells: () => void;
  initialDateProp?: string | Date;
  refreshTimeline: boolean;
  isLoadingEvents: boolean

}

const Timeline = ({
  initialDateProp,
  events,
  sellEvents,
  navigateToModalSells,
  refreshTimeline,
  isLoadingEvents
}: TimelinePropsInterface): JSX.Element => {

  const [eventSelected, setEventSelected] = useState<number>(0);
  const [openModalEventSelected, setOpenModalEventSelected] = useState(false)
  const [isSelectingEvent, setIsSelectingEvent] = useState(true);
  const { isMobile } = useWindowSize()

  const onSelectEventFromTimeline = (Id_Bitacora: number): void => {
    setOpenModalEventSelected(true);
    setEventSelected(Id_Bitacora);
    setIsSelectingEvent(false)
  };

  useEffect(() => {
    if (!isLoadingEvents) {
      if (events && events.length > 0) {
        onSelectEventFromTimeline(Number(events[0].id));
      } else {
        onSelectEventFromTimeline(0)
      }
    }
  }, [events, refreshTimeline, isLoadingEvents]);

  if (!events || !sellEvents) {
    return (
      <div>
        <p>Cargando timeline...</p>
      </div>
    );
  }

  return (
    <main className={styles.timelinePage__content}>
  
      <div className={styles.timelineContent}>
        {/* DOCUMENTS */}
        <section className={styles.timelineContent__documents}>
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
        </section>

        {/* TIMELINE */}
        <section className="custom-timeline">
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
            eventClick={(arg: EventClickArg): void => onSelectEventFromTimeline(arg.event.extendedProps?.Id_Bitacora as number)}
            allDaySlot={false}
            locale={esLocale}
            height={'auto'}
          />
        </section>
      </div>

      {/* EVENT SELECTED */}
      <div className={styles.briefContent}>
        <TimelineEventSelected
          eventSelected={eventSelected}
          isLoading={isSelectingEvent || isLoadingEvents}
        />
      </div>

      <Modal
        visible={openModalEventSelected && isMobile}
        title='Actividad'
        onClose={() => setOpenModalEventSelected(false)}
      >
        <TimelineEventSelected
          eventSelected={eventSelected}
          isLoading={isSelectingEvent || isLoadingEvents}
        />
      </Modal>
    </main>
  );
};

export default Timeline;

import { useEffect, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import { useWindowSize } from '@/hooks/useWindowSize';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import Timeline from './Timeline';
import TimelineEventSelected from './TimelineEventSelected';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {

  events: TimelineMeetingInterface[] | null;
  sellEvents: TimelineInterface[];
  navigateToModalSells: () => void;
  initialDateProp?: string | Date;
  refreshTimeline: boolean;
  isLoadingEvents: boolean
  TotalVentas: number

}

const ClientAgendaContent = ({
  initialDateProp,
  events,
  sellEvents,
  navigateToModalSells,
  refreshTimeline,
  isLoadingEvents,
  TotalVentas
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

  return (
    <main className={styles.timelinePage__content}>
      <div className={styles.timelineContent}>
        <Timeline
          events={events}
          sellEvents={sellEvents}
          initialDateProp={initialDateProp}
          isLoading={isLoadingEvents}
          TotalVentas={TotalVentas}
          navigateToModalSells={navigateToModalSells}
          onSelectEventFromTimeline={onSelectEventFromTimeline}
        />
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

export default ClientAgendaContent;

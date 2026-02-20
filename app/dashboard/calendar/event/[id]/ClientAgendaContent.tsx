import { useEffect, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import { useGetEventsCalendarByDay } from '@/hooks/calendar/useGetEventsCalendarByDay';
import { useWindowSize } from '@/hooks/useWindowSize';
import Timeline from './Timeline';
import TimelineEventSelected from './TimelineEventSelected';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {
  idCliente: string | null;
}

const ClientAgendaContent = ({
  idCliente,
}: TimelinePropsInterface): JSX.Element => {

  const { isMobile } = useWindowSize()
  const { timelineTasks, isLoading } = useGetEventsCalendarByDay(idCliente);

  const [eventSelected, setEventSelected] = useState<number>(0);
  const [openModalEventSelected, setOpenModalEventSelected] = useState(false)
  const [isSelectingEvent, setIsSelectingEvent] = useState(true);

  const onSelectEventFromTimeline = (Id_Bitacora: number): void => {
    setOpenModalEventSelected(true);
    setEventSelected(Id_Bitacora);
    setIsSelectingEvent(false)
  };

  useEffect(() => {
    if (isLoading) return

    if (timelineTasks && timelineTasks.length > 0) {
      onSelectEventFromTimeline(Number(timelineTasks[0].id));
    } else {
      onSelectEventFromTimeline(0)
    }

  }, [timelineTasks, isLoading]);

  return (
    <>
      <main className={styles.timelinePage__content}>
        <div className={styles.timelineContent}>
          <Timeline
            events={timelineTasks}
            isLoading={isLoading}
            onSelectEventFromTimeline={onSelectEventFromTimeline}
          />
        </div>

        {/* EVENT SELECTED */}
        <div className={styles.briefContent}>
          <TimelineEventSelected
            eventSelected={eventSelected}
            isLoading={isSelectingEvent || isLoading}
          />
        </div>

        <Modal
          visible={openModalEventSelected && isMobile}
          title='Actividad'
          onClose={() => setOpenModalEventSelected(false)}
        >
          <TimelineEventSelected
            eventSelected={eventSelected}
            isLoading={isSelectingEvent || isLoading}
          />
        </Modal>
      </main>
    </>
  );
};

export default ClientAgendaContent;

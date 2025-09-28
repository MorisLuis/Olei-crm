import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import { useGetEventsCalendarByDay } from '@/hooks/calendar/useGetEventsCalendarByDay';
import { useWindowSize } from '@/hooks/useWindowSize';
import Timeline from './Timeline';
import TimelineEventSelected from './TimelineEventSelected';
import TimelineModalSells from './TimelineModalSells';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelinePropsInterface {
  idCliente: string | null;
  refreshTimeline: boolean;
  openModalSells: boolean;
  navigateToModalSells: () => void;
  navigateBackFromModalSells: () => void;
}

const ClientAgendaContent = ({
  idCliente,
  refreshTimeline,
  openModalSells,
  navigateToModalSells,
  navigateBackFromModalSells
}: TimelinePropsInterface): JSX.Element => {

  const pathname = usePathname();
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1);
  const decodedDate = decodeURIComponent(lastSegment!);

  const [eventSelected, setEventSelected] = useState<number>(0);
  const [openModalEventSelected, setOpenModalEventSelected] = useState(false)
  const [isSelectingEvent, setIsSelectingEvent] = useState(true);
  const { isMobile } = useWindowSize()

  const { eventsOfTheDay, isLoading, TotalVentas, fetchNextPage } = useGetEventsCalendarByDay(decodedDate, idCliente, refreshTimeline);

  const onSelectEventFromTimeline = (Id_Bitacora: number): void => {
    setOpenModalEventSelected(true);
    setEventSelected(Id_Bitacora);
    setIsSelectingEvent(false)
  };

  useEffect(() => {
    if (!isLoading) {
      if (eventsOfTheDay && eventsOfTheDay.length > 0) {
        onSelectEventFromTimeline(Number(eventsOfTheDay[0].id));
      } else {
        onSelectEventFromTimeline(0)
      }
    }
  }, [eventsOfTheDay, refreshTimeline, isLoading]);

  return (
    <>
      <main className={styles.timelinePage__content}>
        <div className={styles.timelineContent}>
          <Timeline
            events={eventsOfTheDay}
            sellEvents={[]}
            initialDateProp={decodedDate}
            isLoading={isLoading}
            TotalVentas={TotalVentas ?? 0}
            navigateToModalSells={navigateToModalSells}
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

      <TimelineModalSells
        visible={openModalSells}
        onClose={navigateBackFromModalSells}
        sellEvents={[]}
        isLoadingUseQuery={isLoading}
        totalDocuments={TotalVentas ?? 0}
        isFetchingNextPage={false} // temporal
        loadMoreProducts={fetchNextPage}
      />
    </>
  );
};

export default ClientAgendaContent;

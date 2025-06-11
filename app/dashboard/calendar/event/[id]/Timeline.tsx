import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { EventClickArg } from '@fullcalendar/core/index.js';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import BitacoraDetailsTable from '@/app/dashboard/bitacora/[id]/BitacoraDetails';
import MessageSecondaryCard from '@/components/Cards/MessageSecondaryCard';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import { formatDateIsoOrNow } from '@/utils/format/formatDateIsoOrNow';
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
  const [isSelectingEvent, setIsSelectingEvent] = useState(true)

  const onSelectEventFromTimeline = (Id_Bitacora: number): void => {
    setEventSelected(Id_Bitacora);
    setIsSelectingEvent(false)
  };

  useEffect(() => {
    if (!isLoadingEvents) {
      if(events && events.length > 0) {
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

        {/* TIMELINE */}
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
            eventClick={(arg: EventClickArg): void => onSelectEventFromTimeline(arg.event.extendedProps?.Id_Bitacora as number)}
            allDaySlot={false}
            locale={esLocale}
            height={'auto'}
          />
        </div>
      </div>

      {/* EVENT SELECTED */}
      <div className={styles.brief}>
        <p className={styles.brief__instruction}>
          Selecciona la actividad para ver el detalle.
        </p>
        <h4>Actividad</h4>
        <BitacoraDetailsTable
          Id_Bitacora={eventSelected}
          isLoading={isSelectingEvent || isLoadingEvents}
        />
      </div>
    </div>
  );
};

export default Timeline;

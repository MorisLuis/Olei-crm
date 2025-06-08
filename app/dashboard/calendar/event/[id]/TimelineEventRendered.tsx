import { faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import BitacoraDetailsTable from '@/app/dashboard/bitacora/[id]/BitacoraDetails';
import { MessageCard } from '@/components/Cards/MessageCard';
import { TimelineInterface, TimelineMeetingInterface } from '@/interface/calendar';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface RenderEventSelectsInterface {
  eventsOfTheDay: TimelineInterface[] | null;
  events: TimelineMeetingInterface[];
  eventSelected: number;
}

export const EventsRendered = ({
  eventsOfTheDay,
  events,
  eventSelected,
}: RenderEventSelectsInterface): JSX.Element => {

  if (!eventsOfTheDay) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (events.length < 0) {
    return (
      <MessageCard
        title="No hay eventos hoy"
        icon={faCalendarXmark}
      >
        <p>
          No tienes algun evento para hoy, puedes crear un evento para el dia de hoy y se agendara.
        </p>
      </MessageCard>
    );
  }

  return (
    <div className={styles.brief}>
      <p className={styles.brief__instruction}>
        Selecciona la tarea para ver el detalle de la tarea.
      </p>
      <h4>Actividad</h4>
      <BitacoraDetailsTable Id_Bitacora={eventSelected} />
    </div>
  );
};

import React from 'react';
import BitacoraDetailsTable from '@/app/dashboard/bitacora/[id]/BitacoraDetails';
import styles from '../../../../../styles/pages/Calendar.module.scss';

interface TimelineEventSelectedInterface {
  eventSelected: number;
  isLoading: boolean
}

export default function TimelineEventSelected({
  eventSelected,
  isLoading
} : TimelineEventSelectedInterface ) : JSX.Element {
  return (
    <aside className={styles.brief}>
      <p className={styles.brief__instruction}>
        Selecciona la actividad para ver el detalle.
      </p>
      <h4>Actividad</h4>
      <BitacoraDetailsTable
        Id_Bitacora={eventSelected}
        isLoading={isLoading}
      />
    </aside>
  )
}

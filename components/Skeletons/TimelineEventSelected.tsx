import React from 'react';
import TableTertiarySkeleton from './Tables/TableTertiarySkeleton';
import styles from '../../styles/pages/Calendar.module.scss';

export default function TimelineEventSelectedSkeleton(): JSX.Element {
    return (
        <aside className={styles.brief}>
            <p className={styles.brief__instruction}>
                Selecciona la actividad para ver el detalle.
            </p>
            <h4>Actividad</h4>
            <TableTertiarySkeleton columns={6} />
        </aside>
    )
}

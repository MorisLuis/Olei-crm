'use client';

import styles from '@/styles/pages/Home.module.scss';
import CalendarSkeleton from './CalendarSkeleton';
import StatCardSkeleton from '../Cards/StateCardSkeleton';
import ChartWidgetSkeleton from '../Charts/ChartWidgetSkeleton';
import HeaderSkeleton from '../navigation/headerSkeleton';

export default function HomeSkeleton(): JSX.Element {

    return (
        <div className={styles.Home}>
            <HeaderSkeleton />

            <div className={styles.statsSections}>
                <div className={styles.statsSections__sells}>
                    <ChartWidgetSkeleton />
                </div>

                <div className={styles.statsSections__bitacora}>
                    {Array.from({ length: 4 }, (_, i : number) => (
                        <StatCardSkeleton key={i} subtitle={true}/>
                    ))}
                </div>
            </div>

            <CalendarSkeleton/>

        </div>
    );
}

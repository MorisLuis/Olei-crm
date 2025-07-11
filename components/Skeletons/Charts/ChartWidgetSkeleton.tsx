'use client';

import styles from './../../../styles/Components/Grafica.module.scss';

export default function ChartWidgetSkeleton(): JSX.Element {

    return (
        <div className={`${styles.ChartWidget} skeleton--background`} >
            <div className={`${styles.ChartData} utils__marginBottom`}>
                <div>
                    <p className='skeleton skeleton--text'></p>
                    <p className={`${styles.ChartData__value} skeleton skeleton--text`}></p>
                </div>
                <div>
                    <p className='skeleton skeleton--text'></p>
                    <p className={`${styles.ChartData__value} skeleton skeleton--text`}></p>
                </div>
            </div>

            <div className={`${styles.graph} skeleton skeleton--text`}>
            </div>
        </div>
    );
}

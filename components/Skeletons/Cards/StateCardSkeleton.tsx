import React from 'react'
import styles from '../../../styles/Components/Cards.module.scss';

export default function StatCardSkeleton({ subtitle = false }: { subtitle?: boolean }): JSX.Element {

    return (
        <div className={`${styles.StatCard} skeleton--background`} >
            <div className={`${styles.StatCard__header} skeleton utils__marginBottom__small`}>
                <p className={`skeleton skeleton--text`}></p>
            </div>
            <p className={`${styles.StatCard__value} skeleton skeleton--text utils__half--width utils__marginBottom__small`}></p>
            {subtitle && <p className={`${styles.StatCard__message} skeleton skeleton--text`}></p>}
        </div>
    )
}

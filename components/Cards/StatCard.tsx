import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Components/Cards.module.scss';

interface StatCard {
    title: string;
    value: string | number;
    icon: IconDefinition;

    message?: string;
    onClick?: () => void;
    hoverAvailable?: boolean
}

export default function StatCard({
    title,
    value,
    message,
    icon,
    onClick,
    hoverAvailable = true
}: StatCard): JSX.Element {

    return (
        <div className={hoverAvailable ? `${styles.StatCard} ${styles.hoverState}` : `${styles.StatCard}`} onClick={onClick}>
            <div className={styles.StatCard__header}>
                <p>{title}</p>
                <FontAwesomeIcon
                    icon={icon}
                    className={`icon cursor ${styles.edit}`}
                />
            </div>
            <p className={styles.StatCard__value}>{value}</p>
            <p className={styles.StatCard__message}>{message}</p>
        </div>
    )
}

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Components/Cards/StatCard.module.scss';

interface StatCard {
    title: string;
    value: string | number;
    icon: IconDefinition;

    message?: string;
    onClick?: () => void;
    hoverAvailable?: boolean

    style?: React.CSSProperties;
}

export default function StatCard({
    title,
    value,
    message,
    icon,
    onClick,
    hoverAvailable = true,
    style
}: StatCard): JSX.Element {

    return (
        <div 
        className={hoverAvailable ? `${styles.StatCard} ${styles.hoverState}` : `${styles.StatCard}`} 
        onClick={onClick}
        style={style}
        >
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

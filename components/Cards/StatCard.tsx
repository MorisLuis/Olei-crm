import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import styles from '../../styles/Components/Cards.module.scss';

interface StatCard {
    title: string;
    value: string | number;
    icon: IconDefinition;

    message?: string;
    isLoading?: boolean;
    onClick?: () => void;
}

export default function StatCard({
    title,
    value,
    message,
    icon,
    isLoading,
    onClick
}: StatCard): JSX.Element {

    if (isLoading) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div className={styles.StatCard} onClick={onClick}>
            <div className={styles.StatCard__header}>
                <p>{title}</p>
                <FontAwesomeIcon
                    icon={icon}
                    className={`icon cursor ${styles.edit}`}
                />
            </div>
            <p className={styles.value}>{value}</p>
            <p className={styles.message}>{message}</p>
        </div>
    )
}

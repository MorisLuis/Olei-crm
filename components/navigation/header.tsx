"use client";

import React from 'react';
import { IconDefinition, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import ActionsComponent from '../UI/ActionsComponent';
import styles from '../../styles/Navigation.module.scss';

export interface ActionsInterface {
    id: number;
    text: string;
    onclick: () => void;
    icon?: IconDefinition;
    color?: "red" | "black" | "white" | "blue" | "yellow";
}


interface HeaderInterface {
    title: string;
    actions?: ActionsInterface[]
}

export default function Header({
    title,
    actions
}: HeaderInterface) {

    const router = useRouter()
    const pathname = usePathname();
    const [basePath, id] = pathname.split('/').filter(Boolean);
    const goBack = () => router.back();

    return (

        <div className={styles.header}>
            <div className={styles.header__title}>
                {
                    id &&
                    <FontAwesomeIcon
                        onClick={goBack}
                        icon={faArrowLeft}
                        className={`${styles.icon} icon__small`}
                    />
                }
                <h2>{title}</h2>
                <div className='none'>{basePath}</div>
            </div>

            <ActionsComponent actions={actions} />
        </div>
    )
}

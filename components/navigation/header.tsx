"use client";

import React from 'react';
import { faArrowLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import ButtonSmall from '../Buttons/ButtonSmall';
import styles from '../../styles/Navigation.module.scss';

export interface ActionsInterface {
    id: number;
    text: string;
    onclick: () => void;
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

            {
                actions &&
                <div className={styles.header__actions}>
                    <div className={styles.buttons}>
                        {
                            actions.map((item) =>
                                <ButtonSmall text={item.text} onClick={item.onclick} key={item.id} />
                            )
                        }
                    </div>

                    <div className={styles.hamburguer}>
                        <FontAwesomeIcon icon={faEllipsis} className={`${styles.icon} icon__small`} />
                    </div>
                </div>
            }
        </div>
    )
}

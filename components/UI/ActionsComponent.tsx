"use client";

import React, { useState } from 'react';
import { ActionsInterface } from '../navigation/header';
import ButtonSmall from '../Buttons/ButtonSmall';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/Actions.module.scss';

interface ActionsComponentInterface {
    actions?: ActionsInterface[]
}

export default function ActionsComponent({
    actions
}: ActionsComponentInterface) {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.actions}>
            <div className={styles.buttons}>
                {
                    actions?.map((item) =>
                        <ButtonSmall text={item.text} onClick={item.onclick} key={item.id} />
                    )
                }
            </div>

            <div className={styles.hamburguer} onClick={() => setModalOpen(!modalOpen)}>
                <FontAwesomeIcon icon={faEllipsis} className={`${styles.icon} icon__small`} />
            </div>

            {
                modalOpen &&
                <div className={styles.modalActions}>
                    <div className={styles.actionsList}>
                        {actions?.map((option, index) => (
                            <div
                                key={index}
                                className={styles.actionItem}
                                onClick={option.onclick}
                            >
                                {option.icon && <FontAwesomeIcon icon={option.icon} className={styles.filterItem__icon} />}
                                <p>{option.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
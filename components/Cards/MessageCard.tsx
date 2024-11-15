import React, { ReactNode } from 'react'
import styles from "../../styles/Cards.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';


interface Props {
    children: ReactNode,
    title: string,
    icon?: IconDefinition;
}

export const MessageCard = ({
    children,
    title,
    icon
}: Props) => {

    return (
        <div className={styles.MessageCard}>
            {
                icon &&
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={icon} className={`icon`} />
                </div>
            }
            <h2>{title}</h2>
            <div className={styles.paragraph}>
                {children}
            </div>
        </div>
    )
}

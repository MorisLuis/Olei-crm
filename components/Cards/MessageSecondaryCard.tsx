import React from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../../styles/Components/Cards.module.scss";
import ButtonSmall from '../Buttons/ButtonSmall';

interface MessageSecondaryCardInterface {
    title: string;
    icon?: IconDefinition;
    action?: {
        onClick: () => void
        color?: "red" | "black" | "white" | "blue" | "yellow";
        text: string;
    }
}

export default function MessageSecondaryCard({
    title,
    icon,
    action
}: MessageSecondaryCardInterface) {
    return (
        <div className={styles.MessageSecondaryCard}>
        <div className={styles.left}>
                {
                    icon &&
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={icon} className={`icon`} />
                    </div>
                }
                <p>{title}</p>
            </div>

            {
                action &&
                <div className={styles.rigth}>
                <ButtonSmall onClick={action?.onClick} color={action?.color}  text={action.text}/>
                </div>
            }
        </div>
    )
}

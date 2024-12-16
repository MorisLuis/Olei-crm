import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";
import { MessageCard } from './MessageCard';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { Tag } from '../UI/Tag';

export interface briefDataInterface {
    id: number;
    label: string;
    value: string;
}

interface BriefCardInterface {
    data: briefDataInterface[] | null;
    header?: string;
    isLoading: boolean;

}

export default function BriefCard({
    data,
    header = "Resumen",
    isLoading
}: BriefCardInterface ) {

    if(isLoading) {
        return (
            <div>
                <p>Cargando...</p>
            </div>
        )
    };

    if(!data) {
        return (
            <MessageCard title='No hay información.' icon={faAddressCard}>
                <p>No se encontro información de este usuario</p>
            </MessageCard>
        )
    }

    return (
        <div className={styles.BriefCard}>
            <h3>{header}</h3>

            <div className='divider small'></div>

            {
                data.map((item) => (
                    <div key={item.id} className={styles.data}>
                        <div>
                            <label>{item.label}</label>
                            {
                                item.value && item.value !== 'null' ? <p>{item.value}</p>
                                :
                                <Tag color='gray'>Sin datos</Tag>
                            }
                        </div>
                        <div className={`${styles.dividerLocal} divider small`}></div>
                    </div>
                ))
            }
        </div>
    )
}

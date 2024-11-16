import React from 'react'
import styles from "../../styles/Components/Cards.module.scss";

export interface briefDataInterface {
    id: number;
    label: string;
    value: string;
}

interface BriefCardInterface {
    data: briefDataInterface[]
}

export default function BriefCard({
    data
}: BriefCardInterface ) {
    return (
        <div className={styles.BriefCard}>
            <h3>Resumen</h3>

            <div className='divider small'></div>

            {
                data.map((item) => (
                    <div key={item.id} className={styles.data}>
                        <div>
                            <label>{item.label}</label>
                            <p>{item.value}</p>
                        </div>
                        <div className={`${styles.dividerLocal} divider small`}></div>
                    </div>
                ))
            }
        </div>
    )
}

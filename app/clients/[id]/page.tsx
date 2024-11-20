import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard'
import { clientDetailsExample } from '@/seed/clientsData';
import React from 'react'
import Header from '@/components/navigation/header';
import styles from "../../../styles/pages/Clients.module.scss";

export default function ClientDetailsPage() {

    const briefData: briefDataInterface[] = [
        { id: 1, label: 'Nombre', value: `${clientDetailsExample?.Nombre ?? ''}` },
        { id: 2, label: 'RazonSocial', value: `${clientDetailsExample?.RazonSocial ?? 'N/A'}` },
        { id: 3, label: 'Telefono', value: `${clientDetailsExample?.Telefono1 ?? 'N/A'}` },
        { id: 4, label: 'Correo', value: `${clientDetailsExample?.CorreoVtas ?? 'N/A'}` }
    ];


    return (
        <>
            <Header title={`${clientDetailsExample.Nombre}`}/>
            <div className={styles.clientDetails}>
                <div className={styles.clientDetails__calendar}>
                    <h4>calendario</h4>
                </div>
                <div className={styles.clientDetails__brief}>
                    <BriefCard data={briefData} />
                </div>
            </div>
        </>
    )
}

"use client";

import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard'
import { clientDetailsExample } from '@/seed/clientsData';
import React from 'react'
import Header from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from './TableTertiaryBitacoraDetails';
import FileUploader from '@/components/UI/FileUploader';
import styles from "../../../styles/pages/Bitacora.module.scss";

export default function ClientDetailsPage() {

    const briefData: briefDataInterface[] = [
        { id: 1, label: 'Nombre', value: `${clientDetailsExample?.Nombre ?? ''}` },
        { id: 2, label: 'RazonSocial', value: `${clientDetailsExample?.RazonSocial ?? 'N/A'}` },
        { id: 3, label: 'Telefono', value: `${clientDetailsExample?.Telefono1 ?? 'N/A'}` },
        { id: 4, label: 'Correo', value: `${clientDetailsExample?.CorreoVtas ?? 'N/A'}` }
    ];

    return (
        <>
            <Header title={`${clientDetailsExample.Nombre}`} />
            <div className={styles.bitacoraDetails}>
                <div className={styles.bitacoraDetails__data}>
                    <div className={styles.details}>
                        <h4>Reunión</h4>
                        <TableTertiaryBitacoraDetails/>
                    </div>
                    <FileUploader/>
                </div>
                <div className={styles.bitacoraDetails__brief}>
                    <BriefCard data={briefData} header="Detalle de cliente" />
                </div>
            </div>
        </>
    )
}

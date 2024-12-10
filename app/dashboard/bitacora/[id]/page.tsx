"use client";

import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard'
import { clientDetailsExample } from '@/seed/clientsData';
import React, { useContext, useEffect } from 'react'
import Header from '@/components/navigation/header';
import TableTertiaryBitacoraDetails from './TableTertiaryBitacoraDetails';
import FileUploader from '@/components/UI/FileUploader';
import styles from "../../../../styles/pages/Bitacora.module.scss";
import { SettingsContext } from '@/context/Settings/SettingsContext';
import { usePathname } from 'next/navigation';

export default function ClientDetailsPage() {

    const { handleUpdatePathname } = useContext(SettingsContext);

    const pathname = usePathname();
    const Id_Bitacora = pathname.split('/').filter(Boolean)[2];   
    console.log({Id_Bitacora})

    const briefData: briefDataInterface[] = [
        { id: 1, label: 'Nombre', value: `${clientDetailsExample?.Nombre ?? ''}` },
        { id: 2, label: 'RazonSocial', value: `${clientDetailsExample?.RazonSocial ?? 'N/A'}` },
        { id: 3, label: 'Telefono', value: `${clientDetailsExample?.Telefono1 ?? 'N/A'}` },
        { id: 4, label: 'Correo', value: `${clientDetailsExample?.CorreoVtas ?? 'N/A'}` }
    ];


    useEffect(() => {
        if(!clientDetailsExample) return;
        handleUpdatePathname(clientDetailsExample.Nombre ?? undefined)
    }, [handleUpdatePathname])

    return (
        <>
            <Header title={`${clientDetailsExample.Nombre}`} />
            <div className={styles.bitacoraDetails}>
                <div className={styles.bitacoraDetails__data}>
                    <div className={styles.details}>
                        <h4>Reunión</h4>
                        <TableTertiaryBitacoraDetails Id_Bitacora={Number(Id_Bitacora)}/>
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

"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import React from 'react'
import styles from '../../../styles/pages/SellDetails.module.scss'
import {  useSearchParams } from 'next/navigation'
import MeetingInterface from '@/interface/meeting';
import { meetingExample } from '@/seed/bitacoraData';
import { Tag } from '@/components/UI/Tag';
import { contactType } from '@/utils/contactType';

export default function TableTertiaryBitacoraDetails() {

    const rawSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(rawSearchParams);
    const sellId = searchParams.get('sellId');    
    const sellsData = {
        Id_Bitacora: meetingExample.Id_Bitacora,
        Id_Almacen: meetingExample.Id_Almacen,
        Id_Cliente: meetingExample.Id_Cliente,
        Fecha: meetingExample.Fecha,
        Hour: meetingExample.Hour,
        Descripcion: meetingExample.Descripcion,
        TipoContacto: meetingExample.TipoContacto
    };

    const columns: ColumnTertiaryConfig<MeetingInterface>[] = [
        {
            key: 'Id_Bitacora',
            label: 'Id_Bitacora',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Bitacora</p>
                </div>
            )
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha</p>
                </div>
            )
        },
        {
            key: 'Hour',
            label: 'Hora',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Hora</p>
                </div>
            )
        },
        {
            key: 'TipoContacto',
            label: 'TipoContacto',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Tipo de Contacto</p>
                </div>
            ),
            render: (TipoContacto) => (
                <div className={styles.sellItem}>
                    <Tag color='red'>{contactType(TipoContacto as MeetingInterface['TipoContacto'])}</Tag>
                </div>
            )
        },
        {
            key: 'Id_Almacen',
            label: 'Id Almacen',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Almacen</p>
                </div>
            )
        },
        {
            key: 'Id_Cliente',
            label: 'Id Cliente',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Cliente</p>
                </div>
            )
        },
        {
            key: 'Descripcion',
            label: 'Descripcion',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Descripcion</p>
                </div>
            )
        },
    ];

    return (
        <div className={styles.sellDetails}>
            <TableTertiary
                columns={columns}
                data={sellsData}
            />
            <div className='none'>{sellId}</div>
        </div>
    )
}

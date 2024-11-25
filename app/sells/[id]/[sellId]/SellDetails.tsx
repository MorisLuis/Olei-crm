"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import { SellsInterface } from '@/interface/sells';
import { sellDetailsExample } from '@/seed/sellsData'
import React from 'react'
import styles from '../../../../styles/pages/SellDetails.module.scss'
import { useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/formatDate';

export default function SellDetails() {

    const rawSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(rawSearchParams);
    const sellId = searchParams.get('sellId');
    const sellsData = {
        Nombre: sellDetailsExample.Nombre,
        Folio: sellDetailsExample?.Folio,
        Fecha: sellDetailsExample.Fecha,
        FechaEntrega: sellDetailsExample.FechaEntrega,
        FechaLiq: sellDetailsExample.FechaLiq,
        Id_Almacen: sellDetailsExample.Id_Almacen,
        Id_Cliente: sellDetailsExample.Id_Cliente,
        Piezas: sellDetailsExample.Piezas,
        Impuesto: sellDetailsExample.Impuesto,
        ExpiredDays: sellDetailsExample.ExpiredDays,
        Total: sellDetailsExample.Total,
        Saldo: sellDetailsExample.Saldo,
        Serie: sellDetailsExample.Serie,
        TipoDoc: sellDetailsExample.TipoDoc,
        UniqueKey: sellDetailsExample.UniqueKey,
    };

    const columns: ColumnTertiaryConfig<Partial<SellsInterface>>[] = [
        {
            key: 'Nombre',
            label: 'Nombre',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Nombre</p>
                </div>
            )
        },
        {
            key: 'Folio',
            label: 'Folio',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Folio</p>
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
            ),
            render: (Fecha) => (
                <div>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            )
        },
        {
            key: 'FechaEntrega',
            label: 'FechaEntrega',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha Entrega</p>
                </div>
            ),
            render: (FechaEntrega) => (
                <div>
                    <p>{formatDate(FechaEntrega as Date)}</p>
                </div>
            )
        },
        {
            key: 'FechaLiq',
            label: 'Fecha Liquidación',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha Liquidación</p>
                </div>
            ),
            render: (FechaLiq) => (
                <div>
                    <p>{formatDate(FechaLiq as Date)}</p>
                </div>
            )
        },
        {
            key: 'Id_Almacen',
            label: 'Id Almacen',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Almacen</p>
                </div>
            )
        },
        {
            key: 'Id_Cliente',
            label: 'Id Cliente',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Cliente</p>
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

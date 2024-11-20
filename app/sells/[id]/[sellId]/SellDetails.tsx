"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import { SellsInterface } from '@/interface/sells';
import { sellDetailsExample } from '@/seed/sellsData'
import React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../../styles/pages/SellDetails.module.scss'
import {  useSearchParams } from 'next/navigation'

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
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Nombre</p>
                </div>
            )
        },
        {
            key: 'Folio',
            label: 'Folio',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Folio</p>
                </div>
            )
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Fecha</p>
                </div>
            )
        },
        {
            key: 'FechaEntrega',
            label: 'FechaEntrega',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>FechaEntrega</p>
                </div>
            )
        },
        {
            key: 'FechaLiq',
            label: 'Fecha Liquidación',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>FechaLiq</p>
                </div>
            )
        },
        {
            key: 'Id_Almacen',
            label: 'Id Almacen',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Id_Almacen</p>
                </div>
            )
        },
        {
            key: 'Id_Cliente',
            label: 'Id Cliente',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <FontAwesomeIcon icon={faUser} className="icon__small" />
                    <p>Id_Cliente</p>
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

"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import { SellsInterface } from '@/interface/sells';
import { sellsClientExample } from '@/seed/sellsData'
import React from 'react'
import styles from '../../../../styles/pages/SellDetails.module.scss'
import { useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/formatDate';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { docType } from '@/utils/docType';

export default function SellDetails() {

    const rawSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(rawSearchParams);
    const sellId = searchParams.get('sellId');
    const { changeColor } = useTagColor()
    const sellsData = sellsClientExample.find((item) => item.UniqueKey === sellId) ?? sellsClientExample[0];

    const columns: ColumnTertiaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            renderLabel: () => <div className={styles.sellItem}><p>Tipo de documento</p></div>,
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>
        },
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

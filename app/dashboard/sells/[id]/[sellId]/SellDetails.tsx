"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import { SellsInterface } from '@/interface/sells';
import { sellDetailsExample, sellsClientExample } from '@/seed/sellsData'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/formatDate';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { docType } from '@/utils/docType';
import TableSellsDetailsClient from './TableSellsDetails';
import styles from '../../../../../styles/pages/SellDetails.module.scss'

export default function SellDetails() {

    const rawSearchParams = useSearchParams();
    const searchParams = new URLSearchParams(rawSearchParams);
    const sellId = searchParams.get('sellId');
    const { changeColor } = useTagColor()
    const sellsData = sellsClientExample.find((item) => item.UniqueKey === sellId) ?? sellsClientExample[0];

    // ESTO CAMBIA
    const totalSells = 4;
    const loadMoreProducts = async () => {
    }
    // TERMINA CAMBIO

    const columns: ColumnTertiaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            renderLabel: () => <div className={styles.sellItem}><p>Tipo de documento</p></div>,
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>
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
        }
    ];

    return (
        <div className={styles.sellDetails}>
            <TableTertiary
                columns={columns}
                data={sellsData}
            />

            <TableSellsDetailsClient
                sells={sellDetailsExample}
                totalSells={totalSells}
                buttonIsLoading={false}
                loadingData={false}
                loadMoreProducts={loadMoreProducts}
                handleSelectItem={(item) => console.log({ item })}
            />

            <div className='none'>{sellId}</div>
        </div>
    )
}

"use client";

import { sellsClientExample, sellsExample } from '@/seed/sellsData';
import { useParams } from 'next/navigation';
import React from 'react'
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard';
import styles from "../../../styles/pages/Sells.module.scss";

export default function SellsClientPage() {

    const { id } = useParams();
    const totalSells = 4
    const loadMoreProducts = async () => {
    }
    const sell = sellsExample.find((item) => item.Folio === Number(id));

    const briefData : briefDataInterface[] = [
        {
            id: 1,
            label: 'Producto',
            value: `${id}`
        },
        {
            id: 2,
            label: 'Nombre',
            value: `${sell?.Nombre}`
        },
        {
            id: 3,
            label: 'Fecha',
            value: `${sell?.Fecha}`
        },
        {
            id: 4,
            label: 'Almacen',
            value: `${sell?.Id_Almacen}`
        }
    ]

    return (
        <div className={styles.SellsClient}>
            <Header title='Ventas' />

            <div className={styles.content}>
                <div className={styles.table}>
                    <TableSellsClient
                        sells={sellsClientExample}
                        totalSells={totalSells}
                        loadMoreProducts={loadMoreProducts}
                        buttonIsLoading={false}
                        loadingData={false}
                    />
                </div>

                <div className={styles.brief}>
                    <BriefCard
                        data={briefData}
                    />
                </div>
            </div>
        </div>
    )
}

"use client";

import React, { useState } from 'react'
import { sellsClientExample, sellsExample } from '@/seed/sellsData';
import { useParams } from 'next/navigation';
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard';
import styles from "../../../styles/pages/Sells.module.scss";
import { SellsOrderConditionType } from '@/interface/sells';

export default function SellsClientPage() {

    const { id } = useParams();
    const totalSells = 4;
    const loadMoreProducts = async () => {
    };
    const filters = ["Fecha", "Saldo", "Total"];
    const sell = sellsExample.find((item) => item.Id_Cliente === Number(id));
    const [filtersSells] = useState<SellsOrderConditionType[]>(['FechaEntrega', 'Folio', 'TipoDoc']);


    const briefData: briefDataInterface[] = [
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
    ];

    return (
        <div className={styles.SellsClient}>
            <Header
                title={`${sell?.Nombre}`}
                filters={filters}
                filterActive={filtersSells}
            />

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

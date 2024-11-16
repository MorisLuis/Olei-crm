"use client";

import React from 'react';
import styles from "../../styles/pages/Sells.module.scss";
import TableSells from './TableSells';
import { sellsExample } from '@/seed/sellsData';

export default function Sells() {

    const totalSells = 3;
    const filters = ["Fecha", "Saldo", "Total"];
    const loadMoreProducts = async () => {
    }

    return (
        <div className={styles.page}>
            <TableSells
                sells={sellsExample}
                totalSells={totalSells}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
                filters={filters}
            />
        </div>
    )
}

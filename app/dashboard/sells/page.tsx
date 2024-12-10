"use client";

import React, { useCallback, useEffect, useState } from 'react';
import TableSells from './TableSells';
import HeaderTable from '@/components/navigation/headerTable';
import { useOrderSellsConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import styles from "../../../styles/pages/Sells.module.scss";
import { getSells } from '@/services/sells';
import { SellsInterface } from '@/interface/sells';

export default function Sells() {

    const { orderSells } = useOrderSellsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSells[0]);
    const [sellsData, setSellsData] = useState<SellsInterface[]>([])

    // ESTO CAMBIA
    const totalSells = 2;
    const loadMoreProducts = async () => {
        try {
            const data = await getSells({ PageNumber: 1});
            setSellsData(data)
        } catch (error) {
            console.log({error})
        }
    }
    // TERMINA CAMBIO

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderSells.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const executeQuery = useCallback(() => {
        // Construir la query URL.
        const queryUrl = `api/sells/3?sellsFilterCondition=${orderActive.order}`;
        console.log({ query: queryUrl });
    }, [orderActive]);

    useEffect(() => {
        executeQuery()
        loadMoreProducts()
    }, [])

    return (
        <div className={styles.page}>
            <Header title='Ventas' />
            <HeaderTable
                orderSells={orderSells}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />
            <TableSells
                sells={sellsData}
                totalSells={totalSells}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
            />
        </div>
    )
}

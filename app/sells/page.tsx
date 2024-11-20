"use client";

import React, { useEffect, useState } from 'react';
import TableSells from './TableSells';
import { sellsExample } from '@/seed/sellsData';
import HeaderTable from '@/components/navigation/headerTable';
import { useOrderSellsConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import styles from "../../styles/pages/Sells.module.scss";

export default function Sells() {

    const { orderSells } = useOrderSellsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSells[0])

    // ESTO CAMBIA
    const totalSells = 2;
    const loadMoreProducts = async () => {
    }
    // TERMINA CAMBIO

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderSells.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const executeQuery = () => {
        // Construir la query URL.
        const queryUrl = `api/sells/3?sellsFilterCondition=${orderActive.order}`;
        console.log({ query: queryUrl });
    };

    useEffect(() => {
        executeQuery()
    }, [orderActive])

    return (
        <div className={styles.page}>
            <Header title='Ventas' />
            <HeaderTable
                orderSells={orderSells}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />
            <TableSells
                sells={sellsExample}
                totalSells={totalSells}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
            />
        </div>
    )
}

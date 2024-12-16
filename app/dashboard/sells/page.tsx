"use client";

import React, { useEffect, useState } from 'react';
import TableSells from './TableSells';
import HeaderTable from '@/components/navigation/headerTable';
import { useOrderSellsConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import styles from "../../../styles/pages/Sells.module.scss";
import { getSells, getTotalSells } from '@/services/sells';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';

export default function Sells() {

    const { orderSells } = useOrderSellsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSells[0]);

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getSells({ PageNumber: 1, SellsOrderCondition: orderActive }),
        fetchPaginatedData: (_, nextPage) => getSells({ PageNumber: nextPage ?? 1, SellsOrderCondition: orderActive }),
        fetchTotalCount: () => getTotalSells(),
        filters: orderActive
    })

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderSells.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    useEffect(() => {
        handleResetData()
    }, [orderActive]);

    return (
        <div className={styles.page}>
            <Header title='Ventas' />
            <HeaderTable
                orderSells={orderSells}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />
            <TableSells
                sells={data}
                totalSells={total ?? 0}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
            />
        </div>
    )
}

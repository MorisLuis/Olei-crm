"use client";

import React, { useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import TableClients from './TableClients';
import { useOrderClientsConfig } from '@/hooks/Orders/useOrderClientsConfig';
import styles from "../../../styles/pages/Clients.module.scss";
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { getClients, getTotalClients } from '@/services/clients';

export default function Clients() {

    const { orderClients } = useOrderClientsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderClients[0]);
    const [clientSearchValue, setClientSearchValue] = useState<string>()

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getClients({ PageNumber: 1, ClientsOrderCondition: orderActive }),
        fetchPaginatedData: (_, nextPage) => getClients({ PageNumber: nextPage ?? 1, ClientsOrderCondition: orderActive }),
        fetchTotalCount: () => getTotalClients(),
        filters: orderActive
    })

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderClients.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const onSearchClient = (value: string) => {
        setClientSearchValue(value)
    }

    useEffect(() => {
        handleResetData();
        console.log({clientSearchValue})
    }, [orderActive]);

    return (
        <div className={styles.page}>
            <Header title='Clientes' />
            <HeaderTable
                orderSells={orderClients}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
                onSearch={onSearchClient}
            />
            <TableClients
                clients={data}
                totalClients={total ?? 9}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
            />
        </div>
    )
}

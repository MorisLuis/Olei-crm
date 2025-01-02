"use client";

import React, { useCallback, useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import TableClients from './TableClients';
import { useOrderClientsConfig } from '@/hooks/Orders/useOrderClientsConfig';
import styles from "../../../styles/pages/Clients.module.scss";
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { getClients, getTotalClients, searchClients } from '@/services/clients';
import { ClientInterface } from '@/interface/client';

export default function Clients() {

    const { orderClients } = useOrderClientsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderClients[0]);
    const [dataFromSearch, setDataFromSearch] = useState<ClientInterface[] | null>(null);

    const fetchInitialData = useCallback(() => {
        return getClients({ PageNumber: 1, ClientsOrderCondition: orderActive })
    }, [orderActive]);


    const fetchPaginatedData = useCallback((_: unknown, nextPage: number) => {
        return getClients({ PageNumber: nextPage ?? 1, ClientsOrderCondition: orderActive })
    }, [orderActive]);

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData,
        fetchPaginatedData: (_, nextPage) => fetchPaginatedData(_, nextPage as number),
        fetchTotalCount: () => getTotalClients(),
        filters: orderActive
    });

    const totalClients = dataFromSearch?.length ?? total ?? 0;

    const onSelectOrder = useCallback((value: string | number) => {
        const selectedOrder = orderClients.find((item) => item.value == value);
        if (!selectedOrder) return;
        setOrderActive(selectedOrder);
    }, [orderClients]);
    
    const onSearchClient = async (value: string) => {
        if(value === '') return;
        const clients = await searchClients(value);
        setDataFromSearch(clients);
    };
    
    const onCleanSearchClient = useCallback(() => {
        setDataFromSearch(null);
    }, []);
    
    
    useEffect(() => {
        handleResetData();
    }, [handleResetData]);

    return (
        <div className={styles.page}>
            <Header title='Clientes' dontShowBack />
            <HeaderTable
                orderSells={orderClients}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
                onSearch={onSearchClient}
                onCleanSearch={onCleanSearchClient}
            />
            <TableClients
                clients={dataFromSearch ?? data}
                totalClients={totalClients}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
            />
        </div>
    )
}

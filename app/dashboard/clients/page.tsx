"use client";

import React, { useCallback, useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import TableClients from './TableClients';
import { clientsExample } from '@/seed/clientsData';
import { useOrderClientsConfig } from '@/hooks/Orders/useOrderClientsConfig';
import styles from "../../../styles/pages/Clients.module.scss";

export default function Clients() {

    const { orderClients } = useOrderClientsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderClients[0]);
    const [clientSearchValue, setClientSearchValue] = useState<string>()

    // ESTO CAMBIA
    const totalClients = 2;
    const loadMoreProducts = async () => {
    }
    // TERMINA CAMBIO

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderClients.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const onSearchClient = (value: string) => {
        setClientSearchValue(value)
    }

    const executeQuery = useCallback(() => {
        // Construir la query URL.
        const queryUrl = `api/client&clientOrderCondition=${orderActive.order}?Nombre=${clientSearchValue}`;
        console.log({ query: queryUrl });
    }, [orderActive, clientSearchValue]);


    useEffect(() => {
        executeQuery()
    }, [executeQuery])

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
                clients={clientsExample}
                totalClients={totalClients}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
            />
        </div>
    )
}

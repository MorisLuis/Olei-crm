"use client";

import React, { useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header, { ActionsInterface } from '@/components/navigation/header';
import styles from "../../styles/pages/Clients.module.scss";
import TableClients from './TableClients';
import { clientsExample } from '@/seed/clientsData';
import { useOrderClientsConfig } from '@/hooks/Orders/useOrderClientsConfig';

export default function Clients() {

    const { orderClients } = useOrderClientsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderClients[0])

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

    const executeQuery = () => {
        // Construir la query URL.
        const queryUrl = `api/client&clientOrderCondition=${orderActive.order}`;
        console.log({ query: queryUrl });
    };

    const clientActions : ActionsInterface[] = [
        {
            id: 1,
            text: 'Whatsapp',
            onclick: () => console.log("Whatsapp")
        },
        {
            id: 2,
            text: 'Correo',
            onclick: () => console.log("Correo")
        },
        {
            id: 3,
            text: 'Reunión',
            onclick: () => console.log("Reunión")
        },
        {
            id: 4,
            text: 'Ventas',
            onclick: () => console.log()
        },
        {
            id: 5,
            text: 'Cobranza',
            onclick: () => console.log()
        }
    ]

    useEffect(() => {
        executeQuery()
    }, [orderActive])

    return (
        <div className={styles.page}>
            <Header title='Clientes' actions={clientActions}/>
            <HeaderTable
                orderSells={orderClients}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
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

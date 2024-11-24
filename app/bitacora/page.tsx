"use client";

import React, { useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableBitacora from './TableBitacora';
import { meetingsExamples } from '@/seed/bitacoraData';
import { useOrderMeetingsConfig } from '@/hooks/Orders/useOrderMeetingsConfig';
import { useFiltersMeetingConfig } from '@/hooks/Filters/useFiltersMeetingsConfig';
import { useFilters } from '@/hooks/Filters/useFilters';
import FormMeeting from './FormMeeting';
import styles from "../../styles/pages/Sells.module.scss";

export default function Bitacora() {

    const { orderMeetings } = useOrderMeetingsConfig()
    const [orderActive, setOrderActive] = useState<OrderObject>(orderMeetings[0])
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersMeeting, filterOfMeetings } = useFiltersMeetingConfig();
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false)

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ]

    // ESTO CAMBIA
    const totalSells = 2;
    const loadMoreProducts = async () => {
    }
    // TERMINA CAMBIO

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderMeetings.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const executeQuery = () => {
        // Construir la query URL.
        const queryUrl = `/api/meetings&meetginOrderCondition=${orderActive.order}`;
        console.log({ query: queryUrl });
    };

    useEffect(() => {
        executeQuery()
    }, [orderActive])

    return (
        <div className={styles.page}>
            <Header title='Bitacora' actions={clientActions} />
            <HeaderTable
                filters={filtersMeeting}
                filtersOfSection={filterOfMeetings}

                filterActive={filtersTag}
                filtersActive={filtersActive}
                onSelectFilter={onSelectFilterValue}
                onDeleteFilter={onDeleteFilter}

                orderSells={orderMeetings}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />

            <TableBitacora
                sells={meetingsExamples}
                totalSells={totalSells}
                loadMoreProducts={loadMoreProducts}
                buttonIsLoading={false}
                loadingData={false}
            />

            <FormMeeting 
                visible={openModalCreateMeeting}
                onClose={() => setOpenModalCreateMeeting(false)}
            />
        </div>
    )
}

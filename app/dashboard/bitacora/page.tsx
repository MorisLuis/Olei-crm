"use client";

import React, { useCallback, useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header, { ActionsInterface } from '@/components/navigation/header';
import TableBitacora from './TableBitacora';
import { useOrderMeetingsConfig } from '@/hooks/Orders/useOrderMeetingsConfig';
import { useFiltersMeetingConfig } from '@/hooks/Filters/useFiltersMeetingsConfig';
import { useFilters } from '@/hooks/Filters/useFilters';
import FormMeeting from './FormMeeting';
import styles from "../../../styles/pages/Sells.module.scss";
import { getMeetings, getTotalMeetings } from '@/services/meeting';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { ExecuteFiltersMeeting } from './filters';

export default function Bitacora() {

    const { orderMeetings } = useOrderMeetingsConfig();
    const [orderActive, setOrderActive] = useState<OrderObject>(orderMeetings[0])
    const [openModalCreateMeeting, setOpenModalCreateMeeting] = useState(false);

    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersMeeting, filterOfMeetings } = useFiltersMeetingConfig();
    const filters = ExecuteFiltersMeeting({ orderActive, filtersActive });

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Nueva Reunión',
            onclick: () => setOpenModalCreateMeeting(true),
            color: 'yellow'
        }
    ];

    const fetchInitialData = useCallback(() => {
        return getMeetings({
            PageNumber: 1,
            filters: filters
        });
    }, [filters]);

    const fetchPaginatedData = useCallback((_: unknown, nextPage: number) => {
        return getMeetings({
            PageNumber: nextPage ?? 1,
            filters: filters
        })
    }, [filters]);

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData,
        fetchPaginatedData: (_, nextPage) => fetchPaginatedData(_, nextPage as number),
        fetchTotalCount: () => getTotalMeetings({
            filters: filters
        }),
        filters: filters
    });

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderMeetings.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    useEffect(() => {
        handleResetData()
    }, [orderActive, filtersActive]);


    return (
        <div className={styles.page}>
            <Header
                title='Bitacora'
                actions={clientActions}
            />
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
                sells={data}
                totalSells={total ?? 0}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
            />

            <FormMeeting
                visible={openModalCreateMeeting}
                onClose={() => setOpenModalCreateMeeting(false)}
            />
        </div>
    )
}

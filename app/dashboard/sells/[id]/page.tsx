"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/Filters/useFilters';
import { useFiltersSellsConfig } from '@/hooks/Filters/useFiltersSellsConfig';
import { useOrderSellsClientConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { OrderObject } from '@/components/UI/OrderComponent';
import { FilterSellsByClient, SellsInterface, SellsOrderByClientCondition, SellsOrderConditionByClientType } from '@/interface/sells';
import Modal from '@/components/Modals/Modal';
import SellDetails from './[sellId]/SellDetails';
import RenderDateFilter from './RenderDateFilter';
import styles from "../../../../styles/pages/Sells.module.scss";
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { getSellsByClient, getTotalSellsByClient } from '@/services/sells';



export default function SellsClientPage() {

    const { id } = useParams();
    const searchParams = useSearchParams();
    const client = searchParams.get('client');

    const { push, back } = useRouter();
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersOfSectionSells, filtersSells } = useFiltersSellsConfig();
    const { orderSellsClient } = useOrderSellsClientConfig();
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSellsClient[0]);
    const [openModalSell, setOpenModalSell] = useState(false);

    const executeFilters = () => {
        const FilterTipoDoc = filtersActive.some((item) => (item.value !== 0) && item.filter === 'TipoDoc') ? 1 : 0;
        const FilterExpired = filtersActive.some((item) => item.value === 'Expired') ? 1 : 0;
        const FilterNotExpired = filtersActive.some((item) => item.value === 'Not Expired') ? 1 : 0;
        const TipoDoc = filtersActive.find((item) => item.filter === 'TipoDoc')?.value as SellsInterface['TipoDoc'] ?? 0;
        let sellsOrderCondition: SellsOrderConditionByClientType;

        // Validar que el valor cumple con SellsOrderConditionByClientType
        if (typeof orderActive.order !== 'string' || !SellsOrderByClientCondition.includes(orderActive.order as SellsOrderConditionByClientType)) {
            sellsOrderCondition = 'Fecha';
        } else {
            sellsOrderCondition = orderActive.order as SellsOrderConditionByClientType;
        };

        const getDateValue = (filterName: string): string | undefined => {
            const value = filtersActive.find((item) => item.filter === filterName)?.value;
            return typeof value === 'string' && value !== 'undefined' ? value : undefined;
        };

        const DateExactly = getDateValue('Date');
        const DateStart = getDateValue('DateStart');
        const DateEnd = getDateValue('DateEnd');

        const filters: FilterSellsByClient = {
            FilterTipoDoc,
            FilterExpired,
            FilterNotExpired,
            TipoDoc,
            DateExactly,
            DateStart,
            DateEnd,
            sellsOrderCondition
        };

        return filters;
    };

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getSellsByClient({ PageNumber: 1, client: Number(id), filters: executeFilters() }),
        fetchPaginatedData: (_, nextPage) => getSellsByClient({ client: Number(id), PageNumber: nextPage, filters: executeFilters() }),
        fetchTotalCount: () => getTotalSellsByClient({ client: Number(id), filters: executeFilters() }),
        filters: executeFilters()
    })

    const onSelectOrder = useCallback((value: string | number) => {
        const orderActive = orderSellsClient.find((item) => item.value == value);
        if (!orderActive) return;
        setOrderActive(orderActive)
    }, [orderSellsClient])

    const handleSelectItem = useCallback((item: SellsInterface) => {
        const sellId = `${item.Id_Almacen}-${item.TipoDoc}-${item?.Serie?.trim()}-${item.Folio}`
        push(`/dashboard/sells/${id}/?sellId=${sellId}`)
        setOpenModalSell(true)
    }, [id, push])

    const handleCloseModalSell = useCallback(() => {
        setOpenModalSell(false)
        back()
    }, [back])

    // Select filters custum ( optional )
    const CustumFilters = ['Date'] as const;
    type CustomRenderKey = typeof CustumFilters[number];
    type CustomRenderType = {
        [key in CustomRenderKey]?: React.ReactNode;
    };

    const CustumRenders: CustomRenderType[] = [
        {
            Date:
                RenderDateFilter({
                    onSelectFilter: onSelectFilterValue,
                    onDeleteFilter,
                    filtersActive
                })
        },
    ];

    useEffect(() => {
        handleResetData()
    }, [filtersActive, orderActive]);

    return (
        <>
            <div className={styles.SellsClient}>
                <Header title={client} />
                <HeaderTable
                    filters={filtersSells}
                    filterActive={filtersTag}
                    filtersOfSection={filtersOfSectionSells}
                    filtersActive={filtersActive}
                    onSelectFilter={onSelectFilterValue}
                    onDeleteFilter={onDeleteFilter}

                    orderSells={orderSellsClient}
                    onSelectOrder={onSelectOrder}
                    orderActive={orderActive}

                    customFilters={CustumFilters}
                    customRenders={CustumRenders}
                />

                <div className={styles.content}>
                    <div className={styles.table}>
                        <TableSellsClient
                            sells={data}
                            totalSells={total ?? 0}
                            loadMoreProducts={handleLoadMore}
                            buttonIsLoading={isButtonLoading}
                            loadingData={isLoading}
                            handleSelectItem={handleSelectItem}
                        />
                    </div>
                </div>
            </div>

            <Modal
                visible={openModalSell}
                title='Detalle de venta'
                onClose={handleCloseModalSell}
            //modalSize='medium'
            >
                <SellDetails />
            </Modal>
        </>
    )
}

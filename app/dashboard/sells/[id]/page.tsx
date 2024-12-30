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
import { SellsInterface } from '@/interface/sells';
import Modal from '@/components/Modals/Modal';
import SellDetails from './[sellId]/SellDetails';
import styles from "../../../../styles/pages/Sells.module.scss";
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { getSellsByClient, getTotalSellsByClient } from '@/services/sells';
import { ExecuteFiltersSellsByClient } from './filters';
import { CustumRendersSellsByClient } from './RenderDateFilter';

export default function SellsClientPage() {

    const { push, back } = useRouter();
    const { id } = useParams();
    const searchParams = useSearchParams();
    const clientName = searchParams.get('client');
    const { orderSellsClient } = useOrderSellsClientConfig();
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSellsClient[0]);
    const Sellid = searchParams.get('sellId');

    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersOfSectionSells, filtersSells } = useFiltersSellsConfig();
    const { CustumFilters, CustumRenders } = CustumRendersSellsByClient({ filtersActive, onDeleteFilter, onSelectFilterValue });
    const filters = ExecuteFiltersSellsByClient({ orderActive, filtersActive })

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getSellsByClient({ PageNumber: 1, client: Number(id), filters: filters }),
        fetchPaginatedData: (_, nextPage) => getSellsByClient({ client: Number(id), PageNumber: nextPage, filters: filters }),
        fetchTotalCount: () => getTotalSellsByClient({ client: Number(id), filters: filters }),
        filters: filters
    })

    const onSelectOrder = useCallback((value: string | number) => {
        const orderActive = orderSellsClient.find((item) => item.value == value);
        if (!orderActive) return;
        setOrderActive(orderActive)
    }, [orderSellsClient]);

    const handleSelectItem = useCallback((item: SellsInterface) => {
        if (!item.UniqueKey || !id) return;
        push(`/dashboard/sells/${id}/?sellId=${item.UniqueKey}`);
    }, [id, push]);

    useEffect(() => {
        handleResetData()
    }, [filtersActive, orderActive]);

    return (
        <>
            <div className={styles.SellsClient}>
                <Header title={clientName} />
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
                visible={Sellid ? true : false}
                title='Detalle de venta'
                onClose={() => back()}
            >
                <SellDetails />
            </Modal>
        </>
    )
}

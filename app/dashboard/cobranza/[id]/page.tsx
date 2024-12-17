"use client";

import React, { useEffect, useState } from 'react';
import HeaderTable from '@/components/navigation/headerTable';
import Header, { ActionsInterface } from '@/components/navigation/header';
import { useFilters } from '@/hooks/Filters/useFilters';
import TableCobranza from './TableCobranza';
import { usePathname, useRouter } from 'next/navigation';
import Modal from '@/components/Modals/Modal';
import SellDetails from '@/app/dashboard/sells/[id]/[sellId]/SellDetails';
import { SellsInterface } from '@/interface/sells';
import ShareCobranzaModal from './ShareCobranzaModal';
import styles from "../../../../styles/pages/Cobranza.module.scss";
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { getCobranza, getTotalCobranza } from '@/services/sells';
import { OrderObjectSellsByClient, useOrderSellsClientConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { useFiltersSellsConfig } from '@/hooks/Filters/useFiltersSellsConfig';
import { CustumRendersSellsByClient } from '../../sells/[id]/RenderDateFilter';
import { ExecuteFiltersSellsByClient } from '../../sells/[id]/filters';

export default function Cobranza() {

    const { push, back } = useRouter()
    const pathname = usePathname();
    const id = pathname.split('/').filter(Boolean)[2];

    const { orderSellsClient } = useOrderSellsClientConfig()
    const [orderActive, setOrderActive] = useState<OrderObjectSellsByClient>(orderSellsClient[0])
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersOfSectionSells, filtersSells } = useFiltersSellsConfig();
    const [openModalSell, setOpenModalSell] = useState(false);
    const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false)
    const { CustumFilters, CustumRenders } = CustumRendersSellsByClient({ filtersActive, onDeleteFilter, onSelectFilterValue });
    const filters = ExecuteFiltersSellsByClient({ orderActive, filtersActive })

    const clientActions: ActionsInterface[] = [
        {
            id: 1,
            text: 'Compartir Relación',
            onclick: () => setOpenModalShareCobranza(true),
            color: 'yellow'
        }
    ]

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getCobranza({ client: Number(id), PageNumber: 1, SellsOrderCondition: orderActive.order, filters }),
        fetchPaginatedData: (_, nextPage) => getCobranza({ client: Number(id), PageNumber: nextPage ?? 1, SellsOrderCondition: orderActive.order, filters }),
        fetchTotalCount: () => getTotalCobranza(Number(id)),
        filters: filters
    })

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderSellsClient.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    };

    const handleSelectItem = (item: SellsInterface) => {
        setOpenModalSell(true)
        push(`/dashboard/cobranza/${id}?sellId=${item.UniqueKey}`)
    }

    const handleCloseModalSell = () => {
        back()
        setOpenModalSell(false)
    };

    const handleCloseModalShareCobranza = () => {
        setOpenModalShareCobranza(false)
    }

    useEffect(() => {
        handleResetData()
    }, [filtersActive, orderActive]);

    return (
        <div className={styles.page}>
            <Header title='Cobranza' actions={clientActions} />
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

            <TableCobranza
                sells={data}
                totalSells={total ?? 0}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
                handleSelectItem={handleSelectItem}
            />

            <Modal
                visible={openModalSell}
                title='Detalle de venta'
                onClose={handleCloseModalSell}
                modalSize='medium'
            >
                <SellDetails />
            </Modal>

            <ShareCobranzaModal
                visible={openModalShareCobranza}
                onClose={handleCloseModalShareCobranza}
            />

        </div>
    )
}

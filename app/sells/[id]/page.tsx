"use client";

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { sellsClientExample, sellsExample } from '@/seed/sellsData';
import { useParams, useRouter } from 'next/navigation';
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/Filters/useFilters';
import { useFiltersSellsConfig } from '@/hooks/Filters/useFiltersSellsConfig';
import { useOrderSellsClientConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { filtersSells } from '@/seed/Filters/FiltersSells';
import { OrderObject } from '@/components/UI/OrderComponent';
import { SellsInterface } from '@/interface/sells';
import Modal from '@/components/Modals/Modal';
import SellDetails from './[sellId]/SellDetails';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import RenderDateFilter from './RenderDateFilter';
import styles from "../../../styles/pages/Sells.module.scss";


export default function SellsClientPage() {

    const { id } = useParams();
    const { push, back } = useRouter();
    const { handleUpdatePathname } = useContext(SettingsContext);
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersOfSectionSells } = useFiltersSellsConfig();
    const { orderSellsClient } = useOrderSellsClientConfig();
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSellsClient[0]);
    const [openModalSell, setOpenModalSell] = useState(false)

    // Prueba
    const totalSells = 4;
    const sell = sellsExample.find((item) => item.Id_Cliente === Number(id));
    // Fin Prueba

    const loadMoreProducts = async () => {
        console.log("loadMoreProducts")
    };

    const executeQuery = useCallback(() => {
        // Buscar los filtros en el estado y asignar valores booleanos.
        const FilterTipoDoc = filtersActive.some((item) => (item.value !== 0) && item.filter === 'TipoDoc') ? 1 : 0;
        const FilterExpired = filtersActive.some((item) => item.value === 'Expired') ? 1 : 0;
        const FilterNotExpired = filtersActive.some((item) => item.value === 'Not Expired') ? 1 : 0;
        const TipoDoc = filtersActive.find((item) => item.filter === 'TipoDoc')?.value;
        // Construir la query URL.
        const queryUrl = `api/sells/client/3?FilterTipoDoc=${FilterTipoDoc}&FilterExpired=${FilterExpired}&FilterNotExpired=${FilterNotExpired}&TipoDoc=${TipoDoc ?? 0}&OrderCondition=${orderActive.order}`;

        console.log({ query: queryUrl });
    }, [filtersActive, orderActive]);

    const onSelectOrder = useCallback((value: string | number) => {
        const orderActive = orderSellsClient.find((item) => item.value == value)
        if (!orderActive) return;
        setOrderActive(orderActive)
    }, [orderSellsClient])

    const handleSelectItem = useCallback((item: SellsInterface) => {
        const sellId = `${item.Id_Almacen}-${item.TipoDoc}-${item?.Serie?.trim()}-${item.Folio}`
        push(`/sells/${id}/?sellId=${sellId}`)
        setOpenModalSell(true)
    }, [id, push])

    const handleCloseModalSell = useCallback(() => {
        setOpenModalSell(false)
        back()
    }, [back])

    useEffect(() => {
        executeQuery()
    }, [executeQuery])

    useEffect(() => {
        if (!sell) return;
        handleUpdatePathname(sell.Nombre ?? undefined)
    }, [sell, handleUpdatePathname])


    // Select filters custum ( optional )
    const CustumFilters = ['Date'] as const;
    type CustomRenderKey = typeof CustumFilters[number];
    type CustomRenderType = {
        [key in CustomRenderKey]?: React.ReactNode;
    };

    const CustumRenders: CustomRenderType[] = [
        {
            Date: RenderDateFilter({
                onSelectFilter: onSelectFilterValue,
                onDeleteFilter,
                filtersActive
            })
        },
    ];

    return (
        <>
            <div className={styles.SellsClient}>
                <Header title={`${sell?.Nombre}`} />
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
                            sells={sellsClientExample}
                            totalSells={totalSells}
                            loadMoreProducts={loadMoreProducts}
                            buttonIsLoading={false}
                            loadingData={false}
                            handleSelectItem={handleSelectItem}
                        />
                    </div>
                </div>
            </div>

            <Modal
                visible={openModalSell}
                title='Detalle de venta'
                onClose={handleCloseModalSell}
                modalSize='medium'
            >
                <SellDetails />
            </Modal>
        </>
    )
}

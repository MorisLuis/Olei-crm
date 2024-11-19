"use client";

import React, { useEffect, useState } from 'react'
import { sellsClientExample, sellsExample } from '@/seed/sellsData';
import { useParams } from 'next/navigation';
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard';
import { filtersSells } from '@/seed/Filters/FiltersSells';
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/Filters/useFilters';
import { useFiltersSellsConfig } from '@/hooks/Filters/useFiltersSellsConfig';
import { useOrderSellsConfig } from '@/hooks/Orders/useOrderSellsConfig';
import styles from "../../../styles/pages/Sells.module.scss";
import { OrderObject } from '@/components/UI/OrderComponent';

export default function SellsClientPage() {

    const { id } = useParams();
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
    const { filtersOfSectionSells } = useFiltersSellsConfig();
    const { orderSells } = useOrderSellsConfig();
    const [orderActive, setOrderActive] = useState<OrderObject>(orderSells[0])

    // Prueba
    const totalSells = 4;
    const sell = sellsExample.find((item) => item.Id_Cliente === Number(id));
    // Fin Prueba

    const loadMoreProducts = async () => {
        console.log("loadMoreProducts")
    };

    const briefData: briefDataInterface[] = [
        { id: 1, label: 'Producto', value: `${id}` },
        { id: 2, label: 'Nombre', value: `${sell?.Nombre ?? 'Desconocido'}` },
        { id: 3, label: 'Fecha', value: `${sell?.Fecha ?? 'N/A'}` },
        { id: 4, label: 'Almacen', value: `${sell?.Id_Almacen ?? 'N/A'}` }
    ];

    const executeFilters = () => {
        // Buscar los filtros en el estado y asignar valores booleanos.
        const FilterTipoDoc = filtersActive.some((item) => (item.filterValue !== 0) && item.filterType === 'TipoDoc') ? 1 : 0;
        const FilterExpired = filtersActive.some((item) => item.filterValue === 'Expired') ? 1 : 0;
        const FilterNotExpired = filtersActive.some((item) => item.filterValue === 'Not Expired') ? 1 : 0;
        const TipoDoc = filtersActive.find((item) => item.filterType === 'TipoDoc')?.filterValue;
        // Construir la query URL.
        const queryUrl = `api/sells/client/3?FilterTipoDoc=${FilterTipoDoc}&FilterExpired=${FilterExpired}&FilterNotExpired=${FilterNotExpired}&TipoDoc=${TipoDoc ?? 0}`;

        console.log({ query: queryUrl });
    };

    const onSelectOrder = (value: string | number) => {
        const orderActive = orderSells.find((item) => item.value == value )
        if(!orderActive) return;
        setOrderActive(orderActive)
    }

    useEffect(() => {
        executeFilters()
    }, [filtersActive])

    return (
        <div className={styles.SellsClient}>
            <Header title={`${sell?.Nombre}`} />
            <HeaderTable
                filters={filtersSells}
                filterActive={filtersTag}
                filtersOfSection={filtersOfSectionSells}
                onSelectFilter={onSelectFilterValue}
                onDeleteFilter={onDeleteFilter}

                orderSells={orderSells}
                onSelectOrder={onSelectOrder}
                orderActive={orderActive}
            />

            <div className={styles.content}>
                <div className={styles.table}>
                    <TableSellsClient
                        sells={sellsClientExample}
                        totalSells={totalSells}
                        loadMoreProducts={loadMoreProducts}
                        buttonIsLoading={false}
                        loadingData={false}
                    />
                </div>

                <div className={styles.brief}>
                    <BriefCard data={briefData} />
                </div>
            </div>
        </div>
    )
}

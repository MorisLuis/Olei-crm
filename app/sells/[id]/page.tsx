"use client";

import React, { useEffect } from 'react'
import { sellsClientExample, sellsExample } from '@/seed/sellsData';
import { useParams } from 'next/navigation';
import TableSellsClient from './TableSellsClient';
import Header from '@/components/navigation/header';
import BriefCard, { briefDataInterface } from '@/components/Cards/BriefCard';
import { filtersOfSectionSells, filtersSells } from '@/seed/Filters/FiltersSells';
import styles from "../../../styles/pages/Sells.module.scss";
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/useFilters';

export default function SellsClientPage() {

    const { id } = useParams();
    const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();

    const loadMoreProducts = async () => {
        console.log("loadMoreProducts")
    };

    // Prueba
    const totalSells = 4;
    const sell = sellsExample.find((item) => item.Id_Cliente === Number(id));
    // Fin Prueba

    const briefData: briefDataInterface[] = [
        {
            id: 1,
            label: 'Producto',
            value: `${id}`
        },
        {
            id: 2,
            label: 'Nombre',
            value: `${sell?.Nombre}`
        },
        {
            id: 3,
            label: 'Fecha',
            value: `${sell?.Fecha}`
        },
        {
            id: 4,
            label: 'Almacen',
            value: `${sell?.Id_Almacen}`
        }
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

    useEffect(() => {
        executeFilters()
    }, [filtersActive])

    // TEMPORAL
    const filter = filtersOfSectionSells.find((item) => item.type === 'TipoDoc');
    const filter2 = filtersActive.find((item) => item.filterType === 'TipoDoc');
    if (filter) filter.value = filter2?.filterValue;

    const filter3 = filtersOfSectionSells.find((item) => item.type === 'Expired');
    const filter4 = filtersActive.find((item) => item.filterType === 'Expired');
    if (filter3) filter3.value = filter4?.filterValue;

    return (
        <div className={styles.SellsClient}>
            <Header title={`${sell?.Nombre}`} />
            <HeaderTable
                filters={filtersSells}
                filterActive={filtersTag}
                filtersOfSection={filtersOfSectionSells}

                onSelectFilter={onSelectFilterValue}
                onDeleteFilter={onDeleteFilter}
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
                    <BriefCard
                        data={briefData}
                    />
                </div>
            </div>
        </div>
    )
}

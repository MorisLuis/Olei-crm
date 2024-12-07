"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import { SellsDetailsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import Table from '@/components/UI/Tables/Table';

interface TableSellsDetailsClientInterface {
    sells: SellsDetailsInterface[];
    totalSells: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
    handleSelectItem: (item: SellsDetailsInterface) => void;
}

export default function TableSellsDetailsClient({
    sells,
    totalSells,
    loadingData,
    buttonIsLoading,
    loadMoreProducts,
    handleSelectItem
}: TableSellsDetailsClientInterface) {

    const NoMoreProductToShow = sells.length === totalSells;

    const columns: ColumnSecondaryConfig<SellsDetailsInterface>[] = [
        {
            key: 'Codigo',
            label: 'Codigo',
        },
        {
            key: 'Cantidad',
            label: 'Cantidad',
        },
        {
            key: 'Unidad',
            label: 'Unidad',
        },
        {
            key: 'Descripcion',
            label: 'Descripcion',
        },
        {
            key: 'Precio',
            label: 'Precio',
            render: (_, item) => <p>{format(item.Precio)}</p>
        },
        {
            key: 'Impuesto',
            label: 'Impuesto',
            render: (_, item) => <p>{format(item.Impuesto)}</p>
        },
        {
            key: 'Importe',
            label: 'Importe',
            render: (_, item) => <p>{format(item.Importe)}</p>
        }
    ];

    if (loadingData) {
        return (
            <>
                {/* Header skeleton */}
                <TableSkeleton />
            </>
        )
    };

    if (sells?.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <Table
            columns={columns}
            data={sells}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectItem}
        />
    )
}


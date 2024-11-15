"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import Header from '@/components/navigation/header';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { useRouter } from 'next/navigation';

interface TableSellsInterface {
    sells: SellsInterface[];
    totalSells: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
}

export default function TableSells({
    sells,
    totalSells,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableSellsInterface) {

    const { push } = useRouter();

    const NoMoreProductToShow = sells.length === totalSells;

    const columns: ColumnConfig<SellsInterface>[] = [
        {
            key: 'Id_Cliente',
            label: 'Id_Cliente',
            render: (Id_Cliente) => <span style={{ color: "black" }}>{Id_Cliente}</span>,
        },
        {
            key: 'Nombre',
            label: 'Nombre',
        },
        {
            key: 'Saldo',
            label: 'Saldo',
            render: (Saldo) => <span style={{ color: "black" }}>{format(Saldo as number)}</span>,

        },
        {
            key: 'Total',
            label: 'Total',
            render: (Total) => <span style={{ color: "black" }}>{format(Total as number)}</span>,
        },
    ];

    const handleSelectItem = (item: SellsInterface) => push(`/sells/${item.Folio}`);

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
        <>
            <Header title='Ventas' />

            <Table
                columns={columns}
                data={sells}
                noMoreData={NoMoreProductToShow}
                loadingMoreData={buttonIsLoading}
                handleLoadMore={loadMoreProducts}
                handleSelectItem={handleSelectItem}
            />
        </>
    )
}

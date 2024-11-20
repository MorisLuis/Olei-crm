"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import TableSecondary, { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { Tag } from '@/components/UI/Tag';

interface TableSellsClientInterface {
    sells: SellsInterface[];
    totalSells: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
    handleSelectItem: (item: SellsInterface) => void;
}

export default function TableSellsClient({
    sells,
    totalSells,
    loadingData,
    buttonIsLoading,
    loadMoreProducts,
    handleSelectItem
}: TableSellsClientInterface) {

    const NoMoreProductToShow = sells.length === totalSells;

    const columns: ColumnSecondaryConfig<SellsInterface>[] = [
        {
            key: 'Nombre',
            label: 'Nombre',
            render: (_, item) => (
                <>
                    <p style={{ color: "black", fontWeight: 'bold' }}>{item.Nombre}</p>
                    <Tag color='blue'>Cotizacion</Tag>
                </>
            ),
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (_, item) => (
                <>
                    <p><span style={{ color: "black", fontWeight: 'bold' }}>Fecha:</span> {item.Fecha}</p>
                    <p><span style={{ color: "black", fontWeight: 'bold' }}>Fecha Entrega:</span> {item.FechaEntrega}</p>
                </>
            ),
        },
        {
            key: 'Total',
            label: 'Total',
            render: (_, item) => (
                <>
                    <p><span>Total:</span> {format(item.Total)}</p>
                    <p><span>Saldo:</span> {format(item.Saldo)}</p>
                </>
            ),
        },
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
        <TableSecondary
            columns={columns}
            data={sells}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
            onClick={handleSelectItem}
        />
    )
}

"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import TableSecondary, { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { Tag } from '@/components/UI/Tag';

interface TTableSellsClientInterface {
    sells: SellsInterface[];
    totalSells: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
}

export default function TableSellsClient({
    sells,
    totalSells,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TTableSellsClientInterface) {

    const NoMoreProductToShow = sells.length === totalSells;

    const columns: ColumnSecondaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'TipoDoc',
            render: (_, item) => (
                <>
                    <span style={{ color: "black", fontWeight: 'bold' }}>{item.Nombre}</span>
                    <Tag color='blue'>Cotizacion</Tag>
                </>
            ),
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (_, item) => (
                <>
                    <div><span  style={{ color: "black", fontWeight: 'bold' }}>Fecha:</span> {item.Fecha}</div>
                    <div><span  style={{ color: "black", fontWeight: 'bold' }}>Fecha Entrega:</span> {item.FechaEntrega}</div>
                </>
            ),
        },
        {
            key: 'Total',
            label: 'Total',
            render: (_, item) => (
                <>
                    <span>Total: {format(item.Total)}</span>
                    <span>Saldo: {format(item.Saldo)}</span>
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
        <>
            <TableSecondary
                columns={columns}
                data={sells}
                noMoreData={NoMoreProductToShow}
                loadingMoreData={buttonIsLoading}
                handleLoadMore={loadMoreProducts}
            //handleSelectItem={handleSelectItem}
            />
        </>
    )
}

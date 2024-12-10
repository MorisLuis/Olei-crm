"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { Tag } from '@/components/UI/Tag';
import Table from '@/components/UI/Tables/Table';
import { docType } from '@/utils/docType';
import { useTagColor } from '@/hooks/useTagColor';
import { formatDate } from '@/utils/formatDate';

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
    const { changeColor } = useTagColor()

    const columns: ColumnSecondaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>
        },
        {
            key: 'Folio',
            label: 'Folio',
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (Fecha) => (
                <div>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            )
        },
        {
            key: 'FechaEntrega',
            label: 'Fecha Vencimiento',
            render: (FechaEntrega) => (
                <div>
                    <p>{formatDate(FechaEntrega as Date)}</p>
                </div>
            )
        },
        {
            key: 'ExpiredDays',
            label: 'Dias vencidos'
        },
        {
            key: 'Total',
            label: 'Total',
            render: (_, item) => <p>{format(item.Total)}</p>
        },
        {
            key: 'Saldo',
            label: 'Saldo',
            render: (_, item) => <p>{format(item.Saldo)}</p>
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


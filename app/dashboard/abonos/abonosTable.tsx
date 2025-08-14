'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { AbonosInterface } from '@/interface/abonos';
import { format } from '@/utils/currency';

interface AbonosTableInterface {
    abonos: AbonosInterface[];
    totalAbonos: number;
    loadMoreProducts: () => void;
    handleSelectItem: (item: AbonosInterface) => void;

    isLoadingData: boolean;
    isFetchingNextPage: boolean;
    isLoadingUseQuery: boolean
}

export default function TableAbonos({
    abonos,
    totalAbonos,
    loadMoreProducts,
    handleSelectItem,
    isLoadingData,
    isFetchingNextPage,
    isLoadingUseQuery
}: AbonosTableInterface): JSX.Element {

    const NoMoreProductToShow = abonos.length === totalAbonos || !totalAbonos || isLoadingUseQuery;
    const noCoincidenceItems = abonos.length === 0 && !isLoadingData

    const columns: ColumnConfig<AbonosInterface>[] = [
        {
            key: 'Folio',
            label: 'Folio'
        },
        {
            key: 'Id_Cliente',
            label: 'Id_Cliente',
        },
        {
            key: 'cliente',
            label: 'Cliente',
            render: (_, item) => <p>{item.cliente.Nombre}</p>,
        },
        {
            key: 'forma_de_pago',
            label: 'Forma de pago',
            render: (_, item) => <p>{item.forma_de_pago.Nombre}</p>,
        },
        {
            key: 'Importe',
            label: 'Importe',
            render: (_, item) => <p>{format(item.Importe)}</p>,
        },
    ];

    if (isLoadingData) {
        return <TableSkeleton columns={4} />
    }

    if (noCoincidenceItems) {
        return (
            <MessageCard
                title='No hay coincidencias exactas'
                icon={faFaceSadCry}
            >
                <p>Cambia o elimina algunos de los filtros.</p>
            </MessageCard>
        )
    }

    return (
        <Table
            columns={columns}
            data={abonos}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectItem}

            noMoreData={NoMoreProductToShow}
            loadingMoreData={isFetchingNextPage}
        />
    );
}

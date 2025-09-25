'use client';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { format } from '@/utils/currency';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/format/formatDate';
import { AbonoDetails } from './types';


interface TableAbonoDetailsClientInterface {
    abonoDetails: AbonoDetails[];
    totalSells: number;
    loadMoreProducts: () => void;
    handleSelectItem?: (item: AbonoDetails) => void;

    isLoadingData: boolean;
    isLoadingUseQuery: boolean;
    isFetchingNextPage: boolean;
}

export default function TableAbonosDetails({
    abonoDetails,
    totalSells,
    loadMoreProducts,
    handleSelectItem,

    isLoadingData,
    isLoadingUseQuery,
    isFetchingNextPage
}: TableAbonoDetailsClientInterface): JSX.Element {

    const NoMoreProductToShow = abonoDetails.length === totalSells || !totalSells || isLoadingUseQuery;
    const noCoincidenceItems = abonoDetails.length === 0 && !isLoadingData;
    const { changeColor } = useTagColor();

    const columns: ColumnSecondaryConfig<AbonoDetails>[] = [
        {
            key: 'Folio',
            label: 'Folio',
        },
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>,
        },
        {
            key: 'Saldo',
            label: 'Saldo',
            render: (_, item) => <p>{format(item.Saldo ?? 0)}</p>,
        },

        {
            key: 'Total',
            label: 'Total',
            render: (_, item) => <p>{format(item.Total ?? 0)}</p>,
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (Fecha) => (
                <div>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            ),
        },
    ];

    if (isLoadingData) {
        return (<TableSkeleton columns={4} />);
    }

    if (noCoincidenceItems) {
        return (
            <MessageCard title="No hay coincidencias exactas" icon={faFaceFrown}>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        );
    }

    return (
        <Table
            columns={columns}
            data={abonoDetails}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectItem}

            noMoreData={NoMoreProductToShow}
            loadingMoreData={isFetchingNextPage}
            hoverAvailable={false}
        />
    );
}

"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table from '@/components/UI/Tables/Table';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { useRouter } from 'next/navigation';
import { columnClients } from './TableClientsData';
import { ClientInterface } from '@/interface/client';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';

interface TableSellsInterface {
    clients: ClientInterface[];
    totalClients: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
};


export default function TableClients({
    clients,
    totalClients,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableSellsInterface) {

    const { push } = useRouter();
    const NoMoreProductToShow = clients.length === totalClients;

    const handleSelectClientSells = (item: ClientInterface) => {
        if(!item.Id_Almacen) {
            return alert("No tiene almacen, no puedo acceder a su información")
        };

        push(`clients/${item.Id_Cliente}?Id_Almacen=${item.Id_Almacen}`);
    };

    if (loadingData) {
        return (
            <>
                {/* Header skeleton */}
                <TableSkeleton />
            </>
        )
    };

    if (clients?.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas' icon={faFaceFrown}>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <Table
            columns={columnClients}
            data={clients}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectClientSells}
        />
    )
}

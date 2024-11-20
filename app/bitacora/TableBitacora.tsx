"use client"

import React, { useContext } from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table from '@/components/UI/Tables/Table';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { useRouter } from 'next/navigation';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import { columnsBitacora } from './TableBitacoraData';
import MeetingInterface from '@/interface/meeting';

interface TableBitacoraInterface {
    sells: MeetingInterface[];
    totalSells: number;
    buttonIsLoading: boolean;
    loadingData: boolean;
    loadMoreProducts: () => Promise<void>;
};


export default function TableBitacora({
    sells,
    totalSells,
    loadingData,
    buttonIsLoading,
    loadMoreProducts
}: TableBitacoraInterface) {

    const { push } = useRouter();
    const { handleUpdatePathname } = useContext(SettingsContext);
    const NoMoreProductToShow = sells.length === totalSells;

    const handleSelectMeeting = (item: MeetingInterface) => {
        push(`/bitacora/${item.Id_Bitacora}`);
        handleUpdatePathname(item.Descripcion, 'bitacora');
    };

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
            columns={columnsBitacora}
            data={sells}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={buttonIsLoading}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectMeeting}
        />
    )
}

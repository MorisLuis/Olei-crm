"use client"

import React, { useContext } from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { useRouter } from 'next/navigation';
import { SettingsContext } from '@/context/Settings/SettingsContext';
//import { columnsBitacora } from './TableBitacoraData';
import MeetingInterface from '@/interface/meeting';
import { contactType } from '@/utils/contactType';
import { useTagColor } from '@/hooks/useTagColor';
import { Tag } from '@/components/UI/Tag';

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
    const { changeColor } = useTagColor()

    const handleSelectMeeting = (item: MeetingInterface) => {
        push(`/bitacora/${item.Id_Bitacora}`);
        handleUpdatePathname(item.Descripcion, 'bitacora');
    };

    const columnsBitacora: ColumnConfig<MeetingInterface>[] = [
        {
            key: 'Id_Bitacora',
            label: 'Id_Bitacora',
            render: (Id_Bitacora) => <span>{Id_Bitacora?.toString()}</span>
        },
        {
            key: 'Descripcion',
            label: 'Descripcion',
            render: (Descripcion) => <span style={{ fontWeight: 'bold' }}>{Descripcion?.toString()}</span>

        },
        {
            key: 'TipoContacto',
            label: 'TipoContacto',
            render: (TipoContacto) => <Tag color={changeColor(TipoContacto as MeetingInterface['TipoContacto'])}>{contactType(TipoContacto as MeetingInterface['TipoContacto'])}</Tag>
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (Fecha) => <span>{Fecha?.toString()}</span>
        },
        {
            key: 'Hour',
            label: 'Hour',
            render: (Hour) => <span>{Hour?.toString()}</span>
        },
    ]

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

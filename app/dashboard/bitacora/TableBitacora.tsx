"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import { useRouter } from 'next/navigation';
import MeetingInterface from '@/interface/meeting';
import { contactType } from '@/utils/contactType';
import { useTagColor } from '@/hooks/useTagColor';
import { Tag } from '@/components/UI/Tag';
import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';

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
    const NoMoreProductToShow = sells.length === totalSells;
    const { changeColor } = useTagColor()

    const handleSelectMeeting = (item: MeetingInterface) => {
        push(`/dashboard/bitacora/${item.Id_Bitacora}`);
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
            render: (Fecha) => <span>{formatDate(Fecha as Date)}</span>
        },
        {
            key: 'Hour',
            label: 'Inicio / Fin',
            render: (_, item: MeetingInterface) => <span>{formatTime(item.Hour as string)} / {formatTime(item.HourEnd as string)}</span>
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

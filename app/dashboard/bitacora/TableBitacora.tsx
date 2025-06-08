'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import MeetingInterface from '@/interface/meeting';
import { contactType } from '@/utils/contactType';
import { formatDate } from '@/utils/format/formatDate';
import { formatTime } from '@/utils/format/formatTime';

interface TableBitacoraInterface {
  meetings: MeetingInterface[];
  totalMeetings: number;
  buttonIsLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
}

export default function TableBitacora({
  meetings,
  totalMeetings,
  loadingData,
  buttonIsLoading,
  loadMoreProducts,
}: TableBitacoraInterface)  : JSX.Element {

  const { push } = useRouter();
  const { changeColor } = useTagColor();
  const NoMoreProductToShow = meetings.length === totalMeetings;
  const noCoincidenceItems = meetings.length === 0 && !loadingData

  const handleSelectMeeting = (item: MeetingInterface) : void => {
    push(
      `/dashboard/bitacora/${item.Id_Bitacora}?Id_Cliente=${item.Id_Cliente}&Id_Almacen=${item.Id_Almacen}`
    );
  };

  const columnsBitacora: ColumnConfig<MeetingInterface>[] = [
    {
      key: 'Nombre',
      label: 'Cliente',
      render: (Nombre) => <span>{Nombre?.toString()}</span>,
    },
    {
      key: 'Descripcion',
      label: 'Descripcion',
      render: (Descripcion) => (
        <span style={{ fontWeight: 'bold' }}>{Descripcion?.toString()}</span>
      ),
    },
    {
      key: 'TipoContacto',
      label: 'TipoContacto',
      render: (TipoContacto) => (
        <Tag color={changeColor(TipoContacto as MeetingInterface['TipoContacto'])}>
          {contactType(TipoContacto as MeetingInterface['TipoContacto'])}
        </Tag>
      ),
    },
    {
      key: 'Fecha',
      label: 'Fecha',
      render: (Fecha) => <span>{formatDate(Fecha as Date)}</span>,
    },
    {
      key: 'Hour',
      label: 'Inicio / Fin',
      render: (_, item: MeetingInterface) =>
        item.Hour || item.HourEnd ? (
          <span>
            {item.Hour ? formatTime(item.Hour as string) : ''} /{' '}
            {item.HourEnd ? formatTime(item.HourEnd as string) : ''}
          </span>
        ) : (
          <Tag color="gray">No tiene hora</Tag>
        ),
    },
  ];

  if (loadingData) {
    return <TableSkeleton />
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
      columns={columnsBitacora}
      data={meetings}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={buttonIsLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectMeeting}
    />
  );
}

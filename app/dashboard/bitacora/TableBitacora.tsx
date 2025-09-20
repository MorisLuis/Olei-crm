'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import useErrorHandler, { ErrorResponse } from '@/hooks/useErrorHandler';
import { useTagColor } from '@/hooks/useTagColor';
import MeetingInterface from '@/interface/meeting';
import { updateMeeting } from '@/services/bitacora/meeting.service';
import { contactType } from '@/utils/contactType';
import { formatDate } from '@/utils/format/formatDate';
import { formatTime } from '@/utils/format/formatTime';

interface TableBitacoraInterface {
  meetings: MeetingInterface[];
  totalMeetings: number;
  loadMoreProducts: () => void;

  isLoadingData: boolean;
  isFetchingNextPage: boolean;
  isLoadingUseQuery: boolean;
  refetch: () => void;
}

export default function TableBitacora({
  meetings,
  totalMeetings,
  loadMoreProducts,
  isLoadingData,
  isFetchingNextPage,
  isLoadingUseQuery,
  refetch,
}: TableBitacoraInterface): JSX.Element {
  const { push } = useRouter();
  const { changeColor } = useTagColor();
  const { handleError } = useErrorHandler();
  const [loadingStatus, setLoadingStatus] = useState<{ [key: string]: boolean }>({});
  const NoMoreProductToShow = meetings.length === totalMeetings || !totalMeetings || isLoadingUseQuery;
  const noCoincidenceItems = meetings.length === 0 && !isLoadingData;

  const handleSelectMeeting = (item: MeetingInterface): void => {
    push(`/dashboard/bitacora/${item.Id_Bitacora}?Id_Cliente=${item.Id_Cliente}&Id_Almacen=${item.Id_Almacen}`);
  };

  const handleUpdateStatus = async (item: MeetingInterface, e?: React.MouseEvent<HTMLDivElement>) : Promise<void> => {
    e?.stopPropagation();

    if (loadingStatus[item.Id_Bitacora]) return;

    setLoadingStatus((prev) => ({ ...prev, [item.Id_Bitacora]: true }));

    try {
      await updateMeeting({ status: !item.status }, item.Id_Bitacora);
      refetch();
    } catch (error) {
      handleError({
        message: (error as ErrorResponse)?.message,
        response: (error as ErrorResponse)?.response,
      });
    } finally {
      setTimeout(() => {
        setLoadingStatus((prev) => ({ ...prev, [item.Id_Bitacora]: false }));
      }, 500);
    }
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
      label: 'Actividad',
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
    {
      key: 'status',
      label: 'Estado',
      render: (_, item: MeetingInterface) => (
        <Tag
          color={
            loadingStatus[item.Id_Bitacora] ? 'gray' :
              item.status ? 'red' : 'green'}
          onClose={(e?: React.MouseEvent<HTMLDivElement>) => handleUpdateStatus(item, e)}
        >
          {item.status ? 'Abierto' : 'Cerrado'}
        </Tag>
      ),
    },
  ];

  if (isLoadingData) {
    return <TableSkeleton columns={4} />;
  }

  if (noCoincidenceItems) {
    return (
      <MessageCard title="No hay coincidencias exactas" icon={faFaceSadCry}>
        <p>Cambia o elimina algunos de los filtros.</p>
      </MessageCard>
    );
  }

  return (
    <Table
      columns={columnsBitacora}
      data={meetings}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isFetchingNextPage}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectMeeting}
    />
  );
}
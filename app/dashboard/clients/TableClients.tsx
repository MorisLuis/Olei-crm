'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { ClientInterface } from '@/interface/client';
import { columnClients } from './TableClientsData';

interface TableSellsInterface {
  clients: ClientInterface[];
  totalClients: number;
  loadMoreProducts: () => void;

  isLoadingData: boolean;
  isFetchingNextPage: boolean;
  isLoadingUseQuery: boolean
}

export default function TableClients({
  clients,
  totalClients,
  loadMoreProducts,
  isLoadingData,
  isFetchingNextPage,
  isLoadingUseQuery
}: TableSellsInterface) : JSX.Element {

  const { push } = useRouter();
  const NoMoreProductToShow = clients.length === totalClients || !totalClients || isLoadingUseQuery;
  const noCoincidenceItems = clients.length === 0 && !isLoadingData

  const handleSelectClientSells = (item: ClientInterface)  : void => {
    if (!item.Id_Almacen) {
      return alert('No tiene almacen, no puedo acceder a su información');
    }

    push(`clients/${item.Id_Cliente}?Id_Almacen=${item.Id_Almacen}`);
  };

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
      columns={columnClients}
      data={clients}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isFetchingNextPage}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectClientSells}
    />
  );
}

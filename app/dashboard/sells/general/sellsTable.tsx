'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { columnsSells } from './sellsTableData';

interface TableSellsInterface {
  sells: SellsInterface[];
  totalSells: number;
  loadMoreProducts: () => void;

  isLoadingData: boolean;
  isFetchingNextPage: boolean;
  isLoadingUseQuery: boolean
}

export default function TableSells({
  sells,
  totalSells,
  loadMoreProducts,

  isLoadingData,
  isFetchingNextPage,
  isLoadingUseQuery
}: TableSellsInterface): JSX.Element {

  const { push } = useRouter();
  const NoMoreProductToShow = sells.length === totalSells || !totalSells || isLoadingUseQuery;
  const noCoincidenceItems = sells.length === 0 && !isLoadingData;

  const searchParams = useSearchParams();
  const dateStart = searchParams.get('DateStart')
  const dateEnd = searchParams.get('DateEnd')

  const handleSelectClientSells = (item: SellsInterface): void => {
    
    const params = new URLSearchParams({
      client: item.Nombre.trim(),
      Id_Almacen: item.Id_Almacen.toString()
    });

    if (dateStart) params.set('DateStart', dateStart);
    if (dateEnd)   params.set('DateEnd',   dateEnd);
  
    push(`general/${item.Id_Cliente}?${params.toString()}`);
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
      columns={columnsSells}
      data={sells}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isFetchingNextPage}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectClientSells}
    />
  );
}

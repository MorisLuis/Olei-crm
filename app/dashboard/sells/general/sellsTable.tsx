'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { columnsSells } from './sellsTableData';

interface TableSellsInterface {
  sells: SellsInterface[];
  totalSells: number;
  isLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
}

export default function TableSells({
  sells,
  totalSells,
  loadingData,
  isLoading,
  loadMoreProducts,
}: TableSellsInterface): JSX.Element {

  const { push } = useRouter();
  const NoMoreProductToShow = sells.length === totalSells || !isLoading;
  const noCoincidenceItems = sells.length === 0 && !loadingData
  const searchParams = useSearchParams();
  const dateStart = searchParams.get('DateStart')
  const dateEnd = searchParams.get('DateEnd')

  const handleSelectClientSells = (item: SellsInterface): void => {
    
    const params = new URLSearchParams({
      client: item.Nombre.trim()
    });

    if (dateStart) params.set('DateStart', dateStart);
    if (dateEnd)   params.set('DateEnd',   dateEnd);
  
    push(`general/${item.Id_Cliente}?${params.toString()}`);
  };

  if (loadingData) {
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
      loadingMoreData={isLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectClientSells}
    />
  );
}

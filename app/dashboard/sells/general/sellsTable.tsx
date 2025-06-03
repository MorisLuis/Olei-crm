'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
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
}: TableSellsInterface) : JSX.Element {

  const { push } = useRouter();
  const NoMoreProductToShow = sells.length === totalSells || !isLoading;
  const noCoincidenceItems = sells.length === 0 && !loadingData

  const handleSelectClientSells = (item: SellsInterface) : void => {
    push(`general/${item.Id_Cliente}?client=${encodeURIComponent(item.Nombre.trim())}`);
  };

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
      columns={columnsSells}
      data={sells}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectClientSells}
    />
  );
}

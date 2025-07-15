'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { SellsProductsInterface } from '@/interface/sells';
import { columnsSells } from './sellsProductsTableData';

interface TableSellsInterface {
  sells: SellsProductsInterface[];
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
}: TableSellsInterface) : JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells || !totalSells || isLoadingUseQuery;
  const noCoincidenceItems = sells.length === 0 && !isLoadingData;

  const handleSelectClientSells = (_item: SellsProductsInterface) : void => {
    //push(`sells/${item.Id_Cliente}?client=${encodeURIComponent(item.Nombre.trim())}`);
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

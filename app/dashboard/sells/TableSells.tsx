'use client';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { columnsSells } from './TableSellsData';

interface TableSellsInterface {
  sells: SellsInterface[];
  totalSells: number;
  buttonIsLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => Promise<void>;
}

export default function TableSells({
  sells,
  totalSells,
  loadingData,
  buttonIsLoading,
  loadMoreProducts,
}: TableSellsInterface) : JSX.Element {
  const { push } = useRouter();
  const NoMoreProductToShow = sells.length === totalSells;

  const handleSelectClientSells = (item: SellsInterface) : void => {
    push(`sells/${item.Id_Cliente}?client=${encodeURIComponent(item.Nombre.trim())}`);
  };

  if (loadingData) {
    return (
      <>
        {/* Header skeleton */}
        <TableSkeleton />
      </>
    );
  }

  if (sells?.length === 0) {
    return (
      <MessageCard title="No hay coincidencias exactas" icon={faFaceFrown}>
        <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
      </MessageCard>
    );
  }

  return (
    <Table
      columns={columnsSells}
      data={sells}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={buttonIsLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectClientSells}
    />
  );
}

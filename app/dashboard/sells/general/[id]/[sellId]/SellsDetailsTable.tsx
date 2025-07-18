'use client';

import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { SellsDetailsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';

interface TableSellsDetailsClientInterface {
  sells: SellsDetailsInterface[];
  totalSells: number;
  loadMoreProducts: () => void;
  handleSelectItem?: (item: SellsDetailsInterface) => void;

  isLoadingData: boolean;
  isLoadingUseQuery: boolean;
  isFetchingNextPage: boolean;
}

export default function TableSellsDetailsClient({
  sells,
  totalSells,
  loadMoreProducts,
  handleSelectItem,

  isLoadingData,
  isLoadingUseQuery,
  isFetchingNextPage
}: TableSellsDetailsClientInterface): JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells || !totalSells || isLoadingUseQuery;
  const noCoincidenceItems = sells.length === 0 && !isLoadingData;

  const columns: ColumnSecondaryConfig<SellsDetailsInterface>[] = [
    {
      key: 'Codigo',
      label: 'Codigo',
    },
    {
      key: 'Cantidad',
      label: 'Cantidad',
    },
    {
      key: 'Unidad',
      label: 'Unidad',
    },
    {
      key: 'Descripcion',
      label: 'Descripcion',
    },
    {
      key: 'Precio',
      label: 'Precio',
      render: (_, item) => <p>{format(item.Precio ?? 0)}</p>,
    },
    {
      key: 'Impuesto',
      label: 'Impuesto',
      render: (_, item) => <p>{format(item.Impuesto ?? 0)}</p>,
    },
    {
      key: 'Importe',
      label: 'Importe',
      render: (_, item) => <p>{format(item.Importe ?? 0)}</p>,
    },
  ];

  if (isLoadingData) {
    return (<TableSkeleton columns={4} />);
  }

  if (noCoincidenceItems) {
    return (
      <MessageCard title="No hay coincidencias exactas" icon={faFaceFrown}>
        <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
      </MessageCard>
    );
  }

  return (
    <Table
      columns={columns}
      data={sells}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectItem}

      noMoreData={NoMoreProductToShow}
      loadingMoreData={isFetchingNextPage}
      hoverAvailable={false}
    />
  );
}

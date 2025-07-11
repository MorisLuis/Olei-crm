'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { CobranzaInterface } from '@/services/cobranza/cobranza.interface';
import { format } from '@/utils/currency';

interface TableCobranzaInterface {
  sells: CobranzaInterface[];
  totalSells: number;
  isLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
  handleSelectItem: (item: CobranzaInterface) => void;
}

export default function TableCobranza({
  sells,
  totalSells,
  isLoading,
  loadingData,
  loadMoreProducts,
  handleSelectItem,
}: TableCobranzaInterface): JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells || !isLoading;
  const noCoincidenceItems = sells.length === 0 && !loadingData 

  const columns: ColumnConfig<CobranzaInterface>[] = [
    {
      key: 'Nombre',
      label: 'Nombre'
    },
    {
      key: 'SaldoVencido',
      label: 'Saldo Vencido',
      render: (_, item) => <p>{format(item.SaldoVencido)}</p>,
    },
    {
      key: 'SaldoNoVencido',
      label: 'Saldo no vencido',
      render: (_, item) => <p>{format(item.SaldoNoVencido)}</p>,
    },
    {
      key: 'TotalSaldo',
      label: 'Total Saldo',
      render: (_, item) => <p>{format(item.TotalSaldo)}</p>,
    }
  ];

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
      columns={columns}
      data={sells}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectItem}
    />
  );
}

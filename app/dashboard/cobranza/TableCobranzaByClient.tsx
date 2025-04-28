'use client';

import React from 'react';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { CobranzaInterface } from '@/services/cobranza/cobranza.interface';
import { format } from '@/utils/currency';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';

interface TableCobranzaInterface {
  sells: CobranzaInterface[];
  totalSells: number;
  buttonIsLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
  handleSelectItem: (item: CobranzaInterface) => void;
}

export default function TableCobranza({
  sells,
  totalSells,
  buttonIsLoading,
  loadingData,
  loadMoreProducts,
  handleSelectItem,
}: TableCobranzaInterface) : JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells;
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
    },
  ];

  if (loadingData) {
    return <TableSkeleton />
  }

  return (
    <Table
      columns={columns}
      data={sells}
      noMoreData={NoMoreProductToShow}
      loadingMoreData={buttonIsLoading}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectItem}
    />
  );
}

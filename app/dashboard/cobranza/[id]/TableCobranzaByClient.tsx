'use client';

import React from 'react';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/formatDate';

interface TableCobranzaInterface {
  sells: SellsInterface[];
  totalSells: number;
  buttonIsLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
  handleSelectItem: (item: SellsInterface) => void;
}

export default function TableCobranzaByClient({
  sells,
  totalSells,
  buttonIsLoading,
  loadMoreProducts,
  handleSelectItem,
  loadingData
}: TableCobranzaInterface) : JSX.Element {
  const NoMoreProductToShow = sells.length === totalSells;
  const { changeColor } = useTagColor();

  const columns: ColumnConfig<SellsInterface>[] = [
    {
      key: 'TipoDoc',
      label: 'Tipo de documento',
      render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>,
    },
    {
      key: 'Folio',
      label: 'Folio',
    },
    {
      key: 'Fecha',
      label: 'Fecha',
      render: (Fecha) => (
        <div>
          <p>{formatDate(Fecha as Date)}</p>
        </div>
      ),
    },
    {
      key: 'FechaEntrega',
      label: 'Fecha Vencimiento',
      render: (FechaEntrega) =>
        FechaEntrega ? (
          <div>
            <p>{formatDate(FechaEntrega as Date)}</p>
          </div>
        ) : (
          <Tag color="gray">Sin datos</Tag>
        ),
    },
    {
      key: 'ExpiredDays',
      label: 'Dias vencidos',
      render: (ExpiredDays) =>
        ExpiredDays ? (
          <div>
            <p>{ExpiredDays as number}</p>
          </div>
        ) : (
          <Tag color="gray">Sin datos</Tag>
        ),
    },
    {
      key: 'Total',
      label: 'Total',
      render: (_, item) => <p>{format(item.Total)}</p>,
    },
    {
      key: 'Saldo',
      label: 'Saldo',
      render: (_, item) => <p>{format(item.Saldo)}</p>,
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

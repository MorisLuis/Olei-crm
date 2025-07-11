'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/TableSkeleton';
import Table from '@/components/UI/Tables/Table';
import { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/format/formatDate';

interface TableSellsClientInterface {
  sells: SellsInterface[];
  totalSells: number;
  isLoading: boolean;
  loadingData: boolean;
  loadMoreProducts: () => void;
  handleSelectItem: (item: SellsInterface) => void;
}

export default function TableSellsClient({
  sells,
  totalSells,
  loadingData,
  isLoading,
  loadMoreProducts,
  handleSelectItem,
}: TableSellsClientInterface): JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells || !isLoading;
  const noCoincidenceItems = sells.length === 0 && !loadingData

  const { changeColor } = useTagColor();

  const columns: ColumnSecondaryConfig<SellsInterface>[] = [
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
      key: 'ExpiredDays',
      label: 'Dias para vecimiento',
      render: (ExpiredDays) => (
        <div>
          {ExpiredDays && (ExpiredDays as number) < 0 ? (
            <Tag color="red">{ExpiredDays as number}</Tag>
          ) : ExpiredDays ? (
            <p>{ExpiredDays as number}</p>
          ) : (
            <Tag color="gray">Sin datos</Tag>
          )}
        </div>
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
    return <TableSkeleton columns={4}/>
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

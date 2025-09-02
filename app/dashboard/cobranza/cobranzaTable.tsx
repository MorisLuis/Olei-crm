'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { CobranzaInterface } from '@/services/cobranza/cobranza.interface';
import { format } from '@/utils/currency';
import styles from '../../../styles/Components/Table/Table.module.scss';

interface TableCobranzaInterface {
  sells: CobranzaInterface[];
  totalSells: number;
  loadMoreProducts: () => void;
  handleSelectItem: (item: CobranzaInterface) => void;

  isLoadingData: boolean;
  isFetchingNextPage: boolean;
  isLoadingUseQuery: boolean
}

export default function TableCobranza({
  sells,
  totalSells,
  loadMoreProducts,
  handleSelectItem,
  isLoadingData,
  isFetchingNextPage,
  isLoadingUseQuery
}: TableCobranzaInterface): JSX.Element {

  const NoMoreProductToShow = sells.length === totalSells || !totalSells || isLoadingUseQuery;
  const noCoincidenceItems = sells.length === 0 && !isLoadingData 

  const columns: ColumnConfig<CobranzaInterface>[] = [
    {
      key: 'Nombre',
      label: 'Nombre',
      render: (Nombre) :JSX.Element => {
  
        const colors = [
          '#ff0000',
          '#068FFF',
          '#1F8A70',
          '#6F67DF',
          '#EDBD42',
          '#FF7F11',
          '#6A0DAD',
          '#008080',
          '#FF69B4',
          '#4B9D87',
        ];
  
        const getColor = (name: string): string => {
          const salt = name.length;
          const index = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0 + salt) % colors.length;
          return colors[index];
        };
  
        const backgroundColor = getColor(Nombre as string);
  
        return (
          <div className={styles.ClientName}>
            <span
              className={styles.ClientName__Avatar}
              style={{ backgroundColor }}
            >
              {(Nombre as string)?.charAt(0)}
            </span>
            <span style={{ fontWeight: 'bold' }}>{Nombre}</span>
          </div>
        );
      },
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
      columns={columns}
      data={sells}
      handleLoadMore={loadMoreProducts}
      handleSelectItem={handleSelectItem}
    
      noMoreData={NoMoreProductToShow}
      loadingMoreData={isFetchingNextPage}
    />
  );
}

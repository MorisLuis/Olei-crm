'use client';

import React from 'react';
import Custum500 from '@/components/500';
import { useSellDetails } from '@/hooks/sells/useSellDetails';
import SellDetailsTableInformation from './SellDetailsTableInformation';
import TableSellsDetailsClient from './SellsDetailsTable';
import styles from '../../../../../../styles/pages/SellDetails.module.scss';

export default function SellDetails(): JSX.Element {

  const { items, error, refetch, sellInformation, sellsCount, loadMore, isLoading, isFetchingNextPage, isEnabled } = useSellDetails()

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <div className={styles.sellDetails}>

      <SellDetailsTableInformation
        sellInformation={sellInformation}
        isLoading={isLoading}
      />

      <TableSellsDetailsClient
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={loadMore}

        isLoadingData={(items.length <= 0 && isLoading) || !isEnabled}
        isLoadingUseQuery={isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}

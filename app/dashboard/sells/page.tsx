'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useOrderSellsConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { SellsInterface } from '@/interface/sells';
import { getSells, getTotalSells } from '@/services/sells/sells.service';
import TableSells from './TableSells';
import styles from '../../../styles/pages/Sells.module.scss';

export default function Sells() : JSX.Element {

  const { orderSells } = useOrderSellsConfig();
  const [orderActive, setOrderActive] = useState<OrderObject>(orderSells[0]);

  const fetchInitialData = useCallback(async (): Promise<SellsInterface[]> => {
    const { sells } = await  getSells({ PageNumber: 1, SellsOrderCondition: orderActive });
    return sells;
  }, [orderActive]);

  const fetchPaginatedData = useCallback(async (_: unknown, page?: number): Promise<SellsInterface[]> => {
    const { sells } = await getSells({ PageNumber: page ?? 1, SellsOrderCondition: orderActive });
    return sells;
  }, [orderActive]);

  const fetchTotalCount = useCallback(async (): Promise<number> => {
    const { total } = await getTotalSells();
    return total;
  }, [])


  const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } =
    useLoadMoreData({
      fetchInitialData,
      fetchPaginatedData,
      fetchTotalCount,
      filters: orderActive,
    });

  const onSelectOrder = (value: string | number) : void => {
    const orderActive = orderSells.find((item) => item.value == value);
    if (!orderActive) return;
    setOrderActive(orderActive);
  };

  useEffect(() => {
    handleResetData();
  }, [orderActive, handleResetData]);

  return (
    <div className={styles.page}>
      <Header title="Ventas" dontShowBack />
      <HeaderTable
        orderSells={orderSells}
        onSelectOrder={onSelectOrder}
        orderActive={orderActive}
      />
      <TableSells
        sells={data}
        totalSells={total ?? 0}
        loadMoreProducts={handleLoadMore}
        buttonIsLoading={isButtonLoading}
        loadingData={isLoading}
      />
    </div>
  );
}

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from '@/components/Modals/Modal';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useFilters } from '@/hooks/Filters/useFilters';
import { useFiltersSellsConfig } from '@/hooks/Filters/useFiltersSellsConfig';
import { useOrderSellsClientConfig } from '@/hooks/Orders/useOrderSellsConfig';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { SellsInterface } from '@/interface/sells';
import { getSellsByClient, getTotalSellsByClient } from '@/services/sells/sells.service';
import { CustumRendersSellsByClient } from './RenderDateFilter';
import TableSellsClient from './TableSellsClient';
import SellDetails from './[sellId]/SellDetails';
import { ExecuteFiltersSellsByClient } from './filters';
import { ExecuteNavigationSellsByClient } from './navigation';
import styles from '../../../../styles/pages/Sells.module.scss';

export default function SellsClientPage(): JSX.Element {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const clientName = searchParams.get('client') ?? 'Regresar';
  const { orderSellsClient } = useOrderSellsClientConfig();

  const [orderActive, setOrderActive] = useState<OrderObject>(orderSellsClient[0]);
  const { filtersTag, filtersActive, onSelectFilterValue, onDeleteFilter } = useFilters();
  const { filtersOfSectionSells, filtersSells } = useFiltersSellsConfig();

  const { CustumFilters, CustumRenders } = CustumRendersSellsByClient({
    filtersActive,
    onDeleteFilter,
    onSelectFilterValue,
  });

  ///const filters = ExecuteFiltersSellsByClient({ orderActive, filtersActive });
  const filters = useMemo(() => ExecuteFiltersSellsByClient({ orderActive, filtersActive }),
    [orderActive, filtersActive]
  );
  const memoizedFilters = useMemo(() => filters, [filters]);

  const { navigateToBack, navigateToSellDetails, navigateToBackModal } = ExecuteNavigationSellsByClient({ Id_Cliente: id as string });

  const fetchInitialData = useCallback(async (): Promise<SellsInterface[]> => {
    const { sells } = await getSellsByClient({ PageNumber: 1, client: Number(id), filters: memoizedFilters })
    return sells;
  }, [memoizedFilters, id]);

  const fetchPaginatedData = useCallback(async (_: unknown, page?: number): Promise<SellsInterface[]> => {
    const { sells } = await getSellsByClient({ client: Number(id), PageNumber: page, filters: memoizedFilters })
    return sells;
  }, [memoizedFilters, id]);

  const fetchTotalCount = useCallback(async (): Promise<number> => {
    const { total } = await getTotalSellsByClient({ client: Number(id), filters: memoizedFilters })
    return total;
  }, [memoizedFilters, id])


  const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } =
    useLoadMoreData({
      fetchInitialData,
      fetchPaginatedData,
      fetchTotalCount,
      filters: memoizedFilters
    });

  const onSelectOrder = useCallback(
    (value: string | number) => {
      const orderActive = orderSellsClient.find((item) => item.value == value);
      if (!orderActive) return;
      setOrderActive(orderActive);
    },
    [orderSellsClient]
  );

  useEffect(() => {
    handleResetData();
  }, [filtersActive, orderActive, handleResetData]);

  return (
    <>
      <div className={styles.SellsClient}>
        <Header title={clientName} custumBack={navigateToBack} />
        <HeaderTable
          filters={filtersSells}
          filterActive={filtersTag}
          filtersOfSection={filtersOfSectionSells}
          filtersActive={filtersActive}
          onSelectFilter={onSelectFilterValue}
          onDeleteFilter={onDeleteFilter}
          orderSells={orderSellsClient}
          onSelectOrder={onSelectOrder}
          orderActive={orderActive}
          customFilters={CustumFilters}
          customRenders={CustumRenders}
        />

        <div className={styles.content}>
          <div className={styles.table}>
            <TableSellsClient
              sells={data}
              totalSells={total ?? 0}
              loadMoreProducts={handleLoadMore}
              buttonIsLoading={isButtonLoading}
              loadingData={isLoading}
              handleSelectItem={navigateToSellDetails}
            />
          </div>
        </div>
      </div>

      <Modal visible={Sellid ? true : false} title="Detalle de venta" onClose={navigateToBackModal}>
        <SellDetails />
      </Modal>
    </>
  );
}

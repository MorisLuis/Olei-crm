'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { OrderObject } from '@/components/UI/OrderComponent';
import Header from '@/components/navigation/header';
import HeaderTable from '@/components/navigation/headerTable';
import { useOrderClientsConfig } from '@/hooks/Orders/useOrderClientsConfig';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { ClientInterface } from '@/interface/client';
import { getClients, getTotalClients, searchClients } from '@/services/clients';
import TableClients from './TableClients';
import styles from '../../../styles/pages/Clients.module.scss';

export default function Clients()  : JSX.Element {
  const { orderClients } = useOrderClientsConfig();
  const [orderActive, setOrderActive] = useState<OrderObject>(orderClients[0]);
  const [dataFromSearch, setDataFromSearch] = useState<ClientInterface[] | null>(null);

  const fetchInitialData = useCallback(async (): Promise<ClientInterface[]> => {
    const { clients } = await getClients({ PageNumber: 1, ClientsOrderCondition: orderActive });
    return clients
  }, [orderActive]);

  const fetchPaginatedData = useCallback(async (_: unknown, nextPage: number): Promise<ClientInterface[]> => {
    const { clients } = await getClients({ PageNumber: nextPage ?? 1, ClientsOrderCondition: orderActive });
    return clients
  }, [orderActive]);

  const fetchTotalCount = useCallback( async () : Promise<number> => {
    const { total } = await getTotalClients();
    return total
  }, [])

  const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
    fetchInitialData,
    fetchPaginatedData: (_, nextPage) => fetchPaginatedData(_, nextPage as number),
    fetchTotalCount,
    filters: orderActive,
  });

  const totalClients = dataFromSearch?.length ?? total ?? 0;

  const onSelectOrder = useCallback(
    (value: string | number) => {
      const selectedOrder = orderClients.find((item) => item.value == value);
      if (!selectedOrder) return;
      setOrderActive(selectedOrder);
    },
    [orderClients]
  );

  const onSearchClient = async (value: string) : Promise<void> => {
    if (value === '') return;
    const { clients } = await searchClients(value);
    setDataFromSearch(clients);
  };

  const onCleanSearchClient = useCallback(() => {
    setDataFromSearch(null);
  }, []);

  useEffect(() => {
    handleResetData();
  }, [handleResetData]);

  return (
    <div className={styles.page}>
      <Header title="Clientes" dontShowBack />
      <HeaderTable
        orderSells={orderClients}
        onSelectOrder={onSelectOrder}
        orderActive={orderActive}
        onSearch={onSearchClient}
        onCleanSearch={onCleanSearchClient}
      />
      <TableClients
        clients={dataFromSearch ?? data}
        totalClients={totalClients}
        loadMoreProducts={handleLoadMore}
        buttonIsLoading={isButtonLoading}
        loadingData={isLoading}
      />
    </div>
  );
}

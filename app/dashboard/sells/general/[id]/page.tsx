'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Modal from '@/components/Modals/Modal';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { SellsByClientFilterSchema } from '@/schemas/sellsFilters.schema';
import { SellsByClientFilters, TotalSellsResponse } from '@/services/sells/sells.interface';
import { getSellsByClient, getSellsByClientCountAndTotal } from '@/services/sells/sells.service';
import SellDetails from './[sellId]/SellDetails';
import { sellsByClientFiltersConfig } from './sellsClientFilters';
import sellsClientStats from './sellsClientStats';
import TableSellsClient from './sellsClientTable';

export default function SellsClientPage(): JSX.Element {

  const { id } = useParams();
  const { push, back } = useRouter();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const clientName = searchParams.get('client') ?? 'Regresar';

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsInterface[]>([]);
  const [sellsTotal, setSellsTotal] = useState<TotalSellsResponse | null>(null);
  const [sellsCount, setSellsCount] = useState<number>()
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsByClientFilterSchema)


  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
      [`sells-client-${id}`, page],
      ({ PageNumber, filters }) => getSellsByClient({ client: Number(id), PageNumber, filters }),
      { PageNumber: page, filters }
    );

  const handleSelectClient = useCallback((item: SellsInterface) => {
    if (!item.UniqueKey || !id) return;
    push(`/dashboard/sells/${id}/?sellId=${item.UniqueKey}`);
  }, [id, push]);

  const handleGetTotals = useCallback(async (): Promise<void> => {
    const { total, count } = await getSellsByClientCountAndTotal({
      filters: filters as SellsByClientFilters,
      client: Number(id)
    })

    setSellsTotal(total);
    setSellsCount(count)
  }, [filters, id])


  useEffect(() => {
    handleGetTotals()
  }, [handleGetTotals, filters])

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [filters]);

  useEffect(() => {
    if (data?.sells) {
      setItems(prev => [...prev, ...data.sells]);
    }
  }, [data]);

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <Header
        title={clientName}
        custumBack={() => push('/dashboard/sells/general')}
      />
      <HeaderStats items={sellsClientStats(sellsTotal)} isLoading={isLoading} />

      <FilterBar
        filters={filters}
        config={sellsByClientFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />

      <TableSellsClient
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        handleSelectItem={handleSelectClient}
        buttonIsLoading={false}
        loadingData={items.length <= 0 && isLoading}
      />

      <Modal
        visible={Sellid ? true : false}
        title="Detalle de venta"
        onClose={() => back()}
      >
        <SellDetails />
      </Modal>
    </>
  );
}

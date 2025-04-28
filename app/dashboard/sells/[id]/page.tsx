'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Modal from '@/components/Modals/Modal';
import Header from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { SellsByClientFilterSchema } from '@/schemas/sellsFilters.schema';
import { FilterSellsByClient } from '@/services/cobranza/cobranza.interface';
import { getSellsByClient } from '@/services/sells/sells.service';
import TableSellsClient from './TableSellsClient';
import SellDetails from './[sellId]/SellDetails';
import { sellsByClientFiltersConfig } from './filters';
import styles from '../../../../styles/pages/Sells.module.scss';

export default function SellsClientPage(): JSX.Element {

  const { id } = useParams();
  const { push, back } = useRouter();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const clientName = searchParams.get('client') ?? 'Regresar';

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsInterface[]>([]);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsByClientFilterSchema)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ sells: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
      ['sells-client', page],
      ({ PageNumber, filters }) => getSellsByClient({ client: Number(id), PageNumber, filters }),
      { PageNumber: page, filters }
    );

  const handleSelectClient = useCallback((item: SellsInterface) => {
    if (!item.UniqueKey || !id) return;
    push(`/dashboard/sells/${id}/?sellId=${item.UniqueKey}`);
  }, [id, push]);

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
  if (isLoading && items.length === 0) return <div>cargando...</div>;


  return (
    <>
      <div className={styles.SellsClient}>
        <Header title={clientName} custumBack={() => alert('back')} />

        <FilterBar
          filters={filters}
          config={sellsByClientFiltersConfig}
          updateFilter={updateFilter as (key: keyof FilterSellsByClient, value: number | string | 0 | 1 | 2 | 3 | 4) => void}
          updateFilters={updateFilters}
          removeFilter={removeFilter}
          removeFilters={removeFilters}
        />

        <div className={styles.content}>
          <div className={styles.table}>
            <TableSellsClient
              sells={items}
              totalSells={0}
              loadMoreProducts={() => setPage(p => p + 1)}
              handleSelectItem={handleSelectClient}
              buttonIsLoading={false}
              loadingData={isLoading}
            />
          </div>
        </div>
      </div>

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

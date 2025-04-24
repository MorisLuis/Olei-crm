'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import Header from '@/components/navigation/header';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { FilterCobranzaByClient } from '@/services/cobranza/cobranza.interface';
import { getCobranzaByClient } from '@/services/cobranza/cobranza.service';
import TableCobranzaByClient from './TableCobranzaByClient';
import { cobranzaFiltersConfig } from './filters';
import FilterBar from '../../../../components/navigation/FilterBar';


export default function CobranzaByClient(): JSX.Element {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, updateFilter, updateFilters } = useUrlFilters(CobranzaByClientFilterSchema);

  const Id_Cliente = pathname.split('/').filter(Boolean)[2];
  const Id_Almacen = searchParams.get('Id_Almacen');

  const [cobranzaItems, setCobranzaItems] = useState<SellsInterface[]>([]);
  const [page, setPage] = useState(1);

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ cobranza: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
      ['cobranzaByClient', page, filters],
      ({ PageNumber, filters }) =>
        getCobranzaByClient({
          client: Number(Id_Cliente),
          Id_Almacen: Number(Id_Almacen),
          PageNumber,
          filters: filters as FilterCobranzaByClient,
        }),
      { PageNumber: page, filters }
    );

  const cobranza = data?.cobranza;

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  const handleSelectItem = (): void => {
    return
  };

  useEffect(() => {
    setCobranzaItems([]);
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (!cobranza) return;
    setCobranzaItems((prev) => [...prev, ...data.cobranza]);
  }, [cobranza, data]);


  if (error) {
    return <Custum500 handleRetry={refetch} />;
  }

  if (isLoading && cobranzaItems.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Header title="Cobranza" dontShowBack />

      <FilterBar
        filters={filters}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        config={cobranzaFiltersConfig}
      />

      <TableCobranzaByClient
        sells={cobranzaItems}
        totalSells={0}
        loadMoreProducts={handleLoadMore}
        handleSelectItem={handleSelectItem}
        buttonIsLoading={false}
        loadingData={isLoading}
      />
    </>
  );
}

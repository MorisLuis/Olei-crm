'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { FilterSellsByClient } from '@/services/cobranza/cobranza.interface';
import { getCobranzaByClient } from '@/services/cobranza/cobranza.service';
import CobranzaByClientFilters from './CobranzaByClientFilters';
import TableCobranzaByClient from './TableCobranzaByClient';
import Custum500 from '../../500/page';

export default function CobranzaByClient(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const Id_Cliente = pathname.split('/').filter(Boolean)[2];
  const Id_Almacen = searchParams.get('Id_Almacen');

  const [cobranzaItems, setCobranzaItems] = useState<SellsInterface[]>([]);
  const [page, setPage] = useState(1);

  const { filters } = useUrlFilters(CobranzaByClientFilterSchema);

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ cobranza: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
      ['cobranzaByClient', page, filters],
      ({ PageNumber, filters }) =>
        getCobranzaByClient({
          client: Number(Id_Cliente),
          Id_Almacen: Number(Id_Almacen),
          PageNumber,
          filters: filters as FilterSellsByClient,
        }),
      { PageNumber: page, filters }
    );

  const cobranza = data?.cobranza;

  const handleLoadMore = () : void => {
    setPage((prev) => prev + 1);
  };

  const handleSelectItem = () : void => {
    return
  }

  useEffect(() => {
    if (!cobranza) return;
    setCobranzaItems((prev) => [...prev, ...data.cobranza]);
  }, [cobranza, data]);

  useEffect(() => {
    setCobranzaItems([]);
    setPage(1);
  }, [filters]);

  if (error) {
    return <Custum500 handleRetry={refetch} />;
  }

  if (isLoading && cobranzaItems.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Cobranza por Cliente</h1>

      <CobranzaByClientFilters />

      <TableCobranzaByClient
        sells={cobranzaItems}
        totalSells={0}
        loadMoreProducts={handleLoadMore}
        handleSelectItem={handleSelectItem}
        buttonIsLoading={false}
        loadingData={isLoading}
      />
    </div>
  );
}

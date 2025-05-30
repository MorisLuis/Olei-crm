'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaByClientFilters, TotalCobranzaResponse } from '@/services/cobranza/cobranza.interface';
import { getCobranzaByClient, getCobranzaByClientCountAndTotal } from '@/services/cobranza/cobranza.service';
import { cobranzaByClientFiltersConfig } from './cobranzaClientFilters';
import ShareCobranzaModal from './cobranzaClientShareModal';
import cobranzaByClientStats from './cobranzaClientStats';
import TableCobranzaByClient from './cobranzaClientTable';
import FilterBar from '../../../../components/Filter/FilterBar';
import SellDetails from '../../sells/general/[id]/[sellId]/SellDetails';

export default function CobranzaByClient(): JSX.Element {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } =
    useUrlFilters(CobranzaByClientFilterSchema);

  const Id_Cliente = pathname.split('/').filter(Boolean)[2];
  const Id_Almacen = searchParams.get('Id_Almacen') ?? '';
  const sellId = searchParams.get('sellId');

  const clientName = searchParams.get('client') ?? 'Regresar';
  const email = searchParams.get('email') ?? '';

  const [cobranzaItems, setCobranzaItems] = useState<SellsInterface[]>([]);
  const [page, setPage] = useState(1);
  const [cobranzaByClientTotal, setCobranzaByClientTotal] = useState<TotalCobranzaResponse | null>(null);
  const [cobranzaByClientCount, setCobranzaByClientCount] = useState<number>();
  const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false);

  const { data, error, isLoading, refetch } = useQueryPaginationWithFilters<{ cobranza: SellsInterface[] }, { PageNumber: number; filters: typeof filters }>(
    [`cobranzaByClient-${Id_Cliente}-${Id_Almacen}`, page, filters],
    ({ PageNumber, filters }) =>
      getCobranzaByClient({
        client: Number(Id_Cliente),
        Id_Almacen: Number(Id_Almacen),
        PageNumber,
        filters: filters as CobranzaByClientFilters,
      }),
    { PageNumber: page, filters },
  );

  const cobranza = data?.cobranza;

  const handleLoadMore = (): void => setPage((prev) => prev + 1);

  const handleSelectItem = (item: SellsInterface): void => {
    const params = new URLSearchParams({
      Id_Almacen,
      client: clientName,
      email,
    });
    params.set('sellId', item.UniqueKey ?? "");
    push(`/dashboard/cobranza/${Id_Cliente}?${params.toString()}`);
    setIsVisible(true);
  };

  const handleCloseModalSell = (): void => {
    /** quitamos sólo sellId para que el usuario siga en la misma pantalla */
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sellId');
    push(`${pathname}?${params.toString()}`, { scroll: false });
    setIsVisible(false);
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Compartir Relación',
      onclick: () => setOpenModalShareCobranza(true),
      color: 'yellow',
      notVsible: !email,
    },
  ];

  /** ────────────────────────────
   *  Totales
   *  Se obtienen cuando:
   *    • no hay sellId  (vista normal)
   *    • hay sellId PERO aún no se han cargado datos (refresh con modal)
   *  ──────────────────────────── */
  const handleGetTotals = useCallback(async (): Promise<void> => {
    const { total, count } = await getCobranzaByClientCountAndTotal({
      client: Number(Id_Cliente),
      Id_Almacen: Number(Id_Almacen),
      filters: filters as CobranzaByClientFilters,
    });

    setCobranzaByClientTotal(total);
    setCobranzaByClientCount(count);
  }, [Id_Cliente, Id_Almacen, filters]);

  useEffect(() => {
    if (!Id_Cliente) return;

    const shouldGetTotals =
      !sellId || (sellId && cobranzaItems.length === 0);

    if (shouldGetTotals) {
      handleGetTotals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id_Cliente, sellId, filters]);

  /** ───────── Reset cuando cambian filtros (solo vista normal) */
  useEffect(() => {
    if (!sellId) {
      setCobranzaItems([]);
      setPage(1);
    }
  }, [filters, sellId]);

  /** ───────── Append de datos (solo vista normal o refresh con modal) */
  useEffect(() => {
    if (!cobranza) return;

    const shouldAppend = !sellId || (sellId && cobranzaItems.length === 0);

    if (shouldAppend) {
      setCobranzaItems((prev) => [...prev, ...cobranza]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cobranza, sellId]);

  if (error) {
    return <Custum500 handleRetry={refetch} />;
  }

  return (
    <>
      <Header title={clientName} actions={clientActions} />
      <HeaderStats
        items={cobranzaByClientStats(cobranzaByClientTotal)}
        isLoading={isLoading}
      />

      <FilterBar
        filters={filters}
        config={cobranzaByClientFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
      />

      <TableCobranzaByClient
        sells={cobranzaItems}
        totalSells={cobranzaByClientCount ?? 0}
        loadMoreProducts={handleLoadMore}
        handleSelectItem={handleSelectItem}
        buttonIsLoading={isLoading}
        loadingData={cobranzaItems.length === 0 && isLoading}
      />

      <Modal
        visible={isVisible || (sellId ? true : false) }
        title='Detalle de venta'
        onClose={handleCloseModalSell}
        modalSize='medium'
      >
        <SellDetails />
      </Modal>

      <ShareCobranzaModal
        visible={openModalShareCobranza}
        onClose={() => setOpenModalShareCobranza(false)}
        email={email}
        clientName={clientName}
        filters={filters as CobranzaByClientFilters}
      />
    </>
  );
}

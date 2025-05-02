'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsInterface } from '@/interface/sells';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { FilterCobranzaByClient, totalCobranzaByClientResponse } from '@/services/cobranza/cobranza.interface';
import { getCobranzaByClient } from '@/services/cobranza/cobranza.service';
import { cobranzaByClientFiltersConfig } from './cobranzaClientFilters';
import ShareCobranzaModal from './cobranzaClientShareModal';
import cobranzaByClientStats from './cobranzaClientStats';
import TableCobranzaByClient from './cobranzaClientTable';
import FilterBar from '../../../../components/Filter/FilterBar';
import SellDetails from '../../sells/[id]/[sellId]/SellDetails';


export default function CobranzaByClient(): JSX.Element {

  const pathname = usePathname();
  const { push, back } = useRouter()
  const searchParams = useSearchParams();
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaByClientFilterSchema);

  const Id_Cliente = pathname.split('/').filter(Boolean)[2];
  const Id_Almacen = searchParams.get('Id_Almacen');
  const clientName = searchParams.get('client') ?? 'Regresar';
  const email = searchParams.get('email') ?? '';

  const [cobranzaItems, setCobranzaItems] = useState<SellsInterface[]>([]);
  const [page, setPage] = useState(1);
  const [openModalSell, setOpenModalSell] = useState(false);
  const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false)

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ cobranza: SellsInterface[], count: number, totalStats: totalCobranzaByClientResponse }, { PageNumber: number; filters: typeof filters }>(
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

  const handleSelectItem = (item: SellsInterface): void => {
    setOpenModalSell(true)
    push(`/dashboard/cobranza/${Id_Cliente}?sellId=${item.UniqueKey}`)
  }

  const handleCloseModalSell = (): void => {
    back()
    setOpenModalSell(false)
  };

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Compartir Relación',
      onclick: () => setOpenModalShareCobranza(true),
      color: 'yellow',
      notVsible: !email
    }
  ]

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

  return (
    <>
      <Header title={clientName ?? 'Cobranza'} actions={clientActions} />
      <HeaderStats items={cobranzaByClientStats(data?.totalStats)} isLoading={isLoading} />

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
        totalSells={data?.count ?? 0}
        loadMoreProducts={handleLoadMore}
        handleSelectItem={handleSelectItem}
        buttonIsLoading={false}
        loadingData={cobranzaItems.length <= 0 && isLoading}
      />

      <Modal
        visible={openModalSell}
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
        filters={filters as FilterCobranzaByClient}
      />
    </>
  );
}

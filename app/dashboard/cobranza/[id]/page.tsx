'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Custum500 from '@/components/500';
import Modal from '@/components/Modals/Modal';
import Header, { ActionsInterface } from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useCobranzaByClient } from '@/hooks/sells/useCobranzaByClient';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaByClientFilters } from '@/services/cobranza/cobranza.interface';
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
  const clientName = searchParams.get('client') ?? 'Regresar';
  const email = searchParams.get('email') ?? '';
  const sellId = searchParams.get('sellId');

  const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaByClientFilterSchema);
  const { error, refetch, items, loadMore, isLoading, cobranzaCount, handleSelectItem, cobranzaByClientTotal } = useCobranzaByClient(filters);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Compartir Relación',
      onclick: () => setOpenModalShareCobranza(true),
      color: 'yellow',
      notVsible: !email,
    },
  ];

  const handleCloseModalSell = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sellId');
    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (error) {
    return <Custum500 handleRetry={refetch} />;
  }

  return (
    <>
      <Header
        title={clientName}
        actions={clientActions}
        custumBack={() => push('/dashboard/cobranza')}
      />
  
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
        sells={items}
        totalSells={cobranzaCount ?? 0}
        loadMoreProducts={loadMore}
        handleSelectItem={handleSelectItem}
        isLoading={isLoading}
        loadingData={items.length === 0 && isLoading}
      />

      <Modal
        visible={sellId ? true : false}
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

'use client';

import { useSearchParams } from 'next/navigation';
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
import { useCobranzaNavigation } from './navigation';
import FilterBar from '../../../../components/Filter/FilterBar';
import SellDetails from '../../sells/general/[id]/[sellId]/SellDetails';

export default function CobranzaByClient(): JSX.Element {

  const searchParams = useSearchParams();
  const clientName = searchParams.get('client') ?? 'Regresar';
  const email = searchParams.get('email') ?? '';
  const sellId = searchParams.get('sellId');
  const { navigateToBack, navigateToCloseModal, onSelectItem } = useCobranzaNavigation()

  const [openModalShareCobranza, setOpenModalShareCobranza] = useState(false);
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(CobranzaByClientFilterSchema);
  const { error, refetch, items, loadMore, isLoading, cobranzaCount, cobranzaByClientTotal } = useCobranzaByClient(filters);

  const clientActions: ActionsInterface[] = [
    {
      id: 1,
      text: 'Compartir Relación',
      onclick: () => setOpenModalShareCobranza(true),
      color: 'yellow',
      notVsible: !email,
    },
  ];

  if (error) {
    return <Custum500 handleRetry={refetch} />;
  }

  return (
    <>
      <Header
        title={clientName}
        actions={clientActions}
        custumBack={navigateToBack}
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
        handleSelectItem={onSelectItem}
        isLoading={isLoading}
        loadingData={items.length === 0 && isLoading}
      />

      <Modal
        visible={sellId ? true : false}
        title='Detalle de venta'
        onClose={navigateToCloseModal}
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

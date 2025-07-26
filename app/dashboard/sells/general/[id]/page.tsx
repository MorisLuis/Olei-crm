'use client';

import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import Custum500 from '@/components/500';
import { ClientActionsModal } from '@/components/Clients/ClientActionsModals';
import FilterBar from '@/components/Filter/FilterBar';
import Modal from '@/components/Modals/Modal';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useClientActions } from '@/hooks/clients/useClientActions';
import { useSellsByClient } from '@/hooks/sells/useSellsByClient';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { SellsByClientFilterSchema } from '@/schemas/sellsFilters.schema';
import SellDetails from './[sellId]/SellDetails';
import { sellsByClientFiltersConfig } from './sellsClientFilters';
import sellsClientStats from './sellsClientStats';
import TableSellsClient from './sellsClientTable';
import { useSellsByClientNavigation } from './useSellsByClientNavigation';

export default function SellsClientPage(): JSX.Element {

  const { id: idCliente } = useParams();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const { navigateToBack, navigateToCloseModal, onSelectSell } = useSellsByClientNavigation()
  const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(SellsByClientFilterSchema);

  const {
    clientData,
    clientActions,
    openModalWhatsApp,
    openModalEmail,
    setOpenModalWhatsApp,
    setOpenModalEmail,
  } = useClientActions(Number(idCliente));

  const {
    error,
    refetch,
    items,
    sellsCount,
    clientName,
    sellsTotal,
    loadMore,
    isLoading,
    isFetchingNextPage,
    isLoadingTotals
  } = useSellsByClient(Number(idCliente), filters)

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <>
      <Header
        title={clientName}
        custumBack={navigateToBack}
        actions={clientActions.filter((item) => item.id !== 3)}
      />

      <HeaderStats items={sellsClientStats(sellsTotal)} isLoading={isLoadingTotals} />

      <FilterBar
        filters={filters}
        config={sellsByClientFiltersConfig}
        updateFilter={updateFilter}
        updateFilters={updateFilters}
        removeFilter={removeFilter}
        removeFilters={removeFilters}
        isLoading={isLoading}
      />

      <TableSellsClient
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={loadMore}
        handleSelectItem={onSelectSell}
        loadingData={items.length <= 0 && isLoading}
        isFetchingNextPage={isFetchingNextPage}
      />

      <ClientActionsModal
        openModalWhatsApp={openModalWhatsApp}
        openModalEmail={openModalEmail}
        phoneNumber={clientData?.TelefonoWhatsapp?.trim()}
        email={clientData?.CorreoVtas}
        onCloseWhatsApp={() => setOpenModalWhatsApp(false)}
        onCloseEmail={() => setOpenModalEmail(false)}
      />


      <Modal
        visible={Sellid ? true : false}
        title="Detalle de venta"
        onClose={navigateToCloseModal}
      >
        <SellDetails />
      </Modal>
    </>
  );
}

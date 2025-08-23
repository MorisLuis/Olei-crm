
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import FilterBar from '@/components/Filter/FilterBar';
import Modal from '@/components/Modals/Modal';
import Header from '@/components/navigation/header';
import HeaderStats from '@/components/navigation/headerStats';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { AbonosInterface } from '@/interface/abonos';
import { getAbonos } from '@/services/abonos/abonos.service';
import { TotalCobranzaResponse } from '@/services/cobranza/cobranza.interface';
import { getCobranzaCountAndTotal } from '@/services/cobranza/cobranza.service';
import AbonosDetails from './[id]/AbonosDetails';
import { useAbonosNavigation } from './[id]/useAbonosNavigation';
import { abonosFiltersConfig } from './abonosFilters';
import { AbonosFilterSchema } from './abonosFilters.schema';
import abonosStats from './abonosStats';
import TableAbonos from './abonosTable';


function AbonosContent(): JSX.Element {

    //const router = useRouter()
    const [cobranzaTotal, setCobranzaTotal] = useState<TotalCobranzaResponse | null>(null);
    const [isLoadingTotals, setIsLoadingTotals] = useState(true)

    const searchParams = useSearchParams();
    const folio = searchParams.get('folio');
    const idAlmacen = searchParams.get('Id_Almacen');

    const { onSelectAbono, navigateToCloseModal} = useAbonosNavigation();
    const { filters, updateFilter, updateFilters, removeFilter, removeFilters } = useUrlFilters(AbonosFilterSchema)

    const {
        data,
        error,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ abonos: AbonosInterface[], total: number }, Error>({
        queryKey: ['abonos', filters],
        queryFn: ({ pageParam = 1 }) => getAbonos({ PageNumber: pageParam as number, filters }),
        getNextPageParam: (lastPage, allPages) => lastPage.abonos.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 5
    });
    const items = data?.pages.flatMap(page => page.abonos) ?? [];
    const itemsTotal = data?.pages.flatMap(page => page.total)[0] ?? 0;


    const handleGetTotals = useCallback(async (): Promise<void> => {
        setIsLoadingTotals(true)
        const { total } = await getCobranzaCountAndTotal({
            filters: {
                termSearch: filters['cliente.Nombre'],
                startDate: filters['DateStart'],
                endDate: filters['DateEnd'],
                exactlyDate: filters['DateExactly'],
            }
        })
        setCobranzaTotal(total);
        setIsLoadingTotals(false);
    }, [filters])

    useEffect(() => {
        handleGetTotals()
    }, [handleGetTotals, filters])

    if (error) return <Custum500 handleRetry={refetch} />;

    return (
        <>
            <Header title="Abonos" dontShowBack />
            <HeaderStats
                items={abonosStats(cobranzaTotal)}
                isLoading={isLoadingTotals}
                sizeSkeleton={3}
            />

            <FilterBar
                filters={filters}
                config={abonosFiltersConfig}
                updateFilter={updateFilter}
                updateFilters={updateFilters}
                removeFilter={removeFilter}
                removeFilters={removeFilters}
                isLoading={isLoading}
            />

            <TableAbonos
                abonos={items}
                totalAbonos={itemsTotal ?? 0}
                loadMoreProducts={fetchNextPage}
                handleSelectItem={onSelectAbono}

                isLoadingData={items.length <= 0 && isLoading}
                isFetchingNextPage={isFetchingNextPage}
                isLoadingUseQuery={isLoading}
            />

            <Modal
                visible={(idAlmacen && folio) ? true : false}
                title="Detalle de abono"
                onClose={navigateToCloseModal}
            >
                <AbonosDetails />
            </Modal>
        </>
    );
}

export default function Cobranza(): JSX.Element {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
            <AbonosContent />
        </Suspense>
    );
}

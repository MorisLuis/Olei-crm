"use client"

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AbonosInterface } from '@/interface/abonos';
import { getAbonoById, getAbonoDetails } from '@/services/abonos/abonos.service';
import { AbonoDetailsInterface } from '../types';

interface UseAbonoDetailsReturn {
    abonoInformation?: AbonosInterface;
    abonoDetails?: AbonoDetailsInterface[]
    isLoading: boolean;
    refetch: () => void;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
}

/**
 * Custom hook para manejar toda la lógica de obtener detalles de un abono.
 */

export function useAbonoDetails(): UseAbonoDetailsReturn {

    const [abonoInformation, setAbonoInformation] = useState<AbonosInterface>();
    const searchParams = useSearchParams();
    const Folio = searchParams.get('folio');
    const Id_Almacen = searchParams.get('Id_Almacen');

    const fetchAbonoInformation = useCallback(async () => {
        if (Folio == null || Id_Almacen == null) return;
        //setIsLoading(true)
        const { abono } = await getAbonoById(
            Id_Almacen,
            Folio,
        );

        //setIsLoading(false)
        setAbonoInformation(abono);
    }, [Id_Almacen, Folio]);

    const {
        data,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery<{ abonoDetails: AbonoDetailsInterface[] }, Error>({
        queryKey: ["abono", Folio, Id_Almacen],
        queryFn: ({ pageParam = 1 }) => getAbonoDetails({
            folio: Folio as string,
            PageNumber: pageParam as number
        }),
        getNextPageParam: (lastPage, allPages) => lastPage.abonoDetails.length === 0 ? undefined : allPages.length + 1,
        initialPageParam: 1
    });


    const abonoDetails = data?.pages.flatMap(page => page.abonoDetails) ?? [];

    useEffect(() => {
        fetchAbonoInformation()
    }, [fetchAbonoInformation]);

    return {
        abonoInformation,
        abonoDetails,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    };
}

"use client"

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { AbonosInterface } from '@/interface/abonos';
import { getAbonoById } from '@/services/abonos/abonos.service';

interface UseAbonoDetailsReturn {
    abonoInformation?: AbonosInterface;
    isLoading: boolean;
}

/**
 * Custom hook para manejar toda la lógica de obtener detalles de un abono.
 */

export function useAbonoDetails(): UseAbonoDetailsReturn {

    const [abonoInformation, setAbonoInformation] = useState<AbonosInterface>();
    const [isLoading, setIsLoading] = useState(false)

    const searchParams = useSearchParams();
    const Folio = searchParams.get('folio');
    const Id_Almacen = searchParams.get('Id_Almacen');

    const fetchAbonoInformation = useCallback(async () => {
        if (Folio == null || Id_Almacen == null) return;
        setIsLoading(true)
        const { abono } = await getAbonoById(
            Id_Almacen,
            Folio,
        );

        setIsLoading(false)
        setAbonoInformation(abono);
    }, [Id_Almacen, Folio]);


    useEffect(() => {
        fetchAbonoInformation()
    }, [fetchAbonoInformation]);

    return {
        abonoInformation,
        isLoading
    };
}

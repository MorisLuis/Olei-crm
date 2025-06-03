// hooks/useQueryPaginationWithFilters.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import qs from 'qs'

export function useQueryPaginationWithFilters<T, F extends { PageNumber?: number }>(
    queryKey: readonly unknown[],
    queryFn: (params: F) => Promise<T>,
    params: F,
    options?: Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, 'queryKey' | 'queryFn'>
) {

    // 1. Serializa params de forma consistente
    const serializedTest = qs.stringify(params, {
        skipNulls: true,
        sort: (a, b) => a.localeCompare(b),
    })

    const enabled = options?.enabled ?? !!params.PageNumber;

    // Definimos las opciones explícitamente, permitiendo 'keepPreviousData'
    const queryOptions: UseQueryOptions<T, Error> & { keepPreviousData?: boolean } = {
        queryKey: [...queryKey, serializedTest],
        queryFn: () => queryFn(params),
        enabled,
        keepPreviousData: true, // Agregar la propiedad 'keepPreviousData'
        ...options, // Las opciones pasadas por el usuario
    };

    return useQuery<T, Error>(queryOptions);
}

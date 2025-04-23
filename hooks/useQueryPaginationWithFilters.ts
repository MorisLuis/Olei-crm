// hooks/useQueryPaginationWithFilters.ts
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useQueryPaginationWithFilters<T, F extends { PageNumber?: number }>(
    queryKey: readonly unknown[],
    queryFn: (params: F) => Promise<T>,
    params: F,
    options?: Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, 'queryKey' | 'queryFn'>
) {
    const serialized = JSON.stringify(params);
    const enabled = options?.enabled ?? !!params.PageNumber;

    // Definimos las opciones explícitamente, permitiendo 'keepPreviousData'
    const queryOptions: UseQueryOptions<T, Error> & { keepPreviousData?: boolean } = {
        queryKey: [...queryKey, serialized],
        queryFn: () => queryFn(params),
        enabled,
        keepPreviousData: true, // Agregar la propiedad 'keepPreviousData'
        ...options, // Las opciones pasadas por el usuario
    };

    return useQuery<T, Error>(queryOptions);
}

import { useMemo, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ZodError, infer as zInfer, AnyZodObject } from 'zod'

/**
 * Custom React hook to manage URL query parameters as filters.
 * 
 * - Parses current URL query params into a typed object using a Zod schema.
 * - Provides utilities to update, remove, or batch update filters in the URL.
 *
 * @template S Zod schema describing the shape of filters.
 * @param schema - A Zod schema used to validate and infer the filter object type.
 *
 * @returns An object containing:
 * - `filters`: A typed object of the current filters.
 * - `updateFilter`: Function to update a single filter.
 *  @param key - The filter key to update.
 *  @param value - The new value for the filter.
 * - `updateFilters`: Function to update multiple filters at once.
 * - `removeFilter`: Function to remove a single filter.
 * - `removeFilters`: Function to remove multiple filters.
 */
export function useUrlFilters<S extends AnyZodObject>(schema: S) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filters = useMemo<zInfer<S>>(() => {
        const rawObj = Object.fromEntries(searchParams.entries())

        try {
            return schema.parse(rawObj)
        } catch (err) {
            if (err instanceof ZodError) return schema.parse({})
            throw err
        }
    }, [searchParams, schema])

    const updateFilter = useCallback(
        (key: keyof zInfer<S>, value: zInfer<S>[typeof key]) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(String(key), String(value))
            router.push(`?${params.toString()}`)
        },
        [router, searchParams]
    );

    const updateFilters = useCallback(
        (updates: Partial<Record<keyof zInfer<S>, string | number>>) => {
            const params = new URLSearchParams(searchParams.toString())
            Object.entries(updates).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.set(key, String(value))
                }
            })
            router.push(`?${params.toString()}`)
        },
        [router, searchParams]
    );

    const removeFilter = useCallback(
        (key: keyof zInfer<S>) => {
            const params = new URLSearchParams(searchParams.toString());
            params.delete(String(key));
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    const removeFilters = useCallback(
        (keys: (keyof zInfer<S>)[]) => {
            const params = new URLSearchParams(searchParams.toString());
            keys.forEach(key => params.delete(String(key)));
            router.push(`?${params.toString()}`);
        },
        [router, searchParams]
    );

    return { filters, updateFilter, updateFilters, removeFilter, removeFilters }
}

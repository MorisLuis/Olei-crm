import { useMemo, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ZodType, ZodError, infer as zInfer } from 'zod'

export function useUrlFilters<S extends ZodType<any, any>>(
    schema: S
) {
    const searchParams = useSearchParams()
    const router = useRouter()
    
    
    const filters = useMemo<zInfer<S>>(() => {
        const rawObj = Object.fromEntries(searchParams.entries())
        console.log('parsedFilters:', schema.parse(rawObj)) // Verifica cómo se parsean
        
        try {
            return schema.parse(rawObj)
        } catch (err) {
            if (err instanceof ZodError) {
                return schema.parse({})
            }
            throw err
        }
    }, [searchParams, schema])

    const updateFilter = useCallback(
        (key: keyof zInfer<S>, value: zInfer<S>[typeof key]) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(String(key), String(value))
            //router.push(`?${params.toString()}`, { shallow: true })
            router.push(`?${params.toString()}`)
        },
        [router, searchParams]
    )

    return { filters, updateFilter }
}

import { SellsOrderByClientCondition, SellsOrderCondition } from '@/utils/constants/sells'
import { z } from 'zod'

export type SellsFilterSchemaType = 'sellsOrderCondition' | 'searchTerm' | 'DateStart' | 'DateEnd' | 'DateExactly'
export const SellsFilterSchema = z.object({
    sellsOrderCondition: z.enum(SellsOrderCondition).default('Nombre'),
    searchTerm: z.string().optional().transform(val => val ?? ''),
    DateExactly: z.string().optional().transform(val => val ?? ''),
    DateStart: z.string().optional().transform(val => val ?? ''),
    DateEnd: z.string().optional().transform(val => val ?? '')
})


export const SellsByClientFilterSchema = z.object({
    sellsOrderCondition: z.enum(SellsOrderByClientCondition).default('ExpiredDays'),
    TipoDoc: z.coerce.number().default(0),

    FilterExpired: z.coerce.number().refine((val) => [0, 1].includes(val), {
        message: 'Invalid value for FilterExpired, expected 0 or 1',
    }).default(0),
    FilterNotExpired: z.coerce.number().refine((val) => [0, 1].includes(val), {
        message: 'Invalid value for FilterExpired, expected 0 or 1',
    }).default(0),
    DateExactly: z.string().optional().transform(val => val ?? ''),
    DateStart: z.string().optional().transform(val => val ?? ''),
    DateEnd: z.string().optional().transform(val => val ?? '')
})

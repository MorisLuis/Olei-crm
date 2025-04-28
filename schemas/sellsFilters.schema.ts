import { SellsOrderCondition } from '@/services/sells/sells.interface'
import { z } from 'zod'

export const SellsFilterSchema = z.object({
    SellsOrderCondition: z.enum(SellsOrderCondition).default('Nombre'),
    termSearch: z.string().optional().transform(val => val ?? '')
})


export const SellsByClientFilterSchema = z.object({
    FilterExpired: z.union([z.literal(0), z.literal(1)]).default(0),
    FilterNotExpired: z.union([z.literal(0), z.literal(1)]).default(0),
    TipoDoc: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
    ]).default(0),
    DateExactly: z.string().optional().transform(val => val ?? ''),
    DateStart: z.string().optional().transform(val => val ?? ''),
    DateEnd: z.string().optional().transform(val => val ?? ''),
    sellsOrderCondition: z.enum(SellsOrderCondition).default('Nombre'),
    termSearch: z.string().optional().transform(val => val ?? ''),
})

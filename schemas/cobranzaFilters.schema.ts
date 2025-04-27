import { CobranzaByClientCondition, CobranzaOrderCondition } from '@/services/cobranza/cobranza.interface'
import { z } from 'zod'

// Zod schema para los filtros de la página de cobranza
export const CobranzaFilterSchema = z.object({
    cobranzaOrderCondition: z.enum(CobranzaOrderCondition).default('ExpiredDays'),
    termSearch: z.string().optional().transform(val => val ?? '')
})

export const CobranzaByClientFilterSchema = z.object({
    cobranzaOrderCondition: z.enum(CobranzaByClientCondition).default('ExpiredDays'),
    FilterExpired: z.coerce.number().refine((val) => [0, 1].includes(val), {
        message: 'Invalid value for FilterExpired, expected 0 or 1',
    }).default(0),
    FilterNotExpired: z.coerce.number().refine((val) => [0, 1].includes(val), {
        message: 'Invalid value for FilterNotExpired, expected 0 or 1',
    }).default(0),
    TipoDoc: z.coerce.number().default(0),
    DateStart: z.string().optional().default(''),
    DateEnd: z.string().optional().default(''),
    DateExactly: z.string().optional().default(''),
})

import { MeetingOrderCondition } from '@/interface/meeting'
import { z } from 'zod'

export const BitacoraFilterSchema = z.object({
    meetingOrderCondition: z.enum(MeetingOrderCondition).default('Cliente'),
    FilterCliente: z.union([z.literal(0), z.literal(1)]).default(0),
    FilterTipoContacto: z.union([z.literal(0), z.literal(1)]).default(0),
    TipoContacto: z.union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
    ]).default(0),
    Id_Cliente: z.number().default(1),
    termSearch: z.string().optional().transform(val => val ?? '')
})

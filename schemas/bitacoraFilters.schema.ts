import { MeetingOrderCondition } from '@/services/bitacora/meeting.interface'
import { z } from 'zod'

const TipoContactoSchema = z.coerce.number()
    .refine(val => [0, 1, 2, 3 ].includes(val), {
        message: 'Invalid TipoContacto value',
    })
    .transform(val => val as 0 | 1 | 2 | 3 );

    const StatusSchema = z.coerce.number()
    .refine(val => [0, 1, 2].includes(val), {
        message: 'Invalid status value',
    })
    .transform(val => val as 0 | 1 | 2 );

export const BitacoraFilterSchema = z.object({
    meetingOrderCondition: z.enum(MeetingOrderCondition).default('Cliente'),
    FilterCliente: z.union([z.literal(0), z.literal(1)]).default(0),
    FilterTipoContacto: z.union([z.literal(0), z.literal(1)]).default(0),
    TipoContacto: TipoContactoSchema.default(0),
    Id_Cliente: z.number().default(0),
    termSearch: z.string().optional().transform(val => val ?? ''),
    searchTerm: z.string().optional().transform(val => val ?? ''),
    status: StatusSchema.default(0)
})

import { ClientOrderCondition } from '@/interface/client'
import { z } from 'zod'

export const ClientsFilterSchema = z.object({
    clientOrderCondition: z.enum(ClientOrderCondition).default('Nombre'),
    termSearch: z.string().optional().transform(val => val ?? '')
})

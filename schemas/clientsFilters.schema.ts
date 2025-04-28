import { ClientOrderCondition } from '@/services/clients/clients.interface'
import { z } from 'zod'

export const ClientsFilterSchema = z.object({
    clientOrderCondition: z.enum(ClientOrderCondition).default('Nombre'),
    searchTerm: z.string().optional().transform(val => val ?? '')
})

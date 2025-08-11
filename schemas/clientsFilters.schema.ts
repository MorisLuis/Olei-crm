import { ClientOrderCondition } from '@/services/clients/clients.interface'
import { z } from 'zod'

export const ClientsFilterSchema = z.object({
    orderField: z.enum(ClientOrderCondition).default('Nombre'),
    Nombre: z.string().optional().transform(val => val ?? ''),
    Id_Cliente: z.string().optional().transform(val => val ?? '')
})

import { SellsProductsOrderCondition, SellsProductsOrderConditionType } from '@/services/sells/sellsProducts/sellsProducts.interface'
import { z } from 'zod'

export type SellsProductsFilterSchemaType = 'Marca' | 'Codigo' | 'Descripcion' | 'Sku' | 'DateStart' | 'DateEnd' | 'DateExactly' | 'OrderCondition'
export const SellsProductsFilterSchema = z.object({
    Marca: z.string().optional().default(''),
    Codigo: z.string().optional().default(''),
    Descripcion: z.string().optional().default(''),
    Sku: z.string().optional().default(''),
    DateStart: z.string().optional().default(''),
    DateEnd: z.string().optional().default(''),
    DateExactly: z.string().optional().default(''),
    OrderCondition: z
        .string()
        .optional()
        .refine(
            (val): val is SellsProductsOrderConditionType =>
                val === undefined || SellsProductsOrderCondition.includes(val as SellsProductsOrderConditionType),
            { message: "OrderCondition debe ser 'Folio', 'Codigo', 'Fecha' o 'Marca'" }
        ).default('Fecha')
})

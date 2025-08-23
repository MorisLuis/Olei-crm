import { z } from "zod";
import { AbonosOrderCondition } from "@/app/dashboard/abonos/utils";

export const AbonosFilterSchema = z.object({
    orderField: z.enum(AbonosOrderCondition).default('Folio'),
    ['cliente.Nombre']: z.string().optional().transform(val => val ?? ''),
    DateStart: z.string().optional().default(''),
    DateEnd: z.string().optional().default(''),
    DateExactly: z.string().optional().default(''),
})

import { AbonosOrderCondition } from "@/app/dashboard/abonos/utils";
import { z } from "zod";

export const AbonosFilterSchema = z.object({
    orderField: z.enum(AbonosOrderCondition).default('Folio'),
    ['cliente.Nombre']: z.string().optional().transform(val => val ?? ''),
})

import { AbonosOrderCondition } from "@/services/abonos/abonos.interface";
import { z } from "zod";

export const AbonosFilterSchema = z.object({
    orderField: z.enum(AbonosOrderCondition).default('Folio'),
    Nombre: z.string().optional().transform(val => val ?? ''),
})

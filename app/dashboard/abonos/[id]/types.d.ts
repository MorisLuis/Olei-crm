import { typeTipoDoc } from "@/services/sells/sells.interface";

export interface AbonoDetailsInterface {
    Folio: number,
    TipoDoc: typeTipoDoc,
    Fecha: Date,
    Saldo: number,
    Total: number,
}
import { typeTipoDoc } from "@/services/sells/sells.interface";

export interface AbonoDetails {
    Folio: string;
    TipoDoc: typeTipoDoc;
    Saldo: number;
    Total: number;
    Fecha: Date;
}

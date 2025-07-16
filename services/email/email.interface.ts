import { CobranzaByClientFilters } from "../cobranza/cobranza.interface";

interface PostEmailCobranzaParams {
    destinatario: string,
    remitente: string,
    text: string,
    subject: string,
    nombreRemitente: string,
    PageNumber: number,
    filters: CobranzaByClientFilters
    Id_Cliente: number,
    Id_Almacen: number;
};


export type {
    PostEmailCobranzaParams
}
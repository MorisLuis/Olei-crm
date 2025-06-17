import { CobranzaByClientFilters } from "../cobranza/cobranza.interface";

interface PostEmailCobranzaParams {
    destinatario: string,
    remitente: string,
    text: string,
    subject: string,
    nombreRemitente: string,
    Id_Cliente: number,
    PageNumber: number,
    filters: CobranzaByClientFilters
};


export type {
    PostEmailCobranzaParams
}
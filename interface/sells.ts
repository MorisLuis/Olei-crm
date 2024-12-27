export interface SellsInterface {
    UniqueKey?: string;
    Id_Cliente: number;
    Id_Almacen: number;
    TipoDoc: typeTipoDoc;
    Folio: number;
    Serie: string;
    Fecha: Date;
    FechaEntrega?: Date | null;
    Saldo: number;
    Total: number;
    Nombre: string;

    ExpiredDays?: number;
    Impuesto?: number;
    FechaLiq?: Date;
    Piezas?: number;
}


export type typeTipoDoc = 0 | 1 | 2 | 3 | 4;
export const TipoDoc: typeTipoDoc[] = [0, 1, 2, 3, 4];

export const tipoDocMap = {
    0: "Otro",
    1: "Facturas",
    2: "Remisión",
    3: "Pedidos",
    4: "Cotización"
} as const;

export type SellsOrderConditionType = 'Nombre' | 'Saldo' | 'Total';
export const SellsOrderCondition: SellsOrderConditionType[] = ['Nombre', 'Saldo', 'Total']

export type SellsOrderConditionByClientType = 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
export const SellsOrderByClientCondition: SellsOrderConditionByClientType[] = ['TipoDoc', 'Folio', 'Fecha', 'FechaEntrega', 'ExpiredDays']

export type SellsFilterConditionByClientType = 'TipoDoc' | 'Expired' | "Not Expired"
export const SellsFilterCondition: SellsFilterConditionByClientType[] = ['TipoDoc', 'Expired', "Not Expired"]

export interface SellsDetailsInterface {
    Codigo: string;
    Cantidad: number;
    Unidad: string;
    Descripcion: string;
    Precio: number;
    Impuesto: number;
    Importe: number;
}

export interface FilterSellsByClient {
    FilterTipoDoc: 0 | 1,
    FilterExpired: 0 | 1,
    FilterNotExpired: 0 | 1
    TipoDoc: 0 | 1 | 2 | 3 | 4;
    DateExactly?: string;
    DateStart?: string;
    DateEnd?: string;
    sellsOrderCondition?: string;
}
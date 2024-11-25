export interface SellsInterface {
    UniqueKey?: string;
    Id_Cliente: number;
    Id_Almacen: number;
    TipoDoc: 0 | 1 | 2 | 3 | 4;
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

export type SellsOrderConditionType = 'TipoDoc' | 'Folio' | 'Fecha' | 'FechaEntrega' | 'ExpiredDays';
export const SellsOrderCondition : SellsOrderConditionType[] = ['TipoDoc' , 'Folio' , 'Fecha' , 'FechaEntrega' , 'ExpiredDays']

export type SellsFilterConditionType = 'TipoDoc' | 'Expired' | "Not Expired"
export const SellsFilterCondition : SellsFilterConditionType[] = ['TipoDoc', 'Expired', "Not Expired"]

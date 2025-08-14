import { CobranzaOrderConditionType } from "@/services/cobranza/cobranza.interface";

export const CobranzaOrderCondition = ['Nombre', 'ExpiredDays', 'SaldoVencido', 'SaldoNoVencido', 'TotalSaldo'] as const

export const CobranzaConditionObject: ReadonlyArray<{
    value: CobranzaOrderConditionType;
    label: string;
}> = [
    {
        value: 'Nombre',
        label: 'Nombre',
    },
    {
        value: 'SaldoVencido',
        label: 'Saldo Vencido',
    },
    {
        value: 'SaldoNoVencido',
        label: 'Saldo no vencido',
    },
    {
        value: 'TotalSaldo',
        label: 'Total de saldo',
    }
] as const;



export type CobranzaByClientOrderConditionByClientType = 'TipoDoc' | 'Folio' | 'Fecha' | 'ExpiredDays';
export const CobranzaByClientCondition = ['TipoDoc', 'Folio', 'Fecha', 'ExpiredDays'] as const;


export const CobranzaByClientConditionObject: ReadonlyArray<{
    value: CobranzaByClientOrderConditionByClientType;
    label: string;
}> = [
    {
        value: 'TipoDoc',
        label: 'Tipo documento',
    },
    {
        value: 'Folio',
        label: 'Folio',
    },
    {
        value: 'ExpiredDays',
        label: 'Días expirados',
    },
] as const;

export type typeTipoDoc = 0 | 1 | 2
export const TipoDoc: typeTipoDoc[] = [0, 1, 2];

export const TipoDocObject: ReadonlyArray<{
    value: typeTipoDoc;
    label: string;
}> = [
    {
        value: 0,
        label: 'Todos',
    },
    {
        value: 1,
        label: 'Facturas',
    },
    {
        value: 2,
        label: 'Remisión',
    }
] as const;

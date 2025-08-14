import { AbonosInterface } from "@/interface/abonos";

interface GetAbonosParams {
    PageNumber: number;
    limit?: number;
    filters: AbonosFilters;
};



interface AbonosFilters {
    orderField: AbonosOrderConditionType;
    orderDirection?: "asc" | "desc",
    Nombre: string;
};

//export type AbonosOrderConditionType = 'Nombre' | 'ExpiredDays' | 'SaldoVencido' | 'SaldoNoVencido' | 'TotalSaldo';
export type AbonosOrderConditionType = 'Folio' | 'Fecha'
export const AbonosOrderCondition = ['Fecha', 'Folio'] as const;

interface GetAbonosResponse {
    abonos: AbonosInterface[]
    total: number
}


export type {
    GetAbonosParams,
    GetAbonosResponse
}
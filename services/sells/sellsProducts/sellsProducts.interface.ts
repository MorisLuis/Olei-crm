import { SellsProductsInterface } from "@/interface/sells"
import { TotalsSellsProductsReponse } from "../sells.interface";


// PARAMS
interface GetSellsProductsParams {
    filters: SellsProductsFilters
};

interface GetSellsProductsPaginatedParams extends GetSellsProductsParams {
    PageNumber: number;
}


// RESPONSE
interface GetSellsProductsResponse {
    sells: SellsProductsInterface[]
};

interface GetSellsProductsCountAndTotalResponse {
    count: number;
    totals: TotalsSellsProductsReponse
};

interface SellsProductsFilters {
    Marca: string | null;
    Codigo: string | null;
    Descripcion: string | null;
    Sku: string | null;
    DateEnd?: string | null;
    DateExactly?: string | null;
    DateStart?: string | null;
    OrderCondition?: SellsProductsOrderConditionType
};

export type SellsProductsOrderConditionType = 'Folio' | 'Codigo' | 'Fecha' | 'Marca' | 'Descripcion';
export const SellsProductsOrderCondition: SellsProductsOrderConditionType[] = ['Folio', 'Codigo', 'Fecha', 'Marca', 'Descripcion']
export const SellsProductsConditionObject: ReadonlyArray<{
    value: SellsProductsOrderConditionType;
    label: string;
}> = [
    {
        value: 'Folio',
        label: 'Folio',
    },
    {
        value: 'Codigo',
        label: 'Codigo'
    },
    {
        value: 'Fecha',
        label: 'Fecha'
    },
    {
        value: 'Marca',
        label: 'Marca'
    },
    {
        value: 'Descripcion',
        label: 'Descripcion'
    }
] as const;



export type {
    GetSellsProductsParams,
    GetSellsProductsPaginatedParams,
    
    GetSellsProductsResponse,
    GetSellsProductsCountAndTotalResponse,

    // UTILS
    SellsProductsFilters
}
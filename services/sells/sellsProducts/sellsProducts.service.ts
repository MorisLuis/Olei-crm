import { api } from "@/api/api";
import { GetSellsProductsCountAndTotalResponse, GetSellsProductsPaginatedParams, GetSellsProductsParams, GetSellsProductsResponse } from "./sellsProducts.interface";


export const getSellsProducts = async (params: GetSellsProductsPaginatedParams): Promise<GetSellsProductsResponse> => {
    const { data } = await api.get<GetSellsProductsResponse>(`/api/sells/products/data`, {
        params: {
            PageNumber: params.PageNumber,
            ...params.filters,
        },
    });
    return { sells: data.sells };
};

export const getSellsProductsCountAndTotal = async (params: GetSellsProductsParams): Promise<GetSellsProductsCountAndTotalResponse> => {

    const { data: { count, totals } } = await api.get<GetSellsProductsCountAndTotalResponse>(`/api/sells/products/totals`, {
        params: {
            ...params.filters,
        },
    });
    return { count, totals }
};
import { api } from "@/api/api";
import { AbonosInterface } from "@/interface/abonos";
import { GetAbonosParams, GetAbonosResponse } from "./abonos.interface";


export const getAbonos = async (params: GetAbonosParams): Promise<GetAbonosResponse> => {

    const { PageNumber, limit = 10, filters } = params;

    // Extract order params
    const { orderField, orderDirection = "asc", ...filterFields } = filters;

    const filterField = Object.keys(filterFields)
        .filter(key => {
            const value = filterFields[key as keyof typeof filterFields];
            return value !== undefined && value !== "";
        })
        .join(", ");

    const filterValue = Object.values(filterFields)
        .filter(value => value !== undefined && value !== "")
        .join(", ");

    const queryParams = {
        PageNumber,
        limit,
        orderField,
        orderDirection,
        filterField,
        filterValue,
    };

    console.log({queryParams})
    const { data } = await api.get<{ abonos: AbonosInterface[]; total: number }>('/api/abonos', {
        params: queryParams,
    });

    console.log({data})

    return {
        abonos: data.abonos,
        total: data.total,
    };

};
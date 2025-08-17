import { AbonosOrderConditionType } from "@/app/dashboard/abonos/types";
import { AbonosInterface } from "@/interface/abonos";

interface GetAbonosParams {
    PageNumber: number;
    limit?: number;
    filters: AbonosFilters;
};

interface AbonosFilters {
    orderField: AbonosOrderConditionType;
    orderDirection?: "asc" | "desc",
    ['cliente.Nombre']: string;
};

interface GetAbonosResponse {
    abonos: AbonosInterface[]
    total: number
}


export type {
    GetAbonosParams,
    GetAbonosResponse
}
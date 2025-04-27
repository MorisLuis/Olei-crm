import { ClientOrderConditionType } from "@/interface/client";

interface getSellsInterface {
    PageNumber: number;
    filters: FilterClients;
};

interface getClientByIdInterface {
    Id_Almacen: string | number;
    Id_Cliente: string | number;
}

export const ClientConditionObject: ReadonlyArray<{
    value: ClientOrderConditionType;
    label: string;
}> = [
    {
        value: 'Nombre',
        label: 'Nombre',
    },
    {
        value: 'Id_Cliente',
        label: 'Id Cliente'
    }
] as const;

interface FilterClients {
    clientOrderCondition: string;
    termSearch: string;
}

export type {
    getSellsInterface,
    getClientByIdInterface
}
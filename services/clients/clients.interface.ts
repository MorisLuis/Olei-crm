
/* PARMS */
interface getClientsParams {
    PageNumber: number;
    limit?: number;
    filters: FilterClients;
};

/* FILTERS */
interface FilterClients {
    orderField: ClientOrderConditionType;
    orderDirection?: "asc" | "desc",
    Nombre: string;
    Id_Cliente?: string;
}

interface getClientByIdInterface {
    Id_Almacen: string | number;
    Id_Cliente: string | number;
}

type ClientOrderConditionType = 'Id_Cliente' | 'Nombre';
const ClientOrderCondition = ['Id_Cliente', 'Nombre'] as const;

const ClientConditionObject: ReadonlyArray<{
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


export {
    ClientOrderCondition,
    ClientConditionObject
}


export type {
    ClientOrderConditionType,
    getClientsParams,
    getClientByIdInterface
}
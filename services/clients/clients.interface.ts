
/* PARMS */
interface getSellsInterface {
    PageNumber: number;
    filters: FilterClients;
};

interface getClientByIdInterface {
    Id_Almacen: string | number;
    Id_Cliente: string | number;
}

/* FILTERS */
interface FilterClients {
    clientOrderCondition: ClientOrderConditionType;
    searchTerm: string;
    searchId?: string;
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
    getSellsInterface,
    getClientByIdInterface
}
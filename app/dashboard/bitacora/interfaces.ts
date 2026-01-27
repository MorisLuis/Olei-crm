
export type StatusTypes = 'Todos' | 'Cerrado' | 'Abierto';

export const StatusTypesObject: ReadonlyArray<{
    value: 0    | 1 | 2;
    label: StatusTypes;
}> = [
    {
        value: 0,
        label: 'Todos',
    },
    {
        value: 1,
        label: 'Cerrado',
    },
    {
        value: 2,
        label: 'Abierto'
    },
] as const;

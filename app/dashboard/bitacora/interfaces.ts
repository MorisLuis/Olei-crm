export type StatusTypes = 'Cerrado' | 'Abierto';

export const StatusTypesObject: ReadonlyArray<{
    value: number;
    label: StatusTypes;
}> = [
    {
        value: 0,
        label: 'Cerrado',
    },
    {
        value: 1,
        label: 'Abierto'
    },
] as const;

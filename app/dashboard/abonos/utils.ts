import { AbonosOrderConditionType } from "./types";

export const AbonosOrderCondition = ['cliente.Nombre', 'Fecha', 'Id_Cliente', 'Folio', 'forma_de_pago.Nombre'] as const

export const AbonosConditionObject: ReadonlyArray<{
    value: AbonosOrderConditionType;
    label: string;
}> = [
    {
        value: 'cliente.Nombre',
        label: 'Cliente',
    },
    {
        value: 'Fecha',
        label: 'Fecha',
    },
    {
        value: 'Id_Cliente',
        label: 'Id_Cliente',
    },
    {
        value: 'Folio',
        label: 'Folio',
    },
    {
        value: 'forma_de_pago.Nombre',
        label: 'Forma de pago',
    }
] as const;
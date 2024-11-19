import { FilterData } from "@/hooks/Filters/useFilters";
import { SellsFilterConditionType } from "@/interface/sells";


export const filtersSells : { value: SellsFilterConditionType, label: string }[] = [
    { value: 'Expired', label: 'Expiracion' },
    { value: 'TipoDoc', label: 'Tipo de documento' }
];

export const filtersOfSectionSells : FilterData[] = [
    {
        type: 'TipoDoc',
        data: [
            {
                filter: 'TipoDoc',
                value: 1, 
                label: 'Cotizacion'
            },
            {
                filter: 'TipoDoc',
                value: 2, 
                label: 'Remision'
            },
            {
                filter: 'TipoDoc',
                value: 3, 
                label: 'Factura'
            }
        ],
        value: ''
    },
    {
        type: 'Expired',
        data: [
            {
                filter: 'Expired',
                value: "Expired", 
                label: 'Expirado'
            },
            {
                filter: 'Not Expired',
                value: 'Not Expired', 
                label: 'No Expirado'
            }
        ],
        value: ''
    }
];
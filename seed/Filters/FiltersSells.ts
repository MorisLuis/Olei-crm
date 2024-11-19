import { FilterData } from "@/hooks/Filters/useFilters";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { fa0, faClock, faFile, faWalkieTalkie } from "@fortawesome/free-solid-svg-icons";

export type FilterSectionType = { value: string, label: string, icon?: IconDefinition };

export const filtersSells : FilterSectionType[] = [
    { value: 'Expired', label: 'Expiracion', icon: faClock },
    { value: 'TipoDoc', label: 'Tipo de documento', icon: faFile }
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
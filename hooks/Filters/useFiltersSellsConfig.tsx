import { FilterData, useFilters } from "@/hooks/Filters/useFilters";

export const useFiltersSellsConfig = () => {
    const { filtersActive } = useFilters();

    const filtersOfSectionSells: FilterData[] = [
        {
            type: 'Date',
            data: [],
            value: filtersActive.find((item) => item.filter === 'Date')?.value ?? ''
        },
        {
            type: 'TipoDoc',
            data: [
                { filter: 'TipoDoc', value: 1, label: 'Cotizacion' },
                { filter: 'TipoDoc', value: 2, label: 'Remision' },
                { filter: 'TipoDoc', value: 3, label: 'Factura' },
            ],
            value: filtersActive.find((item) => item.filter === 'TipoDoc')?.value ?? ''
        },
        {
            type: 'Expired',
            data: [
                { filter: 'Expired', value: "Expired", label: 'Expirado' },
                { filter: 'Not Expired', value: 'Not Expired', label: 'No Expirado' },
            ],
            value: filtersActive.find((item) => item.filter === 'Expired')?.value ?? ''
        }
    ];

    return { filtersOfSectionSells };
};

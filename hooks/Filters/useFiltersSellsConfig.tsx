import { FilterData } from "@/components/UI/FiltersComponent";
import { useFilters } from "@/hooks/Filters/useFilters";

export const useFiltersSellsConfig = () => {
    const { filtersActive } = useFilters();

    const filtersOfSectionSells: FilterData[] = [
        {
            type: 'TipoDoc',
            data: [
                { filter: 'TipoDoc', value: 1, label: 'Cotizacion' },
                { filter: 'TipoDoc', value: 2, label: 'Remision' },
                { filter: 'TipoDoc', value: 3, label: 'Factura' },
            ],
            value: filtersActive.find((item) => item.filterType === 'TipoDoc')?.filterValue ?? ''
        },
        {
            type: 'Expired',
            data: [
                { filter: 'Expired', value: "Expired", label: 'Expirado' },
                { filter: 'Not Expired', value: 'Not Expired', label: 'No Expirado' },
            ],
            value: filtersActive.find((item) => item.filterType === 'Expired')?.filterValue ?? ''
        }
    ];

    return { filtersOfSectionSells };
};

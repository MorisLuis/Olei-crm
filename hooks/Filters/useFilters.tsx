import { useState } from 'react';

// Define el tipo de filtro
type FilterType = {
    filterType: string;
    filter: string;
    filterValue: string | number;
};

type FilterObject = {
    label: string;
    value: string | number;
};


// Hook personalizado
export const useFilters = () => {

    const [filtersActive, setFiltersActive] = useState<FilterType[]>([]);

    // Función para seleccionar un valor de filtro
    const onSelectFilterValue = (filterObject: FilterObject, filterType: string) => {
        if (!filterObject) return;

        setFiltersActive((prevFilters) => {
            // Filtrar el arreglo para eliminar cualquier objeto con el mismo `filterType`
            const updatedFilters = prevFilters.filter(
                (filter) => filter.filterType !== filterType
            );

            // Agregar el nuevo objeto al arreglo actualizado
            return [...updatedFilters, { filterType, filter: filterObject.label, filterValue: filterObject.value }];
        });
    };

    const onDeleteFilter = (filterValue: string | number) => {
        setFiltersActive((prevFilters) => 
            prevFilters.filter((filter) => filter.filter !== filterValue)
        );
    };

    const filtersTag = filtersActive.map((item) => item.filter)

    return {
        filtersActive,
        filtersTag,
        onSelectFilterValue,
        onDeleteFilter
    };
};

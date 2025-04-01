import { useState } from 'react';

/* 
    HOW FILTERS WORKS
    1. useFiltersMeetingConfig are the filters showed in frontend.
    2. useFilters is a hook which handle the values of filtersActive ( select and delete ).
    3. ExecuteFiltersMeeting is how filters are sended in query.
*/

export type FilterObject = {
  filter: string;
  value: string | number;
  label: string;
};

export type FilterData = {
  type: string;
  data: FilterObject[];
  value?: string | number;
};

// Hook personalizado
export const useFilters = () => {
  const [filtersActive, setFiltersActive] = useState<FilterObject[]>([]);

  // Función para seleccionar un valor de filtro
  const onSelectFilterValue = ({
    filterObject,
    filterType,
  }: {
    filterObject?: FilterObject;
    filterType: string;
  }) => {
    if (!filterObject) {
      setFiltersActive((prevFilters) =>
        prevFilters.filter((filter) => filter.filter !== filterType)
      );
      return;
    }

    setFiltersActive((prevFilters) => {
      // Filtrar el arreglo para eliminar cualquier objeto con el mismo `filterType`
      const updatedFilters = prevFilters.filter((filter) => filter.filter !== filterType);

      // Agregar el nuevo objeto al arreglo actualizado
      return [
        ...updatedFilters,
        { label: filterObject.label, filter: filterType, value: filterObject.value },
      ];
    });
  };

  const onDeleteFilter = (filterValue: string | number) => {
    setFiltersActive((prevFilters) => prevFilters.filter((filter) => filter.label !== filterValue));
  };

  const filtersTag = filtersActive.map((item) => item.label);

  return {
    filtersActive,
    filtersTag,
    onSelectFilterValue,
    onDeleteFilter,
  };
};

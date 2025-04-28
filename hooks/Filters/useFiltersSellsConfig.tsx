import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock, faFile, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FilterData, useFilters } from '@/hooks/Filters/useFilters';
import { tipoDocMap, typeTipoDoc } from '@/services/sells/sells.interface';

export type typeLabelTipoDoc = (typeof tipoDocMap)[keyof typeof tipoDocMap];

export type FilterTipoDocType = { filter: 'TipoDoc'; value: typeTipoDoc; label: typeLabelTipoDoc };
export type FilterExpiredType = {
  filter: 'Expired' | 'Not Expired';
  value: 'Expired' | 'Not Expired';
  label: string;
};

export interface FilterDataSells extends Omit<FilterData, 'data'> {
  data: FilterTipoDocType[] | FilterExpiredType[];
}

export type FilterSectionType = { value: string; label: string; icon?: IconDefinition };

export const useFiltersSellsConfig = () => {
  const { filtersActive } = useFilters();

  const filtersSells: FilterSectionType[] = [
    { value: 'Date', label: 'Fecha', icon: faCalendar },
    { value: 'Expired', label: 'Expiracion', icon: faClock },
    { value: 'TipoDoc', label: 'Tipo de documento', icon: faFile },
  ];

  const getFilterValue = (filterType: string) =>
    filtersActive.find((item) => item.filter === filterType)?.value ?? '';

  const filtersOfSectionSells: FilterDataSells[] = [
    {
      type: 'Date',
      data: [], // No hay datos para este tipo
      value: getFilterValue('Date'),
    },
    {
      type: 'TipoDoc',
      data: [
        { filter: 'TipoDoc', value: 1, label: 'Facturas' },
        { filter: 'TipoDoc', value: 2, label: 'Remisión' },
        { filter: 'TipoDoc', value: 3, label: 'Pedidos' },
        { filter: 'TipoDoc', value: 4, label: 'Cotización' },
      ],
      value: getFilterValue('TipoDoc'),
    },
    {
      type: 'Expired',
      data: [
        { filter: 'Expired', value: 'Expired', label: 'Expirado' },
        { filter: 'Not Expired', value: 'Not Expired', label: 'No Expirado' },
      ],
      value: getFilterValue('Expired'),
    },
  ];

  return { filtersOfSectionSells, filtersSells };
};

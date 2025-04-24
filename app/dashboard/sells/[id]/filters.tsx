import { OrderObject } from '@/components/UI/OrderComponent';
import { FilterObject } from '@/hooks/Filters/useFilters';
import {
  SellsInterface,
  SellsOrderByClientCondition,
  SellsOrderConditionByClientType,
} from '@/interface/sells';
import { FilterSellsByClient } from '@/services/cobranza/cobranza.interface';

/* 
This are filters with the purpose of been used in query.
This values are different from the tags showed in the Header.
*/

interface executeFiltersSellsByClientInterface {
  orderActive: OrderObject;
  filtersActive: FilterObject[];
}

export const ExecuteFiltersSellsByClient = ({
  orderActive,
  filtersActive,
}: executeFiltersSellsByClientInterface) : FilterSellsByClient => {

  const FilterExpired = filtersActive.some((item) => item.value === 'Expired') ? 1 : 0;
  const FilterNotExpired = filtersActive.some((item) => item.value === 'Not Expired') ? 1 : 0;
  const TipoDoc =
    (filtersActive.find((item) => item.filter === 'TipoDoc')?.value as SellsInterface['TipoDoc']) ??
    0;
  let sellsOrderCondition: SellsOrderConditionByClientType;

  // Validar que el valor cumple con SellsOrderConditionByClientType
  if (
    typeof orderActive.order !== 'string' ||
    !SellsOrderByClientCondition.includes(orderActive.order as SellsOrderConditionByClientType)
  ) {
    sellsOrderCondition = 'Fecha';
  } else {
    sellsOrderCondition = orderActive.order as SellsOrderConditionByClientType;
  }

  const getDateValue = (filterName: string): string | undefined => {
    const value = filtersActive.find((item) => item.filter === filterName)?.value;
    return typeof value === 'string' && value !== 'undefined' ? value : undefined;
  };

  const DateExactly = getDateValue('Date');
  const DateStart = getDateValue('DateStart');
  const DateEnd = getDateValue('DateEnd');

  const filters: FilterSellsByClient = {
    FilterExpired,
    FilterNotExpired,
    TipoDoc,
    DateExactly,
    DateStart,
    DateEnd,
    sellsOrderCondition,
  };

  return filters;
};

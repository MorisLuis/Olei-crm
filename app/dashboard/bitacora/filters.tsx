import { OrderObject } from '@/components/UI/OrderComponent';
import { FilterObject } from '@/hooks/Filters/useFilters';
import {
  FiltersMeetings,
  MeetingOrderCondition,
  MeetingOrderConditionType,
  validTipoContacto,
} from '@/interface/meeting';

/* 
This are filters with the purpose of been used in query.
This values are different from the tags showed in the Header.
*/

interface executeFiltersMeetingByClientInterface {
  orderActive: OrderObject;
  filtersActive: FilterObject[];
}

export const ExecuteFiltersMeeting = ({
  orderActive,
  filtersActive,
}: executeFiltersMeetingByClientInterface) : FiltersMeetings => {
  const FilterCliente = filtersActive.some((item) => item.value !== 0 && item.filter === 'Cliente')
    ? 1
    : 0;
  const FilterTipoContacto = filtersActive.some((item) => item.filter === 'TipoContacto') ? 1 : 0;
  const TipoContacto = Number(
    filtersActive.find((item) => item.filter === 'TipoContacto')?.value ?? 0
  );
  let meetingOrderCondition: MeetingOrderConditionType;
  let TipoContactoValidated: FiltersMeetings['TipoContacto'] = 0;

  if (validTipoContacto.includes(TipoContacto as FiltersMeetings['TipoContacto'])) {
    TipoContactoValidated = TipoContacto as FiltersMeetings['TipoContacto'];
  }

  // Validar que el valor cumple con MeetingOrderConditionType
  if (
    typeof orderActive.order !== 'string' ||
    !MeetingOrderCondition.includes(orderActive.order as MeetingOrderConditionType)
  ) {
    meetingOrderCondition = 'Fecha';
  } else {
    meetingOrderCondition = orderActive.order as MeetingOrderConditionType;
  }

  const filters: FiltersMeetings = {
    FilterCliente,
    FilterTipoContacto,
    meetingOrderCondition,
    Id_Cliente: 0,
    TipoContacto: TipoContactoValidated,
  };

  return filters;
};

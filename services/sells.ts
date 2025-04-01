import { api } from '@/api/api';
import { OrderObject } from '@/components/UI/OrderComponent';
import OrderInterface from '@/interface/order';
import {
  FilterSellsByClient,
  SellsInterface,
  typeTipoDoc,
} from '@/interface/sells';

interface getSellsInterface {
  PageNumber: number;
  SellsOrderCondition: OrderObject;
}

export const getSells = async ({
  PageNumber,
  SellsOrderCondition
}: getSellsInterface): Promise<{ sells: SellsInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ sells: SellsInterface[] }>(
      `/api/sells?PageNumber=${PageNumber}&sellsOrderCondition=${SellsOrderCondition?.order}`
    );
    return { sells: data.sells };
  } catch (error) {
    return { sells: [], error };
  }
};

interface getSellsByClientInterface {
  client: number;
  PageNumber?: number;
  filters: FilterSellsByClient;
}

export const getSellsByClient = async ({
  client,
  PageNumber,
  filters,
}: getSellsByClientInterface): Promise<{ sells: SellsInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ sells: SellsInterface[] }>(
      `/api/sells/client/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`
    );
    return { sells: data.sells };
  } catch (error) {
    return { sells: [], error };
  }
};

interface getSellByIdInterface {
  Folio: string;
  Serie: string;
  Id_Almacen: number;
  TipoDoc: typeTipoDoc;
}

export const getSellById = async ({
  Folio,
  Serie,
  Id_Almacen,
  TipoDoc
}: getSellByIdInterface): Promise<{ sell?: SellsInterface, error?: unknown }> => {
  try {
    const { data } = await api.get<{ sell: SellsInterface }>(
      `/api/sells/${Folio}?Id_Almacen=${Id_Almacen}&TipoDoc=${TipoDoc}&Serie=${Serie}`
    );
    return { sell: data.sell };
  } catch (error) {
    return { sell: undefined, error };
  }
};


export const getTotalSellsByClient = async ({
  client,
  filters,
}: {
  client: number;
  filters: FilterSellsByClient;
}): Promise<{ total: number, error?: unknown }> => {
  try {
    const { data } = await api.get<{ total: number }>(
      `/api/sells/client/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`
    );
    return { total: data.total };
  } catch (error) {
    return { total: 0, error };
  }
};

export const getTotalSells = async (): Promise<{ total: number, error?: unknown }> => {
  try {
    const { data } = await api.get<{ total: number }>(`/api/sells/total`);
    return { total: data.total };
  } catch (error) {
    return { total: 0, error };
  }
};

interface getCobranzaInterface {
  client: number;
  PageNumber: number;
  filters: FilterSellsByClient;
}

export const getCobranza = async ({
  client,
  PageNumber,
  filters }
  : getCobranzaInterface): Promise<{ sells: SellsInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ sells: SellsInterface[] }>(
      `/api/sells/cobranza/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`
    );
    return { sells: data.sells };
  } catch (error) {
    return { sells: [], error };
  }
};

interface getTotalCobranzaInterface {
  client: number;
  filters: FilterSellsByClient;
}

export const getTotalCobranza = async ({
  client,
  filters
}: getTotalCobranzaInterface): Promise<{ total: number, error?: unknown }> => {
  try {
    const { data } = await api.get<{ total: number }>(
      `/api/sells/cobranza/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`
    );
    return { total: data.total };
  } catch (error) {
    return { total: 0, error };
  }
};


export const getSellDetails = async (
  { Folio, PageNumber, }
    : { Folio: string; PageNumber: number }
): Promise<{ orderDetails: OrderInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ orderDetails: OrderInterface[] }>(`/api/order/details?folio=${Folio}&PageNumber=${PageNumber}`);
    return { orderDetails: data.orderDetails };
  } catch (error) {
    return { error, orderDetails: [] };
  }
};

export const getTotalSellDetails = async (
  folio: string
): Promise<{ total: number, error?: unknown }> => {
  try {
    const { data } = await api.get<{ total: number }>(`/api/order/details/total?folio=${folio}`);
    return { total: data.total };
  } catch (error) {
    return { error, total: 0 };
  }
};

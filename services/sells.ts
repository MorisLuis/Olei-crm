import { api } from '@/api/api';
import { OrderObject } from '@/components/UI/OrderComponent';
import OrderInterface from '@/interface/order';
import {
  FilterSellsByClient,
  SellsDetailsInterface,
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
}: getSellsInterface): Promise<{ sells: SellsInterface[] }> => {
  const { data } = await api.get<{ sells: SellsInterface[] }>(
    `/api/sells?PageNumber=${PageNumber}&sellsOrderCondition=${SellsOrderCondition?.order}`
  );
  return { sells: data.sells };
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
}: getSellsByClientInterface): Promise<{ sells: SellsInterface[] }> => {
  const { data } = await api.get<{ sells: SellsInterface[] }>(
    `/api/sells/client/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`
  );
  return { sells: data.sells };
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
}: getSellByIdInterface): Promise<{ sell?: SellsInterface }> => {
  const { data } = await api.get<{ sell: SellsInterface }>(
    `/api/sells/${Folio}?Id_Almacen=${Id_Almacen}&TipoDoc=${TipoDoc}&Serie=${Serie}`
  );
  return { sell: data.sell };
};


export const getTotalSellsByClient = async ({
  client,
  filters,
}: {
  client: number;
  filters: FilterSellsByClient;
}): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(
    `/api/sells/client/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`
  );
  return { total: data.total };
};

export const getTotalSells = async (): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(`/api/sells/total`);
  return { total: data.total };
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
  : getCobranzaInterface): Promise<{ sells: SellsInterface[] }> => {
  const { data } = await api.get<{ sells: SellsInterface[] }>(
    `/api/sells/cobranza/${client}?PageNumber=${PageNumber}&FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`
  );
  return { sells: data.sells };
};

interface getTotalCobranzaInterface {
  client: number;
  filters: FilterSellsByClient;
}

export const getTotalCobranza = async ({
  client,
  filters
}: getTotalCobranzaInterface): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(
    `/api/sells/cobranza/total/${client}?FilterTipoDoc=${filters.FilterTipoDoc}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`
  );
  return { total: data.total };
};


export const getSellDetails = async (
  { Folio, PageNumber, }
    : { Folio: string; PageNumber: number }
): Promise<{ orderDetails: SellsDetailsInterface[] }> => {
  const { data } = await api.get<{ orderDetails: SellsDetailsInterface[] }>(`/api/order/details?folio=${Folio}&PageNumber=${PageNumber}`);
  return { orderDetails: data.orderDetails };
};

export const getTotalSellDetails = async (
  folio: string
): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(`/api/order/details/total?folio=${folio}`);
  return { total: data.total };
};

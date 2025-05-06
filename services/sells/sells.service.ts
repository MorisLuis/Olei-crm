import { api } from '@/api/api';
import {
  SellsDetailsInterface,
  SellsInterface
} from '@/interface/sells';
import {  GetSellByIdParams, GetSellsByClientParams, GetSellsParams, GetSellsResponse, SellsByClientFilters, TotalSellsResponse } from './sells.interface';



export const getSells = async (params: GetSellsParams): Promise<GetSellsResponse> => {
  const { data } = await api.get<GetSellsResponse>(`/api/sells`, {
    params: {
      PageNumber: params.PageNumber,
      ...params.filters,
    },
  });
  return { sells: data.sells, count: data.count, total: data.total };
};

export const getSellsByClient = async (params: GetSellsByClientParams): Promise<GetSellsResponse> => {

  const { filters, PageNumber } = params;
  const parametros = new URLSearchParams({
    PageNumber: String(PageNumber),
    FilterExpired: String(filters.FilterExpired ?? ''),
    FilterNotExpired: String(filters.FilterNotExpired ?? ''),
    TipoDoc: String(filters.TipoDoc ?? ''),
    DateEnd: filters.DateEnd || '',
    DateStart: filters.DateStart || '',
    DateExactly: filters.DateExactly || '',
    sellsOrderCondition: filters.sellsOrderCondition || '',
  });

  const { data } = await api.get<GetSellsResponse>(`/api/sells/client/${params.client}?${parametros.toString()}`);
  return { sells: data.sells, count: data.count, total: data.total };
};


export const getSellById = async ({
  Folio,
  Serie,
  Id_Almacen,
  TipoDoc
}: GetSellByIdParams ): Promise<{ sell?: SellsInterface }> => {
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
  filters: SellsByClientFilters;
}): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(
    `/api/sells/client/total/${client}&FilterExpired${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}`
  );
  return { total: data.total };
};

export const getTotalSells = async (): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(`/api/sells/total`);
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

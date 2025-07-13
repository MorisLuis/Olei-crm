import { api } from '@/api/api';
import {
  SellsDetailsInterface,
  SellsInterface
} from '@/interface/sells';
import { GetSellByIdParams, GetSellsByClientPaginatedParams, GetSellsByClientParams, GetSellsPaginatedParams, GetSellsParams, GetSellsResponse, GetSellsTotalResponse, SellsByClientFilters } from './sells.interface';



export const getSells = async (params: GetSellsPaginatedParams): Promise<GetSellsResponse> => {
  const { data } = await api.get<GetSellsResponse>(`/api/sells`, {
    params: {
      PageNumber: params.PageNumber,
      ...params.filters,
    },
  });
  return { sells: data.sells };
};

export const getSellsCountAndTotal = async (params: GetSellsParams): Promise<GetSellsTotalResponse> => {

  const { data: { count, total } } = await api.get<GetSellsTotalResponse>(`/api/sells/totals`, {
    params: {
      ...params.filters,
    },
  });
  return { count, total }
};

export const getSellsByClient = async (params: GetSellsByClientPaginatedParams): Promise<GetSellsResponse> => {
  const { data } = await api.get<GetSellsResponse>(`/api/sells/client/${params.client}`, {
    params: {
      PageNumber: params.PageNumber,
      ...params.filters
    }
  });

  return { sells: data.sells };
};


export const getSellsByClientCountAndTotal = async (params: GetSellsByClientParams): Promise<GetSellsTotalResponse> => {

  const { data: { count, total } } = await api.get<GetSellsTotalResponse>(`/api/sells/client/totals/${params.client}`, {
    params: {
      ...params.filters
    }
  });
  return { count, total };
};





export const getSellById = async ({ Folio, Serie, Id_Almacen, TipoDoc }: GetSellByIdParams): Promise<{ sell?: SellsInterface }> => {
  const { data } = await api.get<{ sell: SellsInterface }>(
    `/api/sells/${Folio}?Id_Almacen=${Id_Almacen}&TipoDoc=${TipoDoc}&Serie=${Serie}`
  );
  return { sell: data.sell };
};


export const getSellDetails = async ({ Folio, TipoDoc, PageNumber }: { Folio?: string; TipoDoc?: number; PageNumber: number }): Promise<{ orderDetails: SellsDetailsInterface[] }> => {
  const { data } = await api.get<{ orderDetails: SellsDetailsInterface[] }>(`/api/order/details?folio=${Folio}&PageNumber=${PageNumber}&TipoDoc=${TipoDoc}`);
  return { orderDetails: data.orderDetails };
};

export const getSellDetailsCount = async (
  folio: string
): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(`/api/order/details/total?folio=${folio}`);
  return { total: data.total };
};

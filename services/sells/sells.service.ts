import { api } from '@/api/api';
import {
  SellsDetailsInterface,
  SellsInterface
} from '@/interface/sells';
import { GetSellByIdParams, GetSellDetailsCountParams, GetSellsByClientPaginatedParams, GetSellsByClientParams, GetSellsPaginatedParams, GetSellsParams, GetSellsResponse, GetSellsTotalResponse, SellsByClientFilters, GetSellDetailsCountResponse, GetSellDetailsParams } from './sells.interface';



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


export const getSellById = async (params: GetSellByIdParams): Promise<{ sell?: SellsInterface }> => {
  const { data } = await api.get<{ sell: SellsInterface }>(
    `/api/sells/${params.Folio}`, {
    params: {
      ...params
    }
  });

  return { sell: data.sell };
};

export const getSellDetails = async (params: GetSellDetailsParams): Promise<{ orderDetails: SellsDetailsInterface[] }> => {
  const { data } = await api.get<{ orderDetails: SellsDetailsInterface[] }>(`/api/order/details`, {
    params: {
      ...params
    }
  });
  return { orderDetails: data.orderDetails };
};

export const getSellDetailsCount = async (params: GetSellDetailsCountParams): Promise<GetSellDetailsCountResponse> => {

  const { data } = await api.get<GetSellDetailsCountResponse>(`/api/order/details/total`, {
    params: {
      ...params
    }
  });

  return { total: data.total };
};

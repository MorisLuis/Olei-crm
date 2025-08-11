import { api } from '@/api/api';
import { ClientInterface } from '@/interface/client';
import { getClientByIdInterface, getClientsParams } from './clients.interface';


export const getClients = async (
  params: getClientsParams
): Promise<{ clients: ClientInterface[]; total: number }> => {
  const { PageNumber, limit = 10, filters } = params;

  // Extract order params
  const { orderField, orderDirection = "asc", ...filterFields } = filters;

  const filterField = Object.keys(filterFields)
    .filter(key => {
      const value = filterFields[key as keyof typeof filterFields];
      return value !== undefined && value !== "";
    })
    .join(", ");

  const filterValue = Object.values(filterFields)
    .filter(value => value !== undefined && value !== "")
    .join(", ");

  const queryParams = {
    PageNumber,
    limit,
    orderField,
    orderDirection,
    filterField,
    filterValue,
  };

  console.log({ queryParams })

  const { data } = await api.get<{ clients: ClientInterface[]; total: number }>('/api/client', {
    params: queryParams,
  });

  return {
    clients: data.clients,
    total: data.total,
  };
};




export const getClientById = async ({
  Id_Almacen,
  Id_Cliente
}: getClientByIdInterface): Promise<{ client?: ClientInterface }> => {
  const { data } = await api.get<{ client: ClientInterface }>(`/api/client/clientId?Id_Cliente=${Id_Cliente}&Id_Almacen=${Id_Almacen}`);
  return { client: data.client };
};

export const getTotalClients = async (): Promise<{ total: number }> => {
  const { data } = await api.get<{ total: number }>(`/api/client/total`);
  return { total: data.total };
};

export const searchClients = async (term: string): Promise<{ clients: ClientInterface[] }> => {
  const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/client/search?term=${term}`);
  return { clients: data.clients };
};

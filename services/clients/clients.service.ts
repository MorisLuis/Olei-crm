import { api } from '@/api/api';
import { ClientInterface } from '@/interface/client';
import { getClientByIdInterface, getSellsInterface } from './clients.interface';


export const getClients = async (params: getSellsInterface): Promise<{ clients: ClientInterface[], total: number }> => {
  const { data } = await api.get<{ clients: ClientInterface[], total: number }>(`/api/client`, {
    params: {
      PageNumber: params.PageNumber,
      ...params.filters,
    }
  });

  return { 
    clients: data.clients, 
    total: data.total 
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

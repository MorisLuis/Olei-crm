import { api } from '@/api/api';
import { OrderObject } from '@/components/UI/OrderComponent';
import { ClientInterface } from '@/interface/client';

interface getSellsInterface {
  PageNumber: number;
  ClientsOrderCondition: OrderObject;
}

export const getClients = async ({
  PageNumber,
  ClientsOrderCondition
}: getSellsInterface): Promise<{ clients: ClientInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/client?aPageNumber=${PageNumber}&clientOrderCondition=${ClientsOrderCondition?.order}`);
    return { clients: data.clients };
  } catch (error) {
    return { clients: [], error };
  }
};

interface getClientByIdInterface {
  Id_Almacen: string;
  Id_Cliente: string;
}

export const getClientById = async ({
  Id_Almacen,
  Id_Cliente
}: getClientByIdInterface): Promise<{ client?: ClientInterface, error?: unknown }> => {
  try {
    const { data } = await api.get<{ client: ClientInterface }>(`/api/client/clientId?Id_Cliente=${Id_Cliente}&Id_Almacen=${Id_Almacen}`);
    return { client: data.client };
  } catch (error) {
    return { client: undefined, error };
  }
};

export const getTotalClients = async (): Promise<{ total: number, error?: unknown }> => {
  try {
    const { data } = await api.get<{ total: number }>(`/api/client/total`);
    return { total: data.total };
  } catch (error) {
    return { total: 0, error };
  }
};

export const searchClients = async (term: string): Promise<{ clients: ClientInterface[], error?: unknown }> => {
  try {
    const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/client/search?term=${term}`);
    return { clients: data.clients };
  } catch (error) {
    return { clients: [], error };
  }
};

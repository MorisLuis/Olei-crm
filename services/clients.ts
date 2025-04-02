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
}: getSellsInterface): Promise<{ clients: ClientInterface[] }> => {
  const { data } = await api.get<{ clients: ClientInterface[] }>(`/api/client?PageNumber=${PageNumber}&clientOrderCondition=${ClientsOrderCondition?.order}`);
  return { clients: data.clients };
};

interface getClientByIdInterface {
  Id_Almacen: string | number;
  Id_Cliente: string | number;
}

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

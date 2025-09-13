import { api } from '@/api/api';
import { ClientInterface } from '@/interface/client';
import { getClientByIdInterface, getClientsParams, updateClientParams } from './clients.interface';


export const getClients = async (
  params: getClientsParams
): Promise<{ clients: ClientInterface[]; total: number }> => {

  const { data } = await api.get<{ clients: ClientInterface[]; total: number }>('/api/client', {
    params: {
      PageNumber: params.PageNumber,
      Id_Cliente: params.filters?.Id_Cliente,
      Nombre: params.filters?.Nombre,
      limit: params.limit || 10,
    },
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


export const updateClient = async (params: updateClientParams): Promise<{ cliente: ClientInterface }> => {
  const { Id_Cliente, Id_Almacen, clientBody } = params;

  const bodyToSend = {
    ...clientBody,
    UsuarioSQL: clientBody.TelefonoWhatsapp,
  };

  delete bodyToSend.TelefonoWhatsapp;
  
  const response = await api.put<{ client: ClientInterface }>(`/api/client/${Id_Cliente}?Id_Almacen=${Id_Almacen}`, bodyToSend);
  return { cliente: response.data.client };
}
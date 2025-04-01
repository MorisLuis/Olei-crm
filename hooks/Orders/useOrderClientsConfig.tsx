import { OrderObject } from '@/components/UI/OrderComponent';

export const useOrderClientsConfig = () => {
  const orderClients: OrderObject[] = [
    { order: 'Id_Cliente', value: 1, label: 'Id Cliente' },
    { order: 'Nombre', value: 2, label: 'Nombre' },
  ];

  return { orderClients };
};

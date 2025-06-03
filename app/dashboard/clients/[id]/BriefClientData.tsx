import { briefDataInterface } from '@/components/Cards/BriefCard';
import { ClientInterface } from '@/interface/client';
import { clientDetailsExample } from '@/seed/clientsData';

export const briefClientData = (Client: ClientInterface) : briefDataInterface[] => {
  const briefClientData: briefDataInterface[] = [
    { id: 1, label: 'Nombre', value: `${Client?.Nombre}` },
    { id: 2, label: 'RazonSocial', value: `${Client?.RazonSocial}` },
    { id: 3, label: 'Telefono 1', value: `${Client?.Telefono1}` },
    { id: 4, label: 'Telefono 2', value: `${Client?.Telefono2}` },
    { id: 5, label: 'Telefono Whatsapp', value: `${Client?.TelefonoWhatsapp?.trim()}` },
    { id: 6, label: 'Correo', value: `${Client?.CorreoVtas}` },
    {
      id: 7,
      label: 'Dirección',
      value: `${Client?.Calle || ''} ${Client?.NoExt ? `#${Client.NoExt}` : ''}, ${clientDetailsExample?.Colonia || ''}`,
    },
  ];

  return briefClientData;
};

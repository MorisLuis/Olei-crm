import { briefDataInterface } from "@/components/Cards/BriefCard";
import { ClientInterface } from "@/interface/client";
import { clientDetailsExample } from "@/seed/clientsData";

export const briefClientData = (Client: ClientInterface) => {

    const briefClientData: briefDataInterface[] = [
        { id: 1, label: 'Nombre', value: `${Client?.Nombre}` },
        { id: 2, label: 'RazonSocial', value: `${Client?.RazonSocial}` },
        { id: 3, label: 'Telefono', value: `${Client?.Telefono1}` },
        { id: 4, label: 'Correo', value: `${Client?.CorreoVtas}` },
        {
            id: 5,
            label: 'Dirección',
            value: `${Client?.Calle || ''} ${Client?.NoExt ? `#${Client.NoExt}` : ''}, ${clientDetailsExample?.Colonia || ''}`
        }];

    return briefClientData;
}
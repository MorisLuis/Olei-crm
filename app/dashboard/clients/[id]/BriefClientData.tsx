import { briefDataInterface } from "@/components/Cards/BriefCard";
import { clientDetailsExample } from "@/seed/clientsData";


export const briefClientData: briefDataInterface[] = [
    { id: 1, label: 'Nombre', value: `${clientDetailsExample?.Nombre ?? ''}` },
    { id: 2, label: 'RazonSocial', value: `${clientDetailsExample?.RazonSocial ?? 'N/A'}` },
    { id: 3, label: 'Telefono', value: `${clientDetailsExample?.Telefono1 ?? 'N/A'}` },
    { id: 4, label: 'Correo', value: `${clientDetailsExample?.CorreoVtas ?? 'N/A'}` },
    {
        id: 5,
        label: 'Dirección',
        value: `${clientDetailsExample?.Calle || ''} ${clientDetailsExample?.NoExt ? `#${clientDetailsExample.NoExt}` : ''}, ${clientDetailsExample?.Colonia || ''}`
    }
];
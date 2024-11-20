import { ColumnConfig } from "@/components/UI/Tables/Table";
import { ClientInterface } from "@/interface/client";

export const columnClients: ColumnConfig<ClientInterface>[] = [
    {
        key: 'Id_Cliente',
        label: 'Id_Cliente',
        render: (Id_Cliente) => <span>{Id_Cliente}</span>
    },
    {
        key: 'Nombre',
        label: 'Nombre',
        render: (Nombre) => <span style={{ fontWeight: 'bold' }}>{Nombre}</span>

    },
    {
        key: 'Telefono1',
        label: 'Telefono',
        render: (Telefono1) => <span>{Telefono1}</span>

    },
    {
        key: 'CorreoVtas',
        label: 'Correo',
        render: (CorreoVtas) => <span>{CorreoVtas}</span>
    },
];
import { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import { ClientInterface } from '@/interface/client';

export const columnClients: ColumnConfig<ClientInterface>[] = [
  {
    key: 'Id_Cliente',
    label: 'Id Cliente',
    render: (Id_Cliente) => <span>{Id_Cliente}</span>,
  },
  {
    key: 'Nombre',
    label: 'Nombre',
    render: (Nombre) => <span style={{ fontWeight: 'bold' }}>{Nombre}</span>,
  },
  {
    key: 'Telefono1',
    label: 'Telefono',
    render: (Telefono1) =>
      Telefono1 ? <span>{Telefono1}</span> : <Tag color="gray">Sin datos</Tag>,
  },
  {
    key: 'CorreoVtas',
    label: 'Correo',
    render: (CorreoVtas) =>
      CorreoVtas ? <span>{CorreoVtas}</span> : <Tag color="gray">Sin datos</Tag>,
  },
];

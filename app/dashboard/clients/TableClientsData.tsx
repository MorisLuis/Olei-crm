import { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import { ClientInterface } from '@/interface/client';
import styles from '../../../styles/Components/Table/Table.module.scss';

export const columnClients: ColumnConfig<ClientInterface>[] = [
  {
    key: 'Id_Cliente',
    label: 'Id Cliente',
    render: (Id_Cliente) => <span>{Id_Cliente}</span>,
  },
  {
    key: 'Nombre',
    label: 'Nombre',
    render: (Nombre) :JSX.Element => {

      const colors = [
        '#ff0000',
        '#068FFF',
        '#1F8A70',
        '#6F67DF',
        '#EDBD42',
        '#FF7F11',
        '#6A0DAD',
        '#008080',
        '#FF69B4',
        '#4B9D87',
      ];

      const getColor = (name: string): string => {
        const salt = name.length;
        const index = name
          .split('')
          .reduce((acc, char) => acc + char.charCodeAt(0), 0 + salt) % colors.length;
        return colors[index];
      };

      const backgroundColor = getColor(Nombre as string);

      return (
        <div className={styles.ClientName}>
          <span
            className={styles.ClientName__Avatar}
            style={{ backgroundColor }}
          >
            {(Nombre as string)?.charAt(0)}
          </span>
          <span style={{ fontWeight: 'bold' }}>{Nombre}</span>
        </div>
      );
    },
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

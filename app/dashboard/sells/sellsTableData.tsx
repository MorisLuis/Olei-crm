import { ColumnConfig } from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';

export const columnsSells: ColumnConfig<SellsInterface>[] = [
  {
    key: 'Id_Cliente',
    label: 'Id Cliente',
    render: (Id_Cliente) => <span>{Id_Cliente?.toString()}</span>,
  },
  {
    key: 'Nombre',
    label: 'Nombre',
    render: (Nombre) => <span style={{ fontWeight: 'bold' }}>{Nombre?.toString()}</span>,
  },
  {
    key: 'Subtotal',
    label: 'Subtotal',
    render: (Subtotal) => <span>{format(Subtotal as number)}</span>,
  },
  {
    key: 'Total',
    label: 'Total',
    render: (Total) => <span>{format(Total as number)}</span>,
  },
];

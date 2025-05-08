import { ColumnConfig } from '@/components/UI/Tables/Table';
import { Tag } from '@/components/UI/Tag';
import { SellsProductsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';
import { formatDate } from '@/utils/formatDate';

export const columnsSells: ColumnConfig<SellsProductsInterface>[] = [
  {
    key: 'Codigo',
    label: 'Codigo',
    render: (Codigo) => <span>{Codigo?.toString()}</span>,
  },
  {
    key: 'Descripcion',
    label: 'Descripcion',
    render: (Descripcion) => <span>{Descripcion?.toString()}</span>,
  },
  {
    key: 'Sku',
    label: 'Sku',
    render: (Sku) =>
      (Sku as string)?.trim() ? (<span>{Sku?.toString()}</span>) :
        (<Tag color="gray">No tiene SKU</Tag>),
  },
  {
    key: 'Marca',
    label: 'Marca',
    render: (Marca) => <span>{Marca?.toString()}</span>,
  },

  {
    key: 'Cantidad',
    label: 'Cantidad',
    render: (Cantidad) => <span>{format(Cantidad as number)}</span>,
  },
  {
    key: 'Precio',
    label: 'Precio',
    render: (Precio) => <span>{format(Precio as number)}</span>,
  },
  {
    key: 'Importe',
    label: 'Importe',
    render: (Importe) => <span>{format(Importe as number)}</span>,
  },
  {
    key: 'Impuesto',
    label: 'Impuesto',
    render: (Impuesto) => <span>{format(Impuesto as number)}</span>,
  },
  {
    key: 'Fecha',
    label: 'Fecha',
    render: (Fecha) => <span>{formatDate(Fecha as Date)}</span>,
  },
];

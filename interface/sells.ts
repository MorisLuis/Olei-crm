import { typeTipoDoc } from "@/services/sells/sells.interface";

export interface SellsInterface {
  UniqueKey?: string;
  Id_Cliente: number;
  Id_Almacen: number;
  TipoDoc: typeTipoDoc;
  Folio: number;
  Serie: string;
  Fecha: Date;
  Saldo: number;
  Total: number;
  Nombre: string;

  ExpiredDays?: number;
  Impuesto?: number;
  FechaLiq?: Date;
  Piezas?: number;

  Subtotal?: number;
};


export interface SellsDetailsInterface {
  Impuesto?: number | null;
  Id_Almacen: number;
  Id_ListaPrecios?: number | null;
  Folio: number;
  
  Id_Marca: number;
  Precio?: number | null;
  Cantidad?: number | null;
  Importe?: number | null;
  Descripcion?: string | null;
  Codigo: string;

  Marca?: string;
  Unidad?: string;

  TipoDoc: number;
  Serie: string;
  Partida: number;
  Costo?: number | null;
  Id_Unidad?: number | null;
  SwNs?: boolean | null;
  SKU?: string | null;
};

export interface SellsProductsInterface {
  Id_Almacen: number,
  TipoDoc: number,
  Folio: number,
  Partida: number,

  Codigo: string | null,
  Descripcion: string | null,
  Cantidad: number,
  Precio: number,
  Importe: number,
  Impuesto: number,
  Sku: string | null,
  Marca: string;
  Fecha: string | Date;
}


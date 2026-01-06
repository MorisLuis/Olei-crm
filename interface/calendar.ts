export interface CalendarInterface {
  Id_Cliente: number;
  Id_Bitacora?: number;
  Folio?: number;
  Id_Sell?: string;
  Fecha: Date;
  Descripcion?: string;
  TableType?: 'Bitacora' | 'Ventas';
}

export interface TimelineInterface {
  Id_Bitacora?: number;
  Folio?: number;
  Id_Sell?: string;
  Fecha: Date;
  TableType?: 'Bitacora' | 'Ventas';
  Hour?: string;
  Descripcion?: string;
  HourEnd?: string;
}

export interface TimelineMeetingInterface {
  id: string;
  start: string;
  end: string;
  title: string;
  extendedProps?: {
    Id_Bitacora: number | undefined;
  };
}

export interface CalendarInterface {
    Id_Cliente: number;
    Id_Bitacora?: number;
    Folio?: number,
    Id_Sell?: string;
    Fecha: Date;
    Titulo: string;
    TableType?: "Bitacora" | "Ventas";
}

export interface TimelineInterface {
    Id_Bitacora?: number;
    Folio?: number,
    Id_Sell?: string;
    Fecha: Date;
    Titulo: string;
    TableType?: "Bitacora" | "Ventas";
    Hour?: string;
    HourEnd?: string; 
}
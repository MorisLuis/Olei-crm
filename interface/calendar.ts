export interface CalendarInterface {
    Id_Bitacora?: number;
    Folio?: number,
    Id_Sell?: string;
    Fecha: Date;
    Title: string;
    TableType?: "Bitacora" | "Ventas";
}

export interface TimelineInterface {
    Id_Bitacora?: number;
    Folio?: number,
    Id_Sell?: string;
    Fecha: Date;
    Title: string;
    TableType?: "Bitacora" | "Ventas";
    Hour?: string;
    HourEnd?: string; 
}
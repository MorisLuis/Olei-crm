export interface CalendarInterface {
    Fecha: Date;
    Title: string;
    TableType?: "Bitacora" | "Ventas";
    id: number | string; /* The id is Id_Bitacora or Id_Ventas */
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
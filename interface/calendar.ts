export interface CalendarInterface {
    Fecha: Date;
    Title: string;
    TableType?: "Bitacora" | "Ventas";
    id: number | string; /* The id is Id_Bitacora or Id_Ventas */
}
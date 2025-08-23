export default interface MeetingInterface {
  Nombre: string; // Client name
  Id_Bitacora: number;
  Id_Almacen?: number;
  Id_Cliente?: number;
  Fecha: string | Date;
  Hour: string | undefined;
  HourEnd: string | undefined;
  Descripcion: string;
  TipoContacto: 0 | 1 | 2 | 3;
  Comentarios?: string;
  status: boolean
}
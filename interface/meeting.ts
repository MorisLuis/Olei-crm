export default interface MeetingInterface {
  Nombre: string;
  Id_Bitacora: number;
  Id_Almacen?: number;
  Id_Cliente?: number;
  Fecha: string | Date;
  Hour: string | undefined;
  HourEnd: string | undefined;
  Titulo: string;
  Descripcion: string;
  TipoContacto: 0 | 1 | 2 | 3 | 4;
  Comentarios?: string;
}
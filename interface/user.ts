export interface UserCRMInterface {
  Id: string;
  Nombre: string;
  Vigencia: string;
  TipoUsuario: string;
  Id_Almacen: number;
  Id_Usuario: string;
  CorreoVtas: string;
  from: 'web' | 'mobil' | 'crm';
  Id_Cliente: number;
  Id_UsuarioOOL: string
}

export type ValidationResult = {
  Tipo: 'usuario' | 'contrasena';
  Resultado: number;
};

export type MovementDetail = {
  Id_Perfil: number;
  InventarioW: boolean;
  TraspasosW: boolean;

  //Type of movement
  Descripcion: string;
  Id_TipoMovInv: number;
  Accion: number;
  Id_AlmDest: number;
};

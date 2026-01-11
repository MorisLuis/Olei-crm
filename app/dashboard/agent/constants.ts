import { InformeIAInterface } from "./types"

export const CATEGORIAS_OPTIONS = [
    { value: 1, label: 'General' },
    { value: 2, label: 'Compras' },
    { value: 3, label: 'Cobranza' },
    { value: 4, label: 'Ventas' },
    { value: 5, label: 'Cuentas por Cobrar' },
    { value: 6, label: 'Existencias e Inventario' },
    { value: 7, label: 'Catalogo Productos' },
    { value: 8, label: 'Catalogo Clientes' },
]

export const INITIAL_INFORMEIA: InformeIAInterface = {
    Titulo: '',
    Descripcion: '',
    Categoria: CATEGORIAS_OPTIONS[0],
    PeticionUsuario: ''
}

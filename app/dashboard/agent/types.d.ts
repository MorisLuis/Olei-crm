
export interface InformeIAFormProps {
    visible: boolean
    onClose: () => void
    queryId?: string
    prompt: string
}

export interface InformeIAInterface {
    Titulo: string
    Descripcion: string
    Categoria: {
        value: number
        label: string
    }
    PeticionUsuario: string
}

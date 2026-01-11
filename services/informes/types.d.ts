export interface CreateInformeIaProps {
    queryId?: string;
    body: {
        Titulo: string;
        Descripcion: string;
        Categoria: number;
    }
}
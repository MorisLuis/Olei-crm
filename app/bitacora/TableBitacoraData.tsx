import { ColumnConfig } from "@/components/UI/Tables/Table";
import MeetingInterface from "@/interface/meeting";


export const columnsBitacora: ColumnConfig<MeetingInterface>[] = [
    {
        key: 'Id_Bitacora',
        label: 'Id_Bitacora',
        render: (Id_Bitacora) => <span>{Id_Bitacora}</span>
    },
    {
        key: 'Descripcion',
        label: 'Descripcion',
        render: (Descripcion) => <span style={{ fontWeight: 'bold' }}>{Descripcion}</span>

    },
    {
        key: 'TipoContacto',
        label: 'TipoContacto',
        render: (TipoContacto) => <span>{TipoContacto}</span>

    },
    {
        key: 'Fecha',
        label: 'Fecha',
        render: (Fecha) => <span>{Fecha}</span>
    },
    {
        key: 'Hour',
        label: 'Hour',
        render: (Hour) => <span>{Hour}</span>
    },
];
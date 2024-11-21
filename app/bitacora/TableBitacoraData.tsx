import { ColumnConfig } from "@/components/UI/Tables/Table";
import { Tag } from "@/components/UI/Tag";
import MeetingInterface from "@/interface/meeting";
import { contactType } from "@/utils/contactType";


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
        render: (TipoContacto) => <Tag color={ 
            TipoContacto === 1 ? "blue" : 
            TipoContacto === 2 ? "green" :
            TipoContacto === 3 ? "red" : "yellow" 
        }>{contactType(TipoContacto as MeetingInterface['TipoContacto'])}</Tag>
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
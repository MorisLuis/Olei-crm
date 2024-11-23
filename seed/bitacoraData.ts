import MeetingInterface from "@/interface/meeting";


export const meetingsExamples: MeetingInterface[] = [
    {
        Id_Bitacora: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: '10Mayo2025',
        Hour: "4PM",
        Descripcion: "Reunion para avances",
        TipoContacto: 1
    },
    {
        Id_Bitacora: 2,
        Id_Almacen: 1,
        Id_Cliente: 2,
        Fecha: '2Diciembre2024',
        Hour: "7PM",
        Descripcion: "Reunion para negociar convenio",
        TipoContacto: 1
    },
    {
        Id_Bitacora: 3,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: '2Diciembre2024',
        Hour: "12PM",
        Descripcion: "Reunion para negociar algo diferente",
        TipoContacto: 2
    },
    {
        Id_Bitacora: 4,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: '21Diciembre2024',
        Hour: "12AM",
        Descripcion: "Llamada para platicar algo diferente",
        TipoContacto: 3
    },
    {
        Id_Bitacora: 5,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: '1Enero2025',
        Hour: "9AM",
        Descripcion: "Llamada para platicar algo diferente",
        TipoContacto: 3
    },
];

export const meetingExample: MeetingInterface =
    {
        Id_Bitacora: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: '10Mayo2025',
        Hour: "4PM",
        Descripcion: "Reunion para avances",
        TipoContacto: 1,
        Comentarios: "En esta reunion reunionreunionreunionreunion reunionreunionreunionreunion se platico de muchas cosas"
    }
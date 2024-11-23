import MeetingInterface from "@/interface/meeting";


export const meetingsExamples: MeetingInterface[] = [
    {
        Title: "primer titulo",
        Id_Bitacora: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: new Date(2025, 4, 10), // Meses empiezan en 0
        Hour: "4PM",
        Descripcion: "Reunion para avances",
        TipoContacto: 1
    },
    {
        Title: "segundo titulo",
        Id_Bitacora: 2,
        Id_Almacen: 1,
        Id_Cliente: 2,
        Fecha: new Date(2024, 11, 2),
        Hour: "7PM",
        Descripcion: "Reunion para negociar convenio",
        TipoContacto: 1
    },
    {
        Title: "tercer titulo",
        Id_Bitacora: 3,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: new Date(2024, 11, 2),
        Hour: "12PM",
        Descripcion: "Reunion para negociar algo diferente",
        TipoContacto: 2
    },
    {
        Title: "cuarto titulo",
        Id_Bitacora: 4,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: new Date(2024, 11, 21),
        Hour: "12AM",
        Descripcion: "Llamada para platicar algo diferente",
        TipoContacto: 3
    },
    {
        Title: "quinto titulo",
        Id_Bitacora: 5,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: new Date(2025, 0, 1),
        Hour: "9AM",
        Descripcion: "Llamada para platicar algo diferente",
        TipoContacto: 3
    },
];

export const meetingExample: MeetingInterface =
    {
        Title: "primer titulo",
        Id_Bitacora: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: new Date(2025, 0, 1),
        Hour: "4PM",
        Descripcion: "Reunion para avances",
        TipoContacto: 1,
        Comentarios: "En esta reunion reunionreunionreunionreunion reunionreunionreunionreunion se platico de muchas cosas"
    }
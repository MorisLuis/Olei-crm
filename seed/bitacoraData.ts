import MeetingInterface from "@/interface/meeting";

export const meetingsExamples: MeetingInterface[] = [
    {
        Title: "primer titulo",
        Id_Bitacora: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: new Date(2024, 10, 25), // Meses empiezan en 0
        Hour: "13:00:00",
        HourEnd: "15:00:00",
        Descripcion: "Reunion para avances",
        TipoContacto: 1
    },
    {
        Title: "segundo titulo",
        Id_Bitacora: 2,
        Id_Almacen: 1,
        Id_Cliente: 2,
        Fecha: new Date(2024, 10, 25), // Meses empiezan en 0
        Hour: "11:11:00",
        HourEnd: "14:40:00",
        Descripcion: "Reunion para negociar convenio",
        TipoContacto: 1
    },
    {
        Title: "tercer titulo",
        Id_Bitacora: 3,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Fecha: new Date(2024, 10, 2),
        Hour: "12:01:00",
        HourEnd: "14:40:00",
        Descripcion: "Reunion para negociar algo diferente",
        TipoContacto: 2
    },
    {
        Title: "cuarto titulo",
        Id_Bitacora: 4,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: new Date(2024, 10, 21),
        Hour: "23:22:00",
        HourEnd: "02:40:00",
        Descripcion: "Llamada para platicar algo diferente",
        TipoContacto: 3
    },
    {
        Title: "quinto titulo",
        Id_Bitacora: 5,
        Id_Almacen: 1,
        Id_Cliente: 3,
        Fecha: new Date(2025, 0, 1),
        Hour: "10:11:00",
        HourEnd: "12:40:00",
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
        Hour: "10:20",
        HourEnd: "02:40",
        Descripcion: "Reunion para avances",
        TipoContacto: 1,
        Comentarios: "En esta reunion reunionreunionreunionreunion reunionreunionreunionreunion se platico de muchas cosas"
    }
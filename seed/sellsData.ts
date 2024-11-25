import { SellsInterface } from "@/interface/sells";

// For enterprise
export const sellsExample: SellsInterface[] = [
    {
        UniqueKey: '1',
        Nombre: "Empresa 1",
        Id_Cliente: 1,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 101,
        Serie: '001',
        Fecha: new Date(2025, 4, 10),
        FechaEntrega: new Date(2024, 4, 10),
        Saldo: 100,
        Total: 120,
    },
    {
        UniqueKey: '2',
        Nombre: "Empresa 2",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 192,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: new Date(2024, 4, 10),
        Saldo: 1200,
        Total: 1340,
    },
    {
        UniqueKey: '3',
        Nombre: "Empresa 3",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 203,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: new Date(2024, 4, 10),
        Saldo: 1500,
        Total: 1500,
    },

];

// For client
export const sellsClientExample: SellsInterface[] = [
    {
        UniqueKey: '1',
        Nombre: "Charros SA DE CV",
        Id_Cliente: 1,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 101,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: new Date(2024, 10, 14),
        Saldo: 100,
        Total: 120,
        ExpiredDays: 10
    },
    {
        UniqueKey: '2',
        Nombre: "Carlos Vives",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 2,
        Folio: 192,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: new Date(2024, 10, 24),
        Saldo: 1200,
        Total: 1340,
        ExpiredDays: 0
    },
    {
        UniqueKey: '3',
        Nombre: "Ferreteria Garza",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 203,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: new Date(2024, 10, 23),
        Saldo: 1500,
        Total: 1500,
        ExpiredDays: 1
    },
    {
        UniqueKey: '3',
        Nombre: "Empresa 4",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 1,
        Folio: 204,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: null,
        Saldo: 1500,
        Total: 1500,
        ExpiredDays: 0
    },
    {
        UniqueKey: '2',
        Nombre: "Rosa Maria",
        Id_Cliente: 2,
        Id_Almacen: 1,
        TipoDoc: 1,
        Folio: 207,
        Serie: '001',
        Fecha: new Date(2024, 4, 10),
        FechaEntrega: null,
        Saldo: 1200,
        Total: 1340,
        ExpiredDays: 0
    },
];

export const sellDetailsExample: SellsInterface = {
    Id_Cliente: 1,
    Id_Almacen: 1,
    TipoDoc: 3,
    Folio: 102,
    Serie: 'A',
    Fecha: new Date(2025, 4, 10),
    FechaEntrega: new Date(2024, 4, 21),
    Saldo: 1200,
    Total: 1230,
    Impuesto: 120,
    Nombre: "Empresa 1",
    FechaLiq: new Date(2025, 2, 2),
    Piezas: 10
}
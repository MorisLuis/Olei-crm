import { SellsInterface } from "@/interface/sells";

export const sellsExample: SellsInterface[] = [
    {
        UniqueKey: '1',
        Nombre: "Empresa 1",
        Id_Cliente: 1,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 101,
        Serie: '001',
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
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
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
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
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
        Saldo: 1500,
        Total: 1500,
    },

];

export const sellsClientExample: SellsInterface[] = [
    {
        UniqueKey: '1',
        Nombre: "Empresa 1",
        Id_Cliente: 1,
        Id_Almacen: 1,
        TipoDoc: 3,
        Folio: 101,
        Serie: '001',
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
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
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
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
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
        Saldo: 1500,
        Total: 1500,
    },

];


export const sellDetailsExample: SellsInterface = {
    Id_Cliente: 1,
    Id_Almacen: 1,
    TipoDoc: 3,
    Folio: 102,
    Serie: 'A',
    Fecha: "10 Mayo 2025",
    FechaEntrega: "20 Mayo 2025",
    Saldo: 1200,
    Total: 1230,
    Impuesto: 120,
    Nombre: "Empresa 1",
    FechaLiq: "20 Mayo 2025",
    Piezas: 10
}
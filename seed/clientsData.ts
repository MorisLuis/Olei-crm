import { ClientInterface } from "@/interface/client";

export const clientsExample: ClientInterface[] = [
    {
        IdOLEI: 1,
        Id_Almacen: 1,
        Id_Cliente: 1,
        Nombre: "Empresa 1",
        RazonSocial: "Empresa No. 1",
        RFC: "ENOM019201",
        CURP: 'ENOM019201QQ3Q',
        Calle: 'Guadalupe Victoria',
        NoExt: '100',
        NoInt: '101',
        Colonia: "Las Puentes",
        Id_Ciudad: 1,
        CodigoPost: "54460",
        Telefono1: "891891891",
        CorreoVtas: "empresa1@gmail.com",
        Id_ListPre: 1,
        Id_AlmDest: 2,
        IsEmploye: false,
    },
    {
        IdOLEI: 2,
        Id_Almacen: 1,
        Id_Cliente: 2,
        Nombre: "Empresa 2",
        RazonSocial: "Empresa No. 2",
        RFC: "ENOM019202",
        CURP: 'ENOM019202QQ3Q',
        Calle: 'Revolución',
        NoExt: '200',
        NoInt: '201',
        Colonia: "Centro",
        Id_Ciudad: 2,
        CodigoPost: "54321",
        Telefono1: "892892892",
        CorreoVtas: "empresa2@gmail.com",
        Id_ListPre: 2,
        Id_AlmDest: 3,
        IsEmploye: false,
    },
    {
        IdOLEI: 3,
        Id_Almacen: 2,
        Id_Cliente: 3,
        Nombre: "Empresa 3",
        RazonSocial: "Empresa No. 3",
        RFC: "ENOM019203",
        CURP: 'ENOM019203QQ3Q',
        Calle: 'Insurgentes',
        NoExt: '300',
        NoInt: '301',
        Colonia: "San Pedro",
        Id_Ciudad: 3,
        CodigoPost: "56789",
        Telefono1: "893893893",
        CorreoVtas: "empresa3@gmail.com",
        Id_ListPre: 3,
        Id_AlmDest: 4,
        IsEmploye: true,
    },
    {
        IdOLEI: 4,
        Id_Almacen: 2,
        Id_Cliente: 4,
        Nombre: "Empresa 4",
        RazonSocial: "Empresa No. 4",
        RFC: "ENOM019204",
        CURP: 'ENOM019204QQ3Q',
        Calle: 'Constitución',
        NoExt: '400',
        NoInt: '401',
        Colonia: "El Refugio",
        Id_Ciudad: 4,
        CodigoPost: "67890",
        Telefono1: "894894894",
        CorreoVtas: "empresa4@gmail.com",
        Id_ListPre: 4,
        Id_AlmDest: 5,
        IsEmploye: false,
    },
];

export const clientsSelectExample: Partial<ClientInterface>[] = [
    {
        Nombre: "Empresa 1",
        Id_Cliente: 1,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Gamesa",
        Id_Cliente: 2,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Rosco",
        Id_Cliente: 3,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Mattel",
        Id_Cliente: 3,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Empresa 2",
        Id_Cliente: 4,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Flores",
        Id_Cliente: 5,
        Id_Almacen: 1,
        Id_ListPre: 1
    },
    {
        Nombre: "Alguna otra",
        Id_Cliente: 6,
        Id_Almacen: 1,
        Id_ListPre: 1
    }
]


export const clientDetailsExample: ClientInterface = {
    IdOLEI: 1,
    Id_Almacen: 1,
    Id_Cliente: 1,
    Nombre: "Empresa 1",
    RazonSocial: "Empresa No. 1",
    RFC: "ENOM019201",
    CURP: 'ENOM019201QQ3Q',
    Calle: 'Guadalupe Victoria',
    NoExt: '100',
    NoInt: '101',
    Colonia: "Las Puentes",
    Id_Ciudad: 1,
    CodigoPost: "54460",
    Telefono1: "891891891",
    CorreoVtas: "empresa1@gmail.com",
    Id_ListPre: 1,
    Id_AlmDest: 2,
    IsEmploye: false
}
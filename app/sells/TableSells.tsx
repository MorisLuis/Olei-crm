"use client"

import React from 'react'
import { MessageCard } from '@/components/Cards/MessageCard';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { SellsInterface } from '@/interface/sells';
import { format } from '@/utils/currency';

const sellsExample : SellsInterface[] = [
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
        Folio: 101,
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
        Folio: 101,
        Serie: '001',
        Fecha: '10Mayo2024',
        FechaEntrega: '10Mayo2024',
        Saldo: 1500,
        Total: 1500,
    },

]

export default function TableSells() {

    const totalSells = 10;

    const NoMoreProductToShow = sellsExample.length === totalSells;

    const loadMoreProducts = () => {

    }

    const columns: ColumnConfig<SellsInterface>[] = [
        {
            key: 'Id_Cliente',
            label: 'Id_Cliente',
            render: (Id_Cliente) => <span style={{ color: "black" }}>{Id_Cliente}</span>,
        },
        {
            key: 'Nombre',
            label: 'Nombre',
        },
        {
            key: 'Saldo',
            label: 'Saldo',
            render: (Saldo) => <span style={{ color: "black" }}>{format(Saldo as number)}</span>,

        },
        {
            key: 'Total',
            label: 'Total',
            render: (Total) => <span style={{ color: "black" }}>{format(Total as number)}</span>,
        },
    ];


    if (sellsExample?.length === 0) {
        return (
            <MessageCard title='No hay coincidencias exactas'>
                <p>Cambia o elimina algunos de los filtros o modifica el área de búsqueda.</p>
            </MessageCard>
        )
    };

    return (
        <Table
            columns={columns}
            data={sellsExample}
            noMoreData={NoMoreProductToShow}
            loadingMoreData={false}
            handleLoadMore={loadMoreProducts}
        />
    )
}

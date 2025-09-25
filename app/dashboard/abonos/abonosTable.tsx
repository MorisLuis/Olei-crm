'use client';

import { faFaceSadCry } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { MessageCard } from '@/components/Cards/MessageCard';
import TableSkeleton from '@/components/Skeletons/Tables/TableSkeleton';
import Table, { ColumnConfig } from '@/components/UI/Tables/Table';
import { AbonosInterface } from '@/interface/abonos';
import { format } from '@/utils/currency';
import styles from '../../../styles/Components/Table/Table.module.scss';

interface AbonosTableInterface {
    abonos: AbonosInterface[];
    totalAbonos: number;
    loadMoreProducts: () => void;
    handleSelectItem: (item: AbonosInterface) => void;

    isLoadingData: boolean;
    isFetchingNextPage: boolean;
    isLoadingUseQuery: boolean
}

export default function TableAbonos({
    abonos,
    totalAbonos,
    loadMoreProducts,
    handleSelectItem,
    isLoadingData,
    isFetchingNextPage,
    isLoadingUseQuery
}: AbonosTableInterface): JSX.Element {

    const NoMoreProductToShow = abonos?.length === totalAbonos || !totalAbonos || isLoadingUseQuery;
    const noCoincidenceItems = abonos?.length === 0 && !isLoadingData

    const columns: ColumnConfig<AbonosInterface>[] = [
        {
            key: 'Folio',
            label: 'Folio'
        },
        {
            key: 'Id_Cliente',
            label: 'Id_Cliente',
        },
        {
            key: 'cliente.Nombre',
            label: 'Cliente',
            render: (Nombre): JSX.Element => {

                const colors = [
                    '#ff0000',
                    '#068FFF',
                    '#1F8A70',
                    '#6F67DF',
                    '#EDBD42',
                    '#FF7F11',
                    '#6A0DAD',
                    '#008080',
                    '#FF69B4',
                    '#4B9D87',
                ];


                const getColor = (name: string | undefined): string => {
                    console.log({ name });

                    // Validar que colors esté definido y sea un array
                    if (!colors || colors.length === 0) {
                        console.error('Colors array is undefined or empty');
                        return 'defaultColor'; // Devuelve un color por defecto si colors no está definido
                    }

                    // Asegurarse de que name sea un string válido
                    const validName = typeof name === 'string' ? name : '';
                    const salt = validName.length;

                    const index = validName
                        .split('')
                        .reduce((acc, char) => acc + char.charCodeAt(0), 0 + salt) % colors.length;

                    return colors[index];
                };

                const backgroundColor = getColor(Nombre as string);

                return (
                    <div className={styles.ClientName}>
                        <span
                            className={styles.ClientName__Avatar}
                            style={{ backgroundColor }}
                        >
                            {(Nombre as string)?.charAt(0)}
                        </span>
                        <span style={{ fontWeight: 'bold' }}>{Nombre as string}</span>
                    </div>
                );
            },
        },
        {
            key: 'forma_de_pago',
            label: 'Forma de pago',
            render: (_, item) => <p>{item.forma_de_pago.Nombre}</p>,
        },
        {
            key: 'Importe',
            label: 'Importe',
            render: (_, item) => <p>{format(item.Importe)}</p>,
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            render: (_, item) => <p>{new Date(item.Fecha).toLocaleDateString()}</p>,
        }
    ];

    if (isLoadingData) {
        return <TableSkeleton columns={4} />
    }

    if (noCoincidenceItems) {
        return (
            <MessageCard
                title='No hay coincidencias exactas'
                icon={faFaceSadCry}
            >
                <p>Cambia o elimina algunos de los filtros.</p>
            </MessageCard>
        )
    }

    return (
        <Table
            columns={columns}
            data={abonos}
            handleLoadMore={loadMoreProducts}
            handleSelectItem={handleSelectItem}

            noMoreData={NoMoreProductToShow}
            loadingMoreData={isFetchingNextPage}
        />
    );
}

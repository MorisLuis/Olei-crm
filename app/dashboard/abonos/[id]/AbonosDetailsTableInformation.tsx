'use client';

import React from 'react'
import TableTertiarySkeleton from '@/components/Skeletons/Tables/TableTertiarySkeleton';
import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary';
import { AbonosInterface } from '@/interface/abonos';
import { formatDate } from '@/utils/format/formatDate';
import styles from '../../../../styles/pages/SellDetails.module.scss';

interface AbonosDetailsTableInformationInterface {
    abonoInformation?: AbonosInterface;
    isLoading: boolean
}

export default function AbonoDetailsTableInformation({
    abonoInformation,
    isLoading
}: AbonosDetailsTableInformationInterface) : JSX.Element {

    const columns: ColumnTertiaryConfig<AbonosInterface>[] = [
        {
            key: 'Folio',
            label: 'Folio',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Folio</p>
                </div>
            ),
        },
        {
            key: 'Id_Almacen',
            label: 'Almacen',
        },
        {
            key: 'cliente.Nombre',
            label: 'Cliente',
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha</p>
                </div>
            ),
            render: (Fecha) => (
                <div>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            ),
        },
        
    ];

    if (isLoading || !abonoInformation) {
        return <TableTertiarySkeleton columns={4} />
    }

    return (
        <TableTertiary
            columns={columns}
            data={abonoInformation}
        />
    )
}

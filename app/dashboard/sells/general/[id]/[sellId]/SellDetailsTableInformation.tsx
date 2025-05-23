'use client';

import React from 'react'
import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { SellsInterface } from '@/interface/sells';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/formatDate';
import styles from '../../../../../../styles/pages/SellDetails.module.scss';

interface SellDetailsTableInformationInterface {
    sellInformation?: SellsInterface
}

export default function SellDetailsTableInformation({
    sellInformation
}: SellDetailsTableInformationInterface) : JSX.Element {

    const { changeColor } = useTagColor();

    const columns: ColumnTertiaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Tipo de documento</p>
                </div>
            ),
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>,
        },
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
        {
            key: 'FechaEntrega',
            label: 'FechaEntrega',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha Entrega</p>
                </div>
            ),
            render: (FechaEntrega) => (
                <>
                    {FechaEntrega ? (
                        <div>
                            <p>{formatDate(FechaEntrega as Date)}</p>
                        </div>
                    ) : (
                        <Tag color="gray">Sin datos</Tag>
                    )}
                </>
            ),
        },
    ];


    if (!sellInformation) {
        return <p>Cargando...</p>;
    }

    return (
        <TableTertiary
            columns={columns}
            data={sellInformation}
        />
    )
}

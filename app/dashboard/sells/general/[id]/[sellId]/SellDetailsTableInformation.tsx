'use client';

import React from 'react'
import TableTertiarySkeleton from '@/components/Skeletons/Tables/TableTertiarySkeleton';
import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { SellsInterface } from '@/interface/sells';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/format/formatDate';
import styles from '../../../../../../styles/pages/SellDetails.module.scss';

interface SellDetailsTableInformationInterface {
    sellInformation?: SellsInterface;
    isLoading: boolean
}

export default function SellDetailsTableInformation({
    sellInformation,
    isLoading
}: SellDetailsTableInformationInterface) : JSX.Element {

    const { changeColor } = useTagColor();

    const columns: ColumnTertiaryConfig<SellsInterface>[] = [
        {
            key: 'Nombre',
            label: 'Client',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Cliente</p>
                </div>
            ),
        },
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
        
    ];

    if (isLoading || !sellInformation) {
        return <TableTertiarySkeleton columns={4} />
    }

    return (
        <TableTertiary
            columns={columns}
            data={sellInformation}
        />
    )
}

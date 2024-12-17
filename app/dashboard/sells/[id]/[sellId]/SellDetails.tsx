"use client"

import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary'
import { SellsInterface, TipoDoc, typeTipoDoc } from '@/interface/sells';
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { formatDate } from '@/utils/formatDate';
import { Tag } from '@/components/UI/Tag';
import { useTagColor } from '@/hooks/useTagColor';
import { docType } from '@/utils/docType';
import TableSellsDetailsClient from './TableSellsDetails';
import styles from '../../../../../styles/pages/SellDetails.module.scss'
import { getSellById, getSellDetails, getTotalSellDetails } from '@/services/sells';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';

export default function SellDetails() {

    const params = useParams();
    const searchParams = useSearchParams();
    const [sellInformation, setSellInformation] = useState<SellsInterface>()
    const { changeColor } = useTagColor()

    const Id_Cliente = Number(params.id);
    const Id_Almacen = Number(searchParams.get('Id_Almacen'));
    const TipoDocProp = Number(searchParams.get('TipoDoc'));
    const Serie = searchParams.get('Serie') ?? '';
    const Folio = searchParams.get('Folio');

    const getSellInformation = async () => {

        if (!Id_Cliente || !Id_Almacen || !TipoDocProp || !Serie || !Folio) {
            console.error("Error: Todos los parámetros son obligatorios.");
            return;
        }

        const isValidTipoDoc = (value: number): value is typeTipoDoc => {
            const validTipoDoc: typeTipoDoc[] = TipoDoc;
            return validTipoDoc.includes(value as typeTipoDoc);
        };

        if (!isValidTipoDoc(TipoDocProp)) {
            console.error("Error: TipoDoc inválido.");
            return;
        }

        const sellInformation = await getSellById({
            Id_Cliente,
            Id_Almacen,
            TipoDoc: TipoDocProp,
            Serie,
            Folio: Folio
        });

        setSellInformation(sellInformation)
    };

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getSellDetails({Folio: Folio as string, PageNumber: 1}),
        fetchPaginatedData: (_, nextPage) => getSellDetails({Folio: Folio as string, PageNumber: nextPage as number}),
        fetchTotalCount: () => getTotalSellDetails(Folio as string)
    })

    const columns: ColumnTertiaryConfig<SellsInterface>[] = [
        {
            key: 'TipoDoc',
            label: 'Tipo de documento',
            renderLabel: () => <div className={styles.sellItem}><p>Tipo de documento</p></div>,
            render: (_, item) => <Tag color={changeColor(item.TipoDoc)}>{docType(item.TipoDoc)}</Tag>
        },
        {
            key: 'Folio',
            label: 'Folio',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Folio</p>
                </div>
            )
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
            )
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
                    {
                        FechaEntrega ?
                            <div>
                                <p>{formatDate(FechaEntrega as Date)}</p>
                            </div>
                            :
                            <Tag color='gray'>Sin datos</Tag>
                    }
                </>
            )
        }
    ];

    useEffect(() => {
        if (!Id_Cliente || !Id_Almacen || !TipoDocProp || !Serie || !Folio) return;
        getSellInformation()
    }, [Id_Cliente, Id_Almacen, TipoDocProp, Serie, Folio]);

    useEffect(() => {
        if (!Folio) return;
        handleResetData()
    }, [Folio]);


    if (!sellInformation) {
        return (
            <p>Cargando...</p>
        )
    };

    return (
        <div className={styles.sellDetails}>
            <TableTertiary
                columns={columns}
                data={sellInformation}
            />

            <TableSellsDetailsClient
                sells={data}
                totalSells={total ?? 0}
                loadMoreProducts={handleLoadMore}
                buttonIsLoading={isButtonLoading}
                loadingData={isLoading}
                handleSelectItem={(item) => console.log({ item })}
            />

            <div className='none'>{Id_Almacen}</div>
        </div>
    )
}

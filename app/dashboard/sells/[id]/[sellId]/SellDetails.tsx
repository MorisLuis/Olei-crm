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

interface sellQueryInterface {
    Id_Cliente: number;
    Id_Almacen: number;
    TipoDocProp: SellsInterface['TipoDoc'];
    Serie: string;
    Folio: string;
}

export default function SellDetails() {

    const params = useParams();
    const searchParams = useSearchParams();
    const [sellInformation, setSellInformation] = useState<SellsInterface>()
    const { changeColor } = useTagColor();
    const Sellid = searchParams.get('sellId');
    const [Folio, setFolio] = useState<string>('')

    const getSellInformation = async ({
        Id_Cliente,
        Id_Almacen,
        TipoDocProp,
        Serie,
        Folio
    }: sellQueryInterface) => {

        const sellInformation = await getSellById({
            Id_Cliente,
            Id_Almacen,
            TipoDoc: TipoDocProp,
            Serie,
            Folio
        });

        setSellInformation(sellInformation)
    };

    const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } = useLoadMoreData({
        fetchInitialData: () => getSellDetails({ Folio: Folio, PageNumber: 1 }),
        fetchPaginatedData: (_, nextPage) => getSellDetails({ Folio: Folio, PageNumber: nextPage as number }),
        fetchTotalCount: () => getTotalSellDetails(Folio)
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

    const handleValidateQuery = async () => {
        const sellIdSplited = Sellid?.split("-");

        const Id_Cliente = params.id ? Number(params.id) : Number(searchParams.get('Id_Cliente'));
        const Id_Almacen = Number(sellIdSplited?.[0]);
        const TipoDocProp = Number(sellIdSplited?.[1]);
        const Serie = sellIdSplited?.[2] ?? '';
        const Folio = sellIdSplited?.[3];

        if (!Id_Almacen || !TipoDocProp || !Folio) {
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
        };

        setFolio(Folio)

        getSellInformation({
            Id_Cliente: Id_Cliente,
            Id_Almacen: Id_Almacen,
            TipoDocProp: TipoDocProp,
            Serie: Serie,
            Folio: Folio
        });
    }

    useEffect(() => {
        if (!Sellid) return;
        console.log({ Sellid })
        handleValidateQuery()
    }, [Sellid]);

    useEffect(() => {
        if (Folio === '' || Folio === undefined) return;
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
        </div>
    )
}

'use client';

import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { ErrorCard } from '@/components/Cards/ErrorCard';
import TableTertiary, { ColumnTertiaryConfig } from '@/components/UI/Tables/TableTertiary';
import { Tag } from '@/components/UI/Tag';
import { useLoadMoreData } from '@/hooks/useLoadMoreData';
import { useTagColor } from '@/hooks/useTagColor';
import { SellsDetailsInterface, SellsInterface } from '@/interface/sells';
import { typeTipoDoc } from '@/services/sells/sells.interface';
import { getSellById, getSellDetails, getTotalSellDetails } from '@/services/sells/sells.service';
import { TipoDoc } from '@/utils/constants/cobranza';
import { docType } from '@/utils/docType';
import { formatDate } from '@/utils/formatDate';
import TableSellsDetailsClient from './TableSellsDetails';
import styles from '../../../../../styles/pages/SellDetails.module.scss';

interface sellQueryInterface {
  Id_Almacen: number;
  TipoDocProp: SellsInterface['TipoDoc'];
  Serie: string;
  Folio: string;
}

export default function SellDetails() : JSX.Element {
  const [sellInformation, setSellInformation] = useState<SellsInterface>();
  const { changeColor } = useTagColor();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const [Folio, setFolio] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const getSellInformation = async ({
    Id_Almacen,
    TipoDocProp,
    Serie,
    Folio,
  }: sellQueryInterface) : Promise<void> => {
    const { sell } = await getSellById({
      Id_Almacen,
      TipoDoc: TipoDocProp,
      Serie,
      Folio,
    });

    setSellInformation(sell);
  };

  const fetchInitialData = useCallback(async (): Promise<SellsDetailsInterface[]> => {
    const { orderDetails } = await getSellDetails({ Folio: Folio, PageNumber: 1 })
    return orderDetails;
  }, [Folio]);

  const fetchPaginatedData = useCallback(async (_: unknown, page?: number): Promise<SellsDetailsInterface[]> => {
    const { orderDetails } = await getSellDetails({ Folio: Folio, PageNumber: page ?? 1 });
    return orderDetails;
  }, [Folio]);

  const fetchTotalCount = useCallback(async (): Promise<number> => {
    const { total } = await getTotalSellDetails(Folio);
    return total;
  }, [Folio])


  const { data, handleLoadMore, handleResetData, isLoading, isButtonLoading, total } =
    useLoadMoreData({
      fetchInitialData,
      fetchPaginatedData,
      fetchTotalCount
    });

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

  const handleValidateQuery = useCallback(async () => {
    if (!Sellid) return;
    const sellIdSplited = Sellid?.split('-');
    const Id_Almacen = Number(sellIdSplited?.[0]);
    const TipoDocProp = Number(sellIdSplited?.[1]);
    const Serie = sellIdSplited?.[2] ?? '';
    const Folio = sellIdSplited?.[3];

    if (Id_Almacen == null || TipoDocProp == null || Folio == null) {
      setError('Error: Todos los parámetros son obligatorios.');
      return;
    }

    const isValidTipoDoc = (value: number): value is typeTipoDoc => {
      const validTipoDoc: typeTipoDoc[] = TipoDoc;
      return validTipoDoc.includes(value as typeTipoDoc);
    };

    if (!isValidTipoDoc(TipoDocProp)) {
      setSellInformation(undefined);
      setError('Error: TipoDoc inválido.');
      return;
    }

    setFolio(Folio);

    getSellInformation({
      Id_Almacen: Id_Almacen,
      TipoDocProp: TipoDocProp,
      Serie: Serie,
      Folio: Folio,
    });

  }, [Sellid]);

  useEffect(() => {
    if (!Sellid) return;
    handleValidateQuery();
  }, [Sellid, handleValidateQuery]);

  useEffect(() => {
    if (Folio === '' || Folio === undefined) return;
    handleResetData();
  }, [Folio, handleResetData]);

  if (error) {
    return (
      <ErrorCard title="Hubo un error inesperado!" onClick={() => setError(null)}>
        <p>{error}</p>
      </ErrorCard>
    );
  }

  if (!sellInformation) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.sellDetails}>
      <TableTertiary columns={columns} data={sellInformation} />

      <TableSellsDetailsClient
        sells={data}
        totalSells={total ?? 0}
        loadMoreProducts={handleLoadMore}
        buttonIsLoading={isButtonLoading}
        loadingData={isLoading}
      />
    </div>
  );
}

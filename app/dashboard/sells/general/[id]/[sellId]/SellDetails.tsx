'use client';

import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import Custum500 from '@/components/500';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { SellsDetailsInterface, SellsInterface } from '@/interface/sells';
import { typeTipoDoc } from '@/services/sells/sells.interface';
import { getSellById, getSellDetails, getSellDetailsCount } from '@/services/sells/sells.service';
import { TipoDoc } from '@/utils/constants/cobranza';
import SellDetailsTableInformation from './SellDetailsTableInformation';
import TableSellsDetailsClient from './SellsDetailsTable';
import styles from '../../../../../../styles/pages/SellDetails.module.scss';

export default function SellDetails(): JSX.Element {
  const [sellInformation, setSellInformation] = useState<SellsInterface>();
  const searchParams = useSearchParams();
  const Sellid = searchParams.get('sellId');
  const [Folio, setFolio] = useState<string>();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<SellsDetailsInterface[]>([]);
  const [sellsCount, setSellsCount] = useState<number>()

  const { data, error, isLoading, refetch } =
    useQueryPaginationWithFilters<{ orderDetails: SellsDetailsInterface[] }, { PageNumber: number; }>(
      [`sell-${Sellid}`, page],
      ({ PageNumber }) => getSellDetails({ Folio: Folio, PageNumber }),
      { PageNumber: page },
      { enabled: !!Folio }
    );

  const handleGetTotals = useCallback(async (): Promise<void> => {
    if (!Folio) return
    const { total } = await getSellDetailsCount(Folio);
    setSellsCount(total);
  }, [Folio])

  const handleGetSellInformation = useCallback(async () => {
    if (!Sellid) return;
    const sellIdSplited = Sellid?.split('-');
    const Id_Almacen = Number(sellIdSplited?.[0]);
    const TipoDocProp = Number(sellIdSplited?.[1]);
    const Serie = sellIdSplited?.[2] ?? '';
    const Folio = sellIdSplited?.[3];

    if (Id_Almacen == null || TipoDocProp == null || Folio == null) {
      return;
    }

    const isValidTipoDoc = (value: number): value is typeTipoDoc => {
      const validTipoDoc: typeTipoDoc[] = TipoDoc;
      return validTipoDoc.includes(value as typeTipoDoc);
    };

    if (!isValidTipoDoc(TipoDocProp)) {
      setSellInformation(undefined);
      return;
    }

    setFolio(Folio);

    const { sell } = await getSellById({
      Id_Almacen,
      TipoDoc: TipoDocProp,
      Serie,
      Folio,
    });

    setSellInformation(sell);

  }, [Sellid]);

  useEffect(() => {
    handleGetTotals()
    handleGetSellInformation()
  }, [handleGetTotals, handleGetSellInformation])

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, []);

  useEffect(() => {
    if (data?.orderDetails) {
      setItems(prev => [...prev, ...data.orderDetails]);
    }
  }, [data]);

  if (error) return <Custum500 handleRetry={refetch} />;

  return (
    <div className={styles.sellDetails}>

      <SellDetailsTableInformation
        sellInformation={sellInformation}
      />

      <TableSellsDetailsClient
        sells={items}
        totalSells={sellsCount ?? 0}
        loadMoreProducts={() => setPage(p => p + 1)}
        buttonIsLoading={isLoading}
        loadingData={isLoading}
      />
    </div>
  );
}

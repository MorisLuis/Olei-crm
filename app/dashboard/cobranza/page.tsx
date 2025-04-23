
'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useQueryPaginationWithFilters } from '@/hooks/useQueryPaginationWithFilters';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaInterface } from '@/services/cobranza/cobranza.interface';
import { getCobranza } from '@/services/cobranza/cobranza.service';
import TableCobranza from './TableCobranzaByClient';
import Custum500 from '../500/page';

export default function Cobranza() : JSX.Element {

    const [page, setPage] = useState(1);
    const router = useRouter()
    const [items, setItems] = useState<CobranzaInterface[]>([]);
    const { filters, updateFilter } = useUrlFilters(CobranzaFilterSchema)

    const { data, error, isLoading, refetch } =
        useQueryPaginationWithFilters<{ cobranza: CobranzaInterface[] }, { PageNumber: number; filters: typeof filters }>(
            ['cobranza', page],
            ({ PageNumber, filters }) => getCobranza({ PageNumber, filters }),
            { PageNumber: page, filters }
        );

    const handleSelectItem = (item: CobranzaInterface) : void => {
        router.push(`/dashboard/cobranza/${item.Id_Cliente}?Id_Almacen=${item.Id_Almacen}`)
    }

    useEffect(() => {
        setPage(1);
        setItems([]);
    }, [filters]);

    useEffect(() => {
        if (data?.cobranza) {
            setItems(prev => [...prev, ...data.cobranza]);
        }
    }, [data]);

    if (error) return <Custum500 handleRetry={refetch} />;
    if (isLoading && items.length === 0) return <div>cargando...</div>;

    return (
        <div>
            <select
                value={filters.cobranzaOrderCondition}
                onChange={e =>
                    updateFilter('cobranzaOrderCondition', e.target.value as 'ExpiredDays' | 'SaldoVencido')
                }>
                <option value="Nombre">Nombre</option>
                <option value="ExpiredDays">Días expirados</option>
                <option value="SaldoVencido">Saldo vencido</option>
                <option value="SaldoNoVencido">Saldo no vencido</option>
                <option value="TotalSaldo">Total saldo</option>
            </select>

            <TableCobranza
                sells={items}
                totalSells={0}
                loadMoreProducts={() => setPage(p => p + 1)}
                handleSelectItem={handleSelectItem}
                buttonIsLoading={false}
                loadingData={isLoading}
            />
        </div>
    );
}

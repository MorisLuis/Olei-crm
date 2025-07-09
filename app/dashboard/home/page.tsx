'use client';

import { faDollarSign, faBoxesStacked, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

import StatCard from '@/components/Cards/StatCard';
import ChartWidget from '@/components/Charts/ChardWidget';
import Header from '@/components/navigation/header';
import { AuthContext } from '@/context/auth/AuthContext';
import { getStatisticsCRM } from '@/services/statistics/statistics';
import { getStatisticsCRMResponse } from '@/services/statistics/statistics.interface';
import styles from '@/styles/pages/Home.module.scss';
import { format } from '@/utils/currency';
import Calendar from '../calendar/page';

export default function Home(): JSX.Element {
  const { user } = useContext(AuthContext);
  const [statistics, setStatistics] = useState<getStatisticsCRMResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const getStats = async () : Promise<void> => {
    const data = await getStatisticsCRM();
    setStatistics(data);
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading || !statistics) {
    return <div className={styles.Home}>Cargando estadísticas...</div>;
  }

  return (
    <div className={styles.Home}>
      <Header title={`Hola ${user?.Nombre.trim() || 'Usuario'}!`} dontShowBack />

      <div className={styles.statsSections}>
        <div className={styles.statsSections__sells}>
          <ChartWidget
            data={statistics.sells}
            chartTitle='Ventas del mes'
            chartSubtitle="Ventas del dia"
            chartValue={format(statistics.sells[0].sellsByMonthCredit ?? 0)}
            chartSubValue={format(statistics.sellsToday.sellsTotal ?? 0)}
            chartMessage=''
            onClick={() => push('sells/general')}
          />
        </div>

        <div className={styles.statsSections__bitacora}>
          <StatCard
            title='Cuentas por cobrar del mes'
            value={format(statistics.cobranza.find((item) => item.type === 'MES')?.sumCobranza ?? 0)}
            icon={faDollarSign}
            message=''
            onClick={() => push('cobranza')}
          />
          <StatCard
            title='Cuentas por cobrar de hoy'
            value={format(statistics.cobranza.find((item) => item.type === 'HOY')?.sumCobranza ?? 0)}
            icon={faDollarSign}
            message=''
            onClick={() => push('cobranza')}
          />
          <StatCard
            title='Cuentas por cobrar totales'
            value={format(statistics.cobranza.find((item) => item.type === 'TOTAL')?.sumCobranza ?? 0)}
            icon={faBoxesStacked}
            message=''
            onClick={() => push('sells/products')}
          />
          <StatCard
            title='Cuentas por cobrar a vencer'
            value={format(statistics.cobranza.find((item) => item.type === 'HOY_FWD')?.sumCobranza ?? 0)}
            icon={faUserTie}
            message={`y ${format(statistics.cobranza.find((item) => item.type === 'HOY_FWD')?.sumCobranzaExpired ?? 0)} vencidos`}
            onClick={() => push('sells/general')}
          />
        </div>
      </div>

      <Calendar/>

    </div>
  );
}

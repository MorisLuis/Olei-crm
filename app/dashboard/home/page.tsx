'use client';

import { faDollarSign, faBoxesStacked, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

import StatCard from '@/components/Cards/StatCard';
import ChartWidget from '@/components/Charts/ChardWidget';
import HomeSkeleton from '@/components/Skeletons/pages/HomeSkeleton';
import Header from '@/components/navigation/header';
import { AuthContext } from '@/context/auth/AuthContext';
import { getStatisticsCRM } from '@/services/statistics/statistics';
import { getCurrentMonthRange } from '@/utils/getCurrentMonth';
import CalendarScreen from '../calendar/page';
import { format } from '@/utils/currency';
import { getStatisticsCRMResponse } from '@/services/statistics/statistics.interface';
import styles from '@/styles/pages/Home.module.scss';

export default function Home(): JSX.Element {
  const { user } = useContext(AuthContext);
  const [statistics, setStatistics] = useState<getStatisticsCRMResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();
  const { DateStart, DateEnd } = getCurrentMonthRange();

  const getStats = async () : Promise<void> => {
    const data = await getStatisticsCRM();
    setStatistics(data);
    setLoading(false);
  };

  useEffect(() => {
    getStats();
  }, []);

  if (loading || !statistics) {
    return <HomeSkeleton/>
  }

  return (
    <div className={styles.Home}>
      <Header title={`Hola ${user?.Nombre.trim() || 'Usuario'}!`} dontShowBack />

      <div className={styles.statsSections}>

        <div className={styles.statsSections__bitacora}>
          <StatCard
            title='Cobranza del mes'
            value={format(statistics.abonos.find((item) => item.type === 'MES')?.sumCobranza ?? 0)}
            icon={faDollarSign}
            message=''
            onClick={() => push(`abonos?DateStart=${DateStart}&DateEnd=${DateEnd}`)}
            style={{ backgroundColor: '#defff9' }}
          />
          <StatCard
            title='Cobranza de hoy'
            value={format(statistics.abonos.find((item) => item.type === 'HOY')?.sumCobranza ?? 0)}
            icon={faDollarSign}
            message=''
            onClick={() => push(`abonos?DateStart=${DateStart}&DateEnd=${DateEnd}`)}
            style={{ backgroundColor: '#dff4ff' }}
          />
          <StatCard
            title='Cuentas por cobrar totales'
            value={format(statistics.cobranza.find((item) => item.type === 'TOTAL')?.sumCobranza ?? 0)}
            icon={faBoxesStacked}
            message=''
            onClick={() => push('cobranza')}
            style={{ backgroundColor: '#fef8e5' }}

          />
          <StatCard
            title='Cuentas por cobrar a vencer'
            value={format(statistics.cobranza.find((item) => item.type === 'DESGLOSE')?.sumCobranza ?? 0)}
            icon={faUserTie}
            message={`y ${format(statistics.cobranza.find((item) => item.type === 'DESGLOSE')?.sumCobranzaExpired ?? 0)} vencidos`}
            onClick={() => push('cobranza')}
            style={{ backgroundColor: '#fff7f1' }}

          />
        </div>

        <div className={styles.statsSections__sells}>
          <div className={styles.content}>
          <ChartWidget
            data={statistics.sells}
            chartTitle='Ventas del mes'
            chartSubtitle="Ventas del dia"
            chartValue={format(statistics.sells[0].sellsTotal ?? 0)}
            chartSubValue={format(statistics.sellsToday.sellsTotal ?? 0)}
            chartMessage=''
            onClick={() => push(`sells/general?DateStart=${DateStart}&DateEnd=${DateEnd}`)}
          />
          </div>
        </div>
      </div>

      <CalendarScreen />

    </div>
  );
}

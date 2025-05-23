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
            chartValue={format(statistics.sells[0].sellsByMonth)}
            chartMessage=''
            onClick={() => push('sells/general')}
          />
        </div>

        <div className={styles.statsSections__bitacora}>
          <StatCard
            title='Cuentas por cobrar'
            value={format(statistics.cobranza[0].sumCobranza)}
            icon={faDollarSign}
            message='Solo esta semana'
            onClick={() => push('cobranza')}
          />
          <StatCard
            title='Cuentas por cobrar totales'
            value={format(statistics.cobranza[1].sumCobranza)}
            icon={faDollarSign}
            message='Incluidas las expiradas'
            onClick={() => push('cobranza')}
          />
          <StatCard
            title='Productos vendidos'
            value={statistics.productsSoldMonth}
            icon={faBoxesStacked}
            message='desde el inicio del mes a hoy'
            onClick={() => push('sells/products')}
          />
          <StatCard
            title='Clientes'
            value={statistics.sellerOfMonth}
            icon={faUserTie}
            message='desde el inicio del mes a hoy'
            onClick={() => push('sells/general')}
          />
        </div>
      </div>

      <Calendar/>

      {/* <section style={{ marginTop: 300 }}>
        <pre>{JSON.stringify(statistics, null, 2)}</pre>
      </section> */}
    </div>
  );
}

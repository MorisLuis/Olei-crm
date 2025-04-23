import Header from '@/components/navigation/header';
import { getBriefCRM } from '@/services/server/statistics';
import styles from '@/styles/pages/Clients.module.scss';

export default async function Home()  {
  const statistics = await getBriefCRM();

  return (
    <div className={styles.page}>
      <Header title="Inicio" dontShowBack />
      <section>
        <pre>{JSON.stringify(statistics, null, 2)}</pre>
      </section>
    </div>
  );
}

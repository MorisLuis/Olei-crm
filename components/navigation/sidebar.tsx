import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { screenData } from '@/database/screens';

import styles from '../../styles/Navigation/Sidebar.module.scss';

interface SidebarInterface {
  visible?: boolean;
}

export default function Sidebar({ visible }: SidebarInterface) : JSX.Element {

  const pathname = usePathname();
  const basePath = pathname.split('/')[2];

  return (
    <aside className={`${styles.sidebar} ${visible && `${styles.active}`}`}>
      <div className={styles.logoOlei}>
        {/* <Image src={logoOlei} alt={'olei crm'} width={100} height={200} priority /> */}
      </div>
      <nav>
        <ul>
          {screenData.slice(1, -2).map((item) => (
            <Link
              href={item.pathname}
              className={item.pathname.startsWith(`/dashboard/${basePath}`) ? styles.active : ''}
              key={item.id}
            >
              <FontAwesomeIcon icon={item.icon} className={`${styles.icon} icon`} />
              <p>{item.name}</p>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

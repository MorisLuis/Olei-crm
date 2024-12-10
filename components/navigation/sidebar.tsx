import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import logoOlei from '../../public/HORIZONTAL_COLOR PRINCIPAL.svg'
import Image from 'next/image';
import { screenData } from '@/database/screens';
import { usePathname } from 'next/navigation';
import styles from '../../styles/Navigation.module.scss'

interface SidebarInterface {
    visible?: boolean;
}

export default function Sidebar({
    visible
}: SidebarInterface) {

    const pathname = usePathname();
    const [basePath] = pathname.split('/').filter(Boolean);

    return (
        <aside className={`${styles.sidebar} ${visible && `${styles.active}`}`}>
            <div className={styles.logoOlei}>
                <Image
                    src={logoOlei}
                    alt={'olei crm'}
                    width={200}
                    height={200}
                    priority
                />
            </div>
            <nav>
                <ul>
                    {
                        screenData.slice(1, -2).map((item) =>
                            <Link href={item.pathname} className={`/${basePath}` === item.pathname ? styles.active : ''} key={item.id}>
                                <FontAwesomeIcon icon={item.icon} className={'icon'} />
                                <p>{item.name}</p>
                            </Link>
                        )
                    }
                </ul>

                <ul>
                    <Link href="/settings" className={pathname === '/settings' ? styles.active : ''}>
                        <FontAwesomeIcon icon={faGear} className={'icon'} />
                        <p>Configuración</p>
                    </Link>
                </ul>
            </nav>
        </aside>
    )
}

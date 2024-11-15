import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Navigation.module.scss';
import { usePathname } from 'next/navigation';
import { screenData } from '@/database/screens';

interface TopbarInterface {
    openMenu: () => void
}

export default function Topbar({
    openMenu
}: TopbarInterface) {

    const pathname = usePathname();
    const header = screenData.find((item) => item.pathname === pathname )

    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.menu} onClick={openMenu}>
                        <FontAwesomeIcon icon={faBars} style={{ width: "16px", height: "16px" }} />
                    </div>
                    <p className={styles.headertitle}>{header?.name}</p>
                </div>
                <div className={styles.right}>
                    <p>Acciones</p>
                </div>
            </div>
        </div>
    )
}

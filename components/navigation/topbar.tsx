import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { screenData } from '@/database/screens';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import styles from '../../styles/Navigation.module.scss';

interface TopbarInterface {
    openMenu: () => void
}

export default function Topbar({
    openMenu
}: TopbarInterface) {

    const pathname = usePathname();
    const { back } = useRouter()
    const { globalPathname } = useContext(SettingsContext);

    const [basePath, id] = pathname.split('/').filter(Boolean);
    const header = screenData.find((item) => item.pathname === `/${basePath}`);

    const handleGoBack = () => {
        if (!id) return;
        back()
    }

    const headerSubtitle = (id && globalPathname.pathname === basePath) ? ` / ${globalPathname.value}` : ''

    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.menu} onClick={openMenu}>
                        <FontAwesomeIcon icon={faBars} className={"icon"} />
                    </div>
                    <p className={styles.headertitle}>
                        <span onClick={handleGoBack}>{header?.name}</span>
                        {headerSubtitle}
                    </p>
                </div>
                <div className={styles.right}>
                    <div className={styles.profile} onClick={() => console.log(true)}>
                        <div className={styles.info}>
                            <p>Luce</p>
                        </div>
                        <div className={styles.circle}>
                            <p>L</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

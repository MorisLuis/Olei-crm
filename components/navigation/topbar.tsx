import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import styles from '../../styles/Navigation.module.scss';

interface TopbarInterface {
    openMenu: () => void
}

export default function Topbar({
    openMenu
}: TopbarInterface) {

    const { globalPathname } = useContext(SettingsContext);

    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.menu} onClick={openMenu}>
                        <FontAwesomeIcon icon={faBars} className={"icon"} />
                    </div>
                    <p className={styles.headertitle}>
                        {globalPathname}
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

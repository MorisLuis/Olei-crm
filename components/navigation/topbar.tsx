"use client";

import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { SettingsContext } from '@/context/Settings/SettingsContext';
import styles from '../../styles/Navigation.module.scss';
import { useRouter } from 'next/navigation';

interface TopbarInterface {
    openMenu: () => void
}

export default function Topbar({
    openMenu
}: TopbarInterface) {

    const { globalPathname } = useContext(SettingsContext);
    const [openMenuProfile, setOpenMenuProfile] = useState(false);
    const { push } = useRouter();

    const onLogOut = () => {
        push('/login')
    }

    const renderProfile = () => {
        return (
            <div className={styles.profile} onClick={() => setOpenMenuProfile(!openMenuProfile)}>
                <div className={styles.info}>
                    <p>Luce</p>
                </div>
                <div className={styles.circle}>
                    <p>L</p>
                </div>
            </div>
        )
    }

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
                    {renderProfile()}

                    {
                        openMenuProfile &&
                        <div className={styles.profileOptions}>
                            <div className={styles.profile__active}>
                                {renderProfile()}
                            </div>
                            <div className={styles.item} onClick={onLogOut}>
                                <p>Cerrar sesión</p>
                                <FontAwesomeIcon icon={faRightFromBracket} className={`${styles.itemicon} icon`} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

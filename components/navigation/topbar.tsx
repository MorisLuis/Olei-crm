'use client';

import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import styles from '../../styles/Navigation.module.scss';
import TopbarSkeleton from '../Skeletons/navigation/topbarSkeleton';

interface TopbarInterface {
  openMenu: () => void;
}

export default function Topbar({ openMenu }: TopbarInterface) : JSX.Element {

  const [openMenuProfile, setOpenMenuProfile] = useState(false);
  const { push } = useRouter();
  const { logoutUser, user } = useContext(AuthContext);

  const onLogOut = async () : Promise<void> => {
    await logoutUser();
    push('/login');
  };

  const renderProfile = ()  : JSX.Element => {

    if(!user?.Nombre) {
      return <TopbarSkeleton/>
    }

    return (
      <div className={styles.profile} onClick={() => setOpenMenuProfile(!openMenuProfile)}>
        <div className={styles.info}>
          <p>{user?.Nombre?.trim()}</p>
        </div>
        <div className={styles.circle}>
          <p>{user?.Nombre?.slice(0,1)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.menu} onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} className={'icon'} />
          </div>
        </div>

        <div className={styles.right}>
          {renderProfile()}

          {openMenuProfile && (
            <div className={styles.profileOptions}>
              <div className={styles.profile__active}>{renderProfile()}</div>
              <div className={styles.item} onClick={onLogOut}>
                <p>Cerrar sesión</p>
                <FontAwesomeIcon icon={faRightFromBracket} className={`${styles.itemicon} icon`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { IconDefinition, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import styles from '../../styles/Navigation.module.scss';
import HeaderSkeleton from '../Skeletons/navigation/headerSkeleton';
import ActionsComponent from '../UI/ActionsComponent';

export interface ActionsInterface {
  id: number;
  text: string;
  onclick: () => void;
  icon?: IconDefinition;
  color?: 'red' | 'black' | 'white' | 'blue' | 'yellow';
  notVsible?: boolean;
}

interface HeaderInterface {
  title?: string | null;
  actions?: ActionsInterface[];
  custumBack?: () => void;
  dontShowBack?: boolean;
  isLoading?: boolean
}

export default function Header({
  title,
  actions,
  custumBack,
  dontShowBack,
  isLoading = false
}: HeaderInterface): JSX.Element {

  const router = useRouter();
  const pathname = usePathname();
  const [basePath, id] = pathname.split('/').filter(Boolean);
  const goBack = custumBack ? custumBack : (): void => router.back();
  const Title = title === null ? 'Cargando...' : title ? title : 'Regresar';

  if (isLoading) {
    return (<HeaderSkeleton />)
  }

  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        {id && !dontShowBack && (
          <div className={`${styles.icon}`} onClick={goBack}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              className={`icon__small`}
            />
          </div>
        )}
        <h2>{Title}</h2>
        <div className="none">{basePath}</div>
      </div>
      <ActionsComponent actions={actions} />
    </div>
  );
}

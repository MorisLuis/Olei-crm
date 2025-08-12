import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { MessageCard } from './MessageCard';
import styles from '../../styles/Components/Cards.module.scss';

import BriefCardSkeleton from '../Skeletons/Cards/BriefCardSkeleton';
import { Tag } from '../UI/Tag';

export interface briefDataInterface {
  id: number;
  label: string;
  value: string;
}

interface BriefCardInterface {
  data: briefDataInterface[] | null;
  header?: string;
  isLoading: boolean;

  headerAction?: () => void;
}

export default function BriefCard({ data, header = 'Resumen', isLoading, headerAction }: BriefCardInterface): JSX.Element {

  if (isLoading) {
    return ( <BriefCardSkeleton/> );
  }

  if (!data) {
    return (
      <MessageCard title="No hay información." icon={faAddressCard}>
        <p>No se encontro información de este usuario</p>
      </MessageCard>
    );
  }

  return (
    <div className={styles.BriefCard}>

      <div className={styles.BriefCard__header}>
        <h3>{header}</h3>
        <FontAwesomeIcon icon={faPenToSquare} className={`${styles.edit} icon`} onClick={headerAction}/>      </div>

      <div className="divider small"></div>

      {data.map((item) => (
        <div key={item.id} className={styles.BriefCard__data}>
          <div className={styles.dataItem}>
            <label>{item.label}</label>
            {item.value && item.value !== 'null' ? (<p>{item.value}</p>) : (<Tag color="gray">Sin datos</Tag>)}
          </div>
          <div className={`${styles.dividerLocal} divider small`}></div>
        </div>
      ))}
    </div>
  );
}

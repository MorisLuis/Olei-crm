import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import styles from '../../styles/Components/Cards.module.scss';

interface Props {
  children: ReactNode;
  title: string;
  onClick: () => void;
}

export const ErrorCard = ({ children, title, onClick }: Props) : JSX.Element => {
  return (
    <div className={styles.ErrorCard}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faBomb} className={`icon`} />
      </div>
      <h2>{title}</h2>
      <div className={styles.paragraph}>{children}</div>
      <button className="button-small blue" onClick={onClick}>
        Regresar
      </button>
    </div>
  );
};

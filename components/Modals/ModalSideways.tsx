import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useState } from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import styles from '../../styles/Modal.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  renderFooter?: ReactNode;
  extraClassName?: string;
  modalSize?: 'primary' | 'secondary';
}

const ModalSideways = ({
  visible,
  onClose,
  children,
  renderFooter,
  modalSize = 'primary',
}: Props) : JSX.Element | null=> {
  const [closing, setClosing] = useState(false);
  useLockBodyScroll(visible);

  const handleCloseModal = () : void => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  return visible ? (
    <>
      <div
        className={`${styles.modalBackground} ${closing ? styles.closing : ''}`}
        onClick={onClose}
      ></div>

      <div
        className={`${styles.ModalSideways} ${styles[modalSize]} ${closing ? styles.closing : ''}`}
      >
        <div className={styles.header}>
          <div className={styles.close} onClick={handleCloseModal}>
            <FontAwesomeIcon icon={faAnglesRight} className={`icon`} />
            <p>Cerrar</p>
          </div>
        </div>

        <div className={styles.content}>{children}</div>

        {renderFooter && <div className={styles.footer}>{renderFooter}</div>}
      </div>
    </>
  ) : null;
};

export default ModalSideways;

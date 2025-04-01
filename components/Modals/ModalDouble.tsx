import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, useState } from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import styles from '../../styles/Modal.module.scss';
import ButtonSmall from '../Buttons/ButtonSmall';

interface Action {
  action: () => void;
  label: string;
}

interface Props {
  visible: boolean;
  visibleSecondModal: boolean;
  children: React.ReactNode;
  childrenSecondModal: React.JSX.Element;
  title?: string;
  modalBlack?: boolean;
  onClose: () => void;
  onCloseSecondModal: () => void;
  extraStyles?: CSSProperties;
  actionsBottom?: {
    action1: Action;
    action2: Action;
  };
}

const ModalDouble: React.FC<Props> = ({
  visible,
  visibleSecondModal,
  children,
  childrenSecondModal,
  title = '',
  modalBlack = false,
  onClose,
  onCloseSecondModal,
  extraStyles,
  actionsBottom,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  useLockBodyScroll(visible);

  const handleClose = () : void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const renderFooter = () : JSX.Element | null => {
    if (!actionsBottom) return null;

    const { action1, action2 } = actionsBottom;
    return (
      <div className={styles.footer}>
        <ButtonSmall text={action1.label} onClick={action1.action} transparent />
        <ButtonSmall
          text={action2.label}
          onClick={action2.action}
          extraStyles={{ width: '30%' }}
          color="blue"
        />
      </div>
    );
  };

  if (!visible) return null;

  const modalBackgroundClass = modalBlack
    ? styles.modalBackgroundSecondary
    : styles.modalBackground;

  return (
    <>
      <div className={modalBackgroundClass} onClick={handleClose}></div>

      <div
        className={`${styles.ModalDouble} ${isClosing ? styles.closing : ''} ${
          visibleSecondModal ? styles.active : ''
        }`}
        style={extraStyles}
      >
        <div className={styles.primary}>
          <header className={styles.header}>
            <div className={styles.left}>{title && <h3>{title}</h3>}</div>
            <div className={`${styles.close} cursor`} onClick={handleClose}>
              <FontAwesomeIcon icon={faClose} className="icon" />
            </div>
          </header>

          <div className={styles.content}>{children}</div>

          {renderFooter()}
        </div>

        {visibleSecondModal && (
          <>
            <div
              className={`${styles.modalBackground} ${styles.modalInDouble}`}
              onClick={onCloseSecondModal}
            ></div>
            <div className={styles.secondary}>
              <header className={styles.header}>
                <div className={`${styles.close} cursor`} onClick={onCloseSecondModal}>
                  <FontAwesomeIcon icon={faClose} className="icon" />
                </div>
              </header>
              <div className={styles.content}>{childrenSecondModal}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ModalDouble;

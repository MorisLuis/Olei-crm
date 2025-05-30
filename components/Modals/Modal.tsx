import { faExpand, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, useState } from 'react';
import styles from '../../styles/Modal.module.scss';
import ButtonSmall from '../Buttons/ButtonSmall';
import AnimatedHeightWrapper from '../UI/AnimatedHeightWrapper';

interface Props {
  visible: boolean;
  children: React.ReactNode;
  title: string;

  //Conditions
  modalSize?: 'medium' | 'small' | 'normal';
  actionsVisible?: boolean;
  modalBlack?: boolean;

  //Methods
  onClose: () => void;
  handleActionTopOne?: () => void;
  handleActionTopTwo?: () => void;
  extraStyles?: CSSProperties;

  actionsBottom?: {
    action1: {
      action: () => void;
      label: string;
    };
    action2: {
      action: () => void;
      label: string;
      disabled: boolean;
    };
  };

  finalHeight?: number | 'content';
}

const Modal = ({
  visible,
  children,
  title = '',

  modalSize = 'normal',
  actionsVisible = false,
  modalBlack = false,

  onClose,
  handleActionTopOne,
  handleActionTopTwo,
  extraStyles,
  actionsBottom,

  finalHeight
}: Props): JSX.Element | null => {

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (): void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const renderActions = (): JSX.Element => (
    <div className={styles.topactions}>
      <ButtonSmall
        text="Expandir"
        onClick={() => handleActionTopOne?.()}
        icon={faExpand}
        color="blue"
      />

      <ButtonSmall
        text="Usar en carrito"
        onClick={() => handleActionTopTwo?.()}
        icon={faExpand}
        color="blue"
      />
    </div>
  );

  const renderFooter = (): JSX.Element | null =>
    actionsBottom ? (
      <div className={styles.footer}>
        <ButtonSmall
          text={actionsBottom.action1.label}
          onClick={actionsBottom.action1.action}
          transparent
        />

        <ButtonSmall
          text={actionsBottom.action2.label}
          onClick={actionsBottom.action2.action}
          disabled={actionsBottom.action2.disabled}
          extraStyles={{ width: '30%' }}
          color="blue"
        />
      </div>
    ) : null

  return visible ? (
    <>
      {!modalBlack ? (
        <div className={styles.modalBackground} onClick={handleClose}></div>
      ) : (
        <div className={styles.modalBackgroundSecondary} onClick={handleClose}></div>
      )}

      <div
        className={`${styles.Modal} ${styles[modalSize]} ${isClosing ? styles.closing : ''}`}
        style={extraStyles}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.left}>
              {title && <h3>{title}</h3>}
              {actionsVisible && renderActions()}
            </div>

            <div className={`${styles.close} cursor`} onClick={handleClose}>
              <FontAwesomeIcon icon={faClose} className={'icon'} />
            </div>
          </div>

          <AnimatedHeightWrapper isActive={visible} finalHeight={finalHeight}>
            <div className={styles.content}>{children}</div>
          </AnimatedHeightWrapper>

          {renderFooter()}
        </div>
      </div>
    </>
  ) : null;
};

export default Modal;

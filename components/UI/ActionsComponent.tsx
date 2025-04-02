'use client';

import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styles from '../../styles/Actions.module.scss';
import ButtonSmall from '../Buttons/ButtonSmall';
import { ActionsInterface } from '../navigation/header';

interface ActionsComponentInterface {
  actions?: ActionsInterface[];
}

export default function ActionsComponent({ actions }: ActionsComponentInterface): JSX.Element{
  const [modalOpen, setModalOpen] = useState(false);

  console.log({actions})

  return (
    <div className={styles.actions}>
      <div className={styles.buttons}>
        {actions?.map((item) => (
          <ButtonSmall
            text={item.text}
            onClick={item.onclick}
            key={item.id}
            color={item.color ?? 'white'}
            disabled={item.notVsible}
          />
        ))}
      </div>

      <div className={styles.buttonsMobile}>
        {actions?.length === 1 ? (
          <ButtonSmall
            text={actions[0].text}
            onClick={actions[0].onclick}
            key={actions[0].id}
            color={actions[0].color ?? 'white'}
          />
        ) : actions && actions?.length >= 1 ? (
          <div className={styles.hamburguer} onClick={() => setModalOpen(!modalOpen)}>
            <FontAwesomeIcon icon={faEllipsis} className={`${styles.icon} icon__small`} />
          </div>
        ) : (
          <></>
        )}
      </div>

      {modalOpen && (
        <div className={styles.modalActions}>
          <div className={styles.actionsList}>
            {actions?.map((option, index) => (
              <div key={index} className={styles.actionItem} onClick={option.onclick}>
                {option.icon && (
                  <FontAwesomeIcon icon={option.icon} className={styles.filterItem__icon} />
                )}
                <p>{option.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

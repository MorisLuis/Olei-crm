import React from 'react';
import styles from '../../styles/Components/Cards.module.scss';
import ButtonSmall from '../Buttons/ButtonSmall';
import ToggleSwitch from '../Inputs/toggleSwitch';

interface ActionCardInterface {
  title: string;
  subtitle: string;

  color?: 'red' | 'white';
  toggle?: boolean;
  onChange?: (arg: boolean) => void;
  onClick?: (arg: boolean) => void;
}

export default function ActionCard({
  title,
  subtitle,
  toggle,
  color = 'white',
  onChange,
  onClick,
}: ActionCardInterface) : JSX.Element {
  const renderAction = () : JSX.Element => {
    return toggle ? (
      <ToggleSwitch initialState={false} onToggle={(value: boolean) => onChange?.(value)} />
    ) : (
      <ButtonSmall text="Vaciar" color="red" onClick={() => onClick?.(true)} />
    );
  };
  return (
    <div className={`${styles.ActionCard} ${styles[color]}`}>
      <div className={styles.message}>
        <p className={styles.message__title}>{title}</p>
        <p>{subtitle}</p>
      </div>

      {renderAction()}
    </div>
  );
}

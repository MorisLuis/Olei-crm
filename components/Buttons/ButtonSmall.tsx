import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonSmallInterface {
  text: string;
  onClick: () => void;
  extraStyles?: React.CSSProperties;
  icon?: IconDefinition;
  transparent?: boolean;
  color?: 'red' | 'black' | 'white' | 'blue' | 'yellow';
  disabled?: boolean;
}

export default function ButtonSmall({
  icon,
  text,
  onClick,
  extraStyles,
  transparent = false,
  color,
  disabled,
}: ButtonSmallInterface) : JSX.Element {
  return (
    <button
      className={
        `button-small` +
        (transparent ? ' ' + 'transparent' : '') +
        (color ? ' ' + color : '') +
        (disabled ? ' ' + 'opacity' : '')
      }
      onClick={onClick}
      style={extraStyles}
      disabled={disabled}
      aria-label={text}
    >
      <p>{text}</p>
      {icon && <FontAwesomeIcon icon={icon} className={`icon__small`} />}
    </button>
  );
}

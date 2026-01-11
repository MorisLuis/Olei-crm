import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

interface ButtonInterface {
  visible?: boolean;
  text: string;
  icon?: IconDefinition;
  onClick?: () => void;
  textDisabled?: string;
  disabled: boolean;

  typeSubmit?: boolean;
  className?: string;
  iconClassName?: string;
  extraStyles?: CSSProperties;
}

/**
 * @description Button component
 * @param {ButtonInterface} props - Props for the Button component
 * @param {string} props.text - The text to display on the button
 * @param {IconDefinition} [props.icon] - Optional FontAwesome icon to display on the button
 * @param {() => void} [props.onClick] - Optional click handler for the button
 * @param {string} [props.textDisabled] - Optional text to display when the button is disabled
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {boolean} [props.typeSubmit] - Whether the button is of type submit
 * @param {string} [props.className] - Optional additional class name(s) for the button
 * @param {string} [props.iconClassName] - Optional additional class name(s) for the icon
 * @param {CSSProperties} [props.extraStyles] - Optional inline styles for the button
 * @returns {JSX.Element} The rendered Button component
 * @example
 * <Button
 *   text="Click me"
 *   icon={faCoffee}
 *   onClick={() => console.log('Button clicked')}
 *   disabled={false}
 *   typeSubmit={false}
 *   className="my-button"
 *   iconClassName="my-icon"
 *   extraStyles={{ margin: '10px' }}
 * />
 */

export default function Button({
  visible = true,
  disabled,
  onClick,
  text,
  icon,
  textDisabled,
  typeSubmit,
  className,
  iconClassName,
  extraStyles,
}: ButtonInterface) : JSX.Element {
  return visible ? (
    <button
      disabled={disabled}
      className={disabled ? `button ${className} disabled` : `button ${className}`}
      type={typeSubmit ? 'submit' : 'button'}
      onClick={() => onClick?.()}
      aria-label={text}
      style={extraStyles}
    >
      <p className="text">{disabled && textDisabled ? textDisabled : text}</p>
      {icon && <FontAwesomeIcon icon={icon} className={`icon__small ${iconClassName}`} />}
    </button>
  ) : <></>;
}

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties } from 'react';

interface Props {
  value: string;
  name: string;
  label?: string;
  onChange?: (arg: string) => void;
  extraStyles?: CSSProperties;
  clearInput?: () => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute
}

const Input = ({
  label,
  onChange,
  value,
  name,
  extraStyles,
  clearInput,
  placeholder = 'Buscar..',
  type = "text"
}: Props) : JSX.Element => {

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    if (typeof onChange === 'function') {
      onChange(event.target.value);
    }
  };

  return (
    <div className="inputComponent" style={extraStyles}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(event) => handleOnChange(event)}
        value={value ?? ''}
      />

      {value !== '' && clearInput && (
        <div className="clearinput" onClick={clearInput}>
          <FontAwesomeIcon icon={faXmark} className="icon__small" style={{ zIndex: '99999999' }} />
        </div>
      )}
    </div>
  );
};

export default Input;

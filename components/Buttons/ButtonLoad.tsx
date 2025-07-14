import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  onClick: () => void;
  loading: boolean;
  buttonText: string;
  buttonTextLoading?: string;
  disabled?: boolean;
  color?: 'red' | 'black' | 'white' | 'blue';
}

const ButtonLoad = ({
  onClick,
  loading,
  buttonText,
  buttonTextLoading = 'Cargando...',
  disabled,
  color
}: Props) : JSX.Element => {

  return (
    <button
      className={`button ${color} ${loading ? 'loading' : ''} display-flex allCenter`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? buttonTextLoading : buttonText}
      {!loading && <FontAwesomeIcon icon={faPlus} className={`icon__small`} />}
    </button>
  );
};

export default ButtonLoad;

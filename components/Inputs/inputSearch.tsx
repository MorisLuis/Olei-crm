import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

interface InputSearchInterface {
  className?: string;

  placeholder?: string;
  onSearch: (value: string) => void;
  onCleanSearch: (value: null) => void;
  name?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  valueDefault?: string;
}

export default function InputSearch({
  className,
  placeholder = 'Buscar...',
  onSearch,
  onCleanSearch,
  name,
  onKeyDown,
  valueDefault = ''
}: InputSearchInterface): JSX.Element {
  const [value, setValue] = useState(''); // Estado local para almacenar el valor del input

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value;
    setValue(inputValue); // Actualiza el estado local
    if (typeof onSearch === 'function') {
      onSearch(inputValue);
    }
  };

  const handleClear = (): void => {
    setValue(''); // Limpia el input
    if (typeof onSearch === 'function') {
      onSearch(''); // Llama a onSearch con una cadena vacía
      onCleanSearch(null);
    }
  };

  useEffect(() => {
    setValue(valueDefault);
  }, [valueDefault]);

  return (
    <div className={`input_search ${className ?? ''}`}>
      <input
        value={value}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        name={name}
        onChange={handleOnChange}
      />
      {value && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="iconClean"
          onClick={handleClear}
        />
      )}
    </div>
  );
}

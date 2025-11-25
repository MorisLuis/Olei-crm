import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, useState } from 'react';

interface InputSearchInterface {
  placeholder?: string;
  onSearch: (value: string) => void;
  onCleanSearch: (value: null) => void;
  name?: string
  styles?: CSSProperties;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputSearch({
  placeholder = 'Buscar...',
  onSearch,
  onCleanSearch,
  name,
  styles,
  onKeyDown,
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

  return (
    <div className="input_search">
      <input
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyDown={onKeyDown}
        name={name}
        style={{
          ...styles,
          height: "100%"
        }}
      />
      {value && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={`iconClean`}
          onClick={handleClear}
          style={{ cursor: 'pointer' }}
        />
      )}
    </div>
  );
}

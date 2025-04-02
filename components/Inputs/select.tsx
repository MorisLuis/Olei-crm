import React from 'react';
import Select, { StylesConfig } from 'react-select';

export type OptionType = {
  label: string;
  value: string | number;
};

interface Props {
  options: OptionType[];
  onSelect: (arg: OptionType) => void;
  onChange?: (arg: string) => void;
  onClear?: () => void;

  value: OptionType | null;
  name: string;
  placeholder?: string;
  label?: string;
}

const SelectReact = ({
  options,
  placeholder = 'Buscar...',
  label,
  onSelect,
  onChange,
  onClear,
  value,
  name,
}: Props): JSX.Element => {
  const optionsWithNull = [{ value: null, label: 'Sin valor' }, ...options];

  const handleOnSelect = (selectedOption: unknown) : void => {
    if(!selectedOption){
      onClear?.()
    }

    if (typeof onSelect === 'function'){
      onSelect(selectedOption as OptionType);
    }
  };

  const handleOnChange = (inputValue: string)  : void => {
    onChange?.(inputValue)
  }

  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <Select
        placeholder={placeholder}
        options={optionsWithNull}
        isClearable
        className="select"
        onInputChange={(inputValue) => handleOnChange(inputValue)}
        onChange={(selectedOption) => handleOnSelect(selectedOption)}
        value={value}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: '#F9FAFA',
            primary: '#1C3873',
          },
        })}
      />
    </div>
  );
};

export default SelectReact;

const customStyles: StylesConfig = {
  control: () => ({
    width: '100%',
    display: 'flex',
    color: 'white',
  }),
};

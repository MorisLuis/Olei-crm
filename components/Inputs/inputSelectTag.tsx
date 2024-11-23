import React, { KeyboardEventHandler } from 'react';
import { MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

const components = {
    DropdownIndicator: null,
};

export interface OptionInputSelectTag {
    readonly label: string;
    readonly value: string;
}

interface InputSelectTagInterface {
    onChange: (value: MultiValue<OptionInputSelectTag>) => void;
}

const InputSelectTag = (label: string) => ({
    label,
    value: label,
});

const InputSelectTagComponent = ({
    onChange,
}: InputSelectTagInterface) => {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<readonly OptionInputSelectTag[]>([]);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                setValue((prev) => [...prev, InputSelectTag(inputValue)]);
                setInputValue('');
                event.preventDefault();
                onChange([...value, { label: inputValue, value: inputValue }]);
        }
    };

    return (
        <CreatableSelect
            components={components}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={(newValue) => {
                setValue(newValue as OptionInputSelectTag[]);
            }}
            onInputChange={(newValue) => setInputValue(newValue)}
            onKeyDown={handleKeyDown}
            placeholder="Type something and press enter..."
            value={value}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid #dfdfdf',
                    boxShadow: '0px 10px 10px -15px rgba(101, 116, 130, 1)',
                    '&:hover': {
                        border: '1px solid #0e1727',
                    },
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#1C3873',
                    color: '#fff',
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: '#fff',
                }),
                multiValueRemove: (base) => ({
                    ...base,
                    color: '#fff',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#0e1727',
                        color: '#fff',
                    },
                }),
                placeholder: (base) => ({
                    ...base,
                    color: '#ccc',
                    fontSize: 16,
                }),
                input: (base) => ({
                    ...base,
                    color: '#1D2A36',
                    padding: '10px',
                }),
            }}
        />
    );
};

// Asignar displayName
InputSelectTagComponent.displayName = 'InputSelectTagComponent';

export default InputSelectTagComponent;

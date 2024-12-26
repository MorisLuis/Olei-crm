import { emailValidation } from '@/validations/FormMeetingValidation';
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
    label?: string;
}

const InputSelectTag = (label: string) => ({
    label,
    value: label,
});

const InputSelectTagComponent = ({
    onChange,
    label,
}: InputSelectTagInterface) => {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<readonly OptionInputSelectTag[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;

        switch (event.key) {
            case 'Enter':
            case 'Tab': {
                event.preventDefault();
                
                if (!emailValidation(inputValue)) {
                    setErrorMessage('Tiene que ser un correo válido');
                    setInputValue('');
                    return;
                }

                setValue((prev) => [...prev, InputSelectTag(inputValue)]);
                setInputValue('');
                setErrorMessage(null); // Limpiar mensaje de error si es válido
                onChange([...value, { label: inputValue, value: inputValue }]);
                break;
            }
            default:
                break;
        }
    };

    return (
        <div>
            <label htmlFor={label} className="label">
                {label}
            </label>
            <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => {
                    setValue(newValue as OptionInputSelectTag[]);
                    setErrorMessage(null); // Limpiar error al cambiar valor
                }}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un correo y presiona Enter"
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
                        fontSize: 14,
                    }),
                    input: (base) => ({
                        ...base,
                        color: '#1D2A36',
                    }),
                }}
            />
            {errorMessage && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</p>}
        </div>
    );
};

// Asignar displayName
InputSelectTagComponent.displayName = 'InputSelectTagComponent';

export default InputSelectTagComponent;

import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/dom/useClickOutside';
import useToast from '@/hooks/useToast';
import { hourValidation } from '@/utils/validators/FormMeetingValidation';

interface TimeInputInterface {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const generateTimeOptions = (): string[] => {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of [0, 30]) {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      options.push(`${h}:${m}`);
    }
  }
  return options;
};

const TimeInput = ({ value, onChange, label, placeholder }: TimeInputInterface): JSX.Element => {

  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showError } = useToast();

  const timeOptions = generateTimeOptions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value;
    setTime(val);
    onChange(val);
  };

  const handleOptionClick = (option: string): void => {
    setTime(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleBlur = (): void => {
    if (!time) return;
    if (!hourValidation(time)) {
      setTime('');
      showError('Horario inválido');
    }
  };

  useEffect(() => {
    if (!value) return;
    const formattedValue = value.slice(0, 5);

    if (hourValidation(formattedValue)) {
      setTime(formattedValue);
    } else if (formattedValue.length === 5) {
      setTime('');
      showError('Valor inicial inválido');
    } else {
      setTime(formattedValue);
    }
  }, [value, showError]);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="inputComponent" style={{ position: 'relative' }}>
      {label && <label className="time-input-label">{label}</label>}

      <input
        ref={inputRef}
        type="text"
        value={time}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        placeholder={`${placeholder ?? ''} hh:mm`}
        maxLength={5}
        className="input"
      />

      {isOpen && (
        <div
          ref={dropdownRef}
          className="input-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
          }}
        >
          {timeOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="input-dropdown-option"
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeInput;

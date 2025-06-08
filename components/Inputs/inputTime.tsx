import React, { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import useToast from '@/hooks/useToast';
import { hourValidation } from '@/validations/FormMeetingValidation';

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
  const { showError } = useToast();

  const timeOptions = generateTimeOptions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    const val = e.target.value;
    setTime(val);
    onChange(val);
  };

  const handleOptionClick = (option: string) : void => {
    setTime(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleBlur = () : void => {
    if (!time) return;
    if (!hourValidation(time)) {
      setTime('');
      showError('Horario inválido');
    }
  };

  useEffect(() => {
    /**
     * Este efecto se ejecuta cuando cambia la prop `value`.
     * 
     * Funcionalidad:
     * - Formatea el valor recibido a un formato de hora `hh:mm` (máximo 5 caracteres).
     * - Si el valor es válido (según el regex `hourValidation`), lo establece como hora.
     * - Si tiene exactamente 5 caracteres pero no es válido, muestra un error y limpia el input.
     * - Si tiene menos de 5 caracteres (input parcial), lo deja pasar para permitir que el usuario continúe escribiendo.
     * 
     * Casos comunes cubiertos:
     * - value = "14:30"  => válido, se muestra tal cual.
     * - value = "99:99"  => inválido, limpia y muestra error.
     * - value = "12:"    => input parcial, se muestra sin error.
     */

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
    <div className="inputComponent" ref={dropdownRef}>
      {label && <label className="time-input-label">{label}</label>}

      <input
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
        <div className="input-dropdown">
          {timeOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              className="input-dropdown-option"
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

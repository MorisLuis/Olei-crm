import useToast from '@/hooks/useToast';
import React, { useEffect, useState } from 'react';

interface TimeInputInterface {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string
}

const TimeInput = ({
    value,
    onChange,
    label,
    placeholder
}: TimeInputInterface) => {


    const [time, setTime] = useState('');
    const { showError } = useToast();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Eliminar cualquier carácter no permitido
        value = value.replace(/[^0-9]/g, '');

        // Insertar ':' automáticamente después del segundo dígito
        if (value.length > 2) {
            value = value.slice(0, 2) + ':' + value.slice(2, 4);
        }

        // Limitar a 4 caracteres (hh:mm)
        if (value.length <= 5) {
            setTime(value);
        }


        return onChange(value)
    };

    const handleBlur = () => {
        // Validar formato completo hh:mm al perder el foco
        if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
            setTime(''); // Limpiar si no es válido
            showError("Horario invalido")
        }
    };

    useEffect(() => {
        if (!value) return;
        const formattedValue = value.slice(0, 5);

        if (/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(formattedValue)) {
            setTime(formattedValue);
        } else {
            setTime('');
            showError("Valor inicial inválido");
        }
    }, [value, showError]);


    return (
        <div>
            {label && <label htmlFor={label} className="label">{label}</label>}
            <input
                type="text"
                value={time}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`${placeholder ?? ''} hh:mm`}
                maxLength={5}
                className='input'
                pattern="^(?:[01]\d|2[0-3]):[0-5]\d$" // Validar hh:mm directamente
            />
        </div>
    );
};

export default TimeInput;

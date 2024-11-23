import React, { useState } from 'react';

interface TimeInputInterface {
    onChange: (value: string) => void;
}

const TimeInput = ({
    onChange
}: TimeInputInterface ) => {
    const [time, setTime] = useState('');

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
            alert("Horario invalido")
        }
    };

    return (
        <input
            type="text"
            value={time}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="hh:mm"
            maxLength={5}
            className='input'
        />
    );
};

export default TimeInput;

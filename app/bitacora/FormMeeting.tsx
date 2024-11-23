import InputDatePicker from '@/components/Inputs/inputDatePicker'
import TimeInput from '@/components/Inputs/inputTime'
import React from 'react'

export default function FormMeeting() {
    return (
        <div
            style={{
                minHeight: "60vh"
            }}
        >
            <p>Descripcion</p>
            <InputDatePicker/>
            <TimeInput/>
            <p>TipoContacto</p>
            <p>Comentarios</p>
        </div>
    )
}

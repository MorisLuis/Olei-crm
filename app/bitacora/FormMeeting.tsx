import React, { useState } from "react";
import InputDatePicker from "@/components/Inputs/inputDate";
import TimeInput from "@/components/Inputs/inputTime";
import Input from "@/components/Inputs/input";
import SelectReact, { OptionType } from "@/components/Inputs/select";
import MeetingInterface from "@/interface/meeting";
import InputTextBox from "@/components/Inputs/inputTextBox";
import InputSelectTag, { OptionInputSelectTag } from "@/components/Inputs/inputSelectTag";
import { MultiValue } from "react-select";

export default function FormMeeting() {
    const [meetingForm, setMeetingForm] = useState<MeetingInterface>({
        Fecha: new Date(),
        Hour: "",
        Descripcion: "",
        Title: "",
        TipoContacto: 0,
        Comentarios: "",
    });

    const [emailsResend, setEmailsResend] = useState<string[]>([])

    const optionTipoMeeting: OptionType[] = [
        { value: 1, label: "Reunión" },
        { value: 2, label: "Llamada" },
        { value: 3, label: "Cita" },
        { value: 4, label: "Tarea" },
    ];

    // Manejo genérico de cambios
    const handleChange = <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]) => {
        setMeetingForm({ ...meetingForm, [key]: value });
    };

    const handleResendEmail = (value: MultiValue<OptionInputSelectTag>) => {
        console.log({emailsResend})
        setEmailsResend((prevState) => [...prevState, value[value.length - 1].value]);
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "60vh",
                gap: 10,
            }}
        >
            <Input
                value={meetingForm.Title}
                name="Titulo"
                placeholder="Título de la reunión"
                onChange={(value) => handleChange("Title", value)}
            />
            <Input
                value={meetingForm.Descripcion}
                name="Descripción"
                placeholder="Descripción de la reunión"
                onChange={(value) => handleChange("Descripcion", value)}
            />
            <InputDatePicker
                onChange={(value) => handleChange("Fecha", value ?? new Date())}
            />
            <TimeInput
                onChange={(value) => handleChange("Hour", value)}
            />
            <SelectReact
                options={optionTipoMeeting}
                name="Tipo de contacto"
                onChange={(option) => handleChange("TipoContacto", Number(option.value) as 0 | 1 | 2 | 3 | 4)}
                value={
                    optionTipoMeeting.find(
                        (item) => item.value === meetingForm.TipoContacto
                    ) ?? optionTipoMeeting[0]
                }
            />
            <InputTextBox
                placeholder="Comentarios de la reunión"
                value={meetingForm.Comentarios ?? ""}
                onChange={(value) => handleChange("Comentarios", value)}
            />
            <InputSelectTag
                onChange={(value) => handleResendEmail(value)}
            />
        </div>
    );
}
import React, { useEffect, useState } from "react";
import InputDatePicker from "@/components/Inputs/inputDate";
import TimeInput from "@/components/Inputs/inputTime";
import Input from "@/components/Inputs/input";
import SelectReact, { OptionType } from "@/components/Inputs/select";
import MeetingInterface from "@/interface/meeting";
import InputTextBox from "@/components/Inputs/inputTextBox";
import InputSelectTag, { OptionInputSelectTag } from "@/components/Inputs/inputSelectTag";
import { MultiValue } from "react-select";
import Modal from "@/components/Modals/Modal";
import useToast from "@/hooks/useToast";
import styles from '../../styles/Form.module.scss';
import FileUploader from "@/components/UI/FileUploader";
import { useWindowSize } from "@/hooks/useWindowSize";
import { clientsSelectExample } from "@/seed/clientsData";

export const INITIAL_MEETING: MeetingInterface = {
    Fecha: new Date(), // Fecha actual como objeto Date
    Hour: undefined,
    HourEnd: '',
    Descripcion: "",
    Title: "",
    TipoContacto: 0,
    Comentarios: "",
    Id_Bitacora: 0,
    Id_Cliente: 0
}

interface FormMeetingInterface {
    meetingProp?: MeetingInterface;
    visible: boolean;
    onClose: () => void;
    isEditing?: boolean
}

export default function FormMeeting({
    meetingProp,
    visible,
    onClose,
    isEditing
}: FormMeetingInterface) {

    const { showSuccess, showInfo } = useToast()
    const [meetingForm, setMeetingForm] = useState<MeetingInterface>(INITIAL_MEETING);
    const { isMobile } = useWindowSize()
    const [emailsResend, setEmailsResend] = useState<string[]>([]);
    const availableToPost : boolean = (meetingForm.Title && meetingForm.TipoContacto && meetingForm.Id_Cliente) ? true : false

    const optionTipoMeeting: OptionType[] = [
        { value: 1, label: "Reunión" },
        { value: 2, label: "Llamada" },
        { value: 3, label: "Cita" },
        { value: 4, label: "Tarea" },
    ];

    const optionsClients: OptionType[] = clientsSelectExample.map((item) => ({
        label: item.Nombre as string, // Asume que item.Nombre es un string
        value: item.Id_Cliente as number, // Asume que item.Id_Cliente es string o number
    }));


    // Manejo genérico de cambios
    const handleChange = <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]) => {
        setMeetingForm({ ...meetingForm, [key]: value });
    };

    const handleResendEmail = (value: MultiValue<OptionInputSelectTag>) => {
        console.log({ emailsResend })
        setEmailsResend((prevState) => [...prevState, value[value.length - 1].value]);
    }

    const onPostMeeting = () => {
        if (!availableToPost) {
            return showInfo("Es necesario agregar titulo")
        }
        onClose()
        const messageShowed = isEditing ? `Reunión ${meetingForm.Title} editada!` : `Reunión ${meetingForm.Title} Creada!`
        showSuccess(messageShowed)
    }

    useEffect(() => {
        setMeetingForm(meetingProp ?? INITIAL_MEETING)
    }, [meetingProp])

    return (
        <Modal
            title='Crear Reunion'
            visible={visible}
            onClose={onClose}
            modalSize='medium'
            actionsBottom={{
                action1: {
                    action: () => onClose(),
                    label: "Cancelar"
                },
                action2: {
                    action: () => onPostMeeting(),
                    label: isEditing ? "Editar" : "Crear reunión",
                    disabled: !availableToPost
                }
            }}
            extraStyles={{
                width: isMobile ? "100%" : "40%"
            }}
        >
            <div className={styles.formMetting}>
                <SelectReact
                    options={optionsClients}
                    name="Cliente"
                    onChange={(option) => handleChange("Id_Cliente", Number(option?.value ?? null))}
                    value={
                        optionsClients.find(
                            (item) => item.value === meetingForm.Id_Cliente
                        ) ?? null
                    }
                    label="Selecciona el cliente"
                />

                <SelectReact
                    options={optionTipoMeeting}
                    name="Tipo de contacto"
                    onChange={(option) => handleChange("TipoContacto", Number(option?.value ?? null) as 0 | 1 | 2 | 3 | 4)}
                    value={
                        optionTipoMeeting.find(
                            (item) => item.value === meetingForm.TipoContacto
                        ) ?? null
                    }
                    label="Selecciona el tipo de tarea"
                />
                <Input
                    value={meetingForm.Title}
                    name="Titulo"
                    placeholder="Título de la reunión"
                    onChange={(value) => handleChange("Title", value)}
                    label="Escribe un titulo de la tarea."
                />
                <Input
                    value={meetingForm.Descripcion}
                    name="Descripción"
                    placeholder="Descripción de la reunión"
                    onChange={(value) => handleChange("Descripcion", value)}
                    label="Escribe un descripción de la tarea."
                />
                <InputDatePicker
                    onChange={(value) => handleChange("Fecha", value ?? new Date())}
                    label="Cuando sera tu tarea?"
                    value={meetingForm.Fecha && new Date(meetingForm.Fecha).toLocaleDateString("es-MX")}
                />
                <div className={styles.hours}>
                    <TimeInput
                        onChange={(value) => handleChange("Hour", value)}
                        label="A que hora sera tu tarea?"
                        value={meetingForm.Hour ? meetingForm.Hour : undefined}
                        placeholder="Inicio"
                    />
                    <TimeInput
                        onChange={(value) => handleChange("HourEnd", value)}
                        label="."
                        value={meetingForm.HourEnd ? meetingForm.HourEnd : undefined}
                        placeholder="Fin"

                    />
                </div>

                <InputTextBox
                    placeholder="Comentarios de la reunión"
                    value={meetingForm.Comentarios ?? ""}
                    onChange={(value) => handleChange("Comentarios", value)}
                    label="Algun comentario extra? Estos comentarios podran ser editados después"
                />

                <InputSelectTag
                    onChange={(value) => handleResendEmail(value)}
                    label="Escribe el correo de aquien lo quieres reenviar esta tarea"
                />

                <FileUploader label='Deseas adjuntar algun archivo?' />
            </div>
        </Modal>
    );
}
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
import FileUploader from "@/components/UI/FileUploader";
import { useWindowSize } from "@/hooks/useWindowSize";
import { clientsSelectExample } from "@/seed/clientsData";
import styles from "../../../styles/Form.module.scss";
import { postMeeting } from "@/services/meeting";

export const INITIAL_MEETING: MeetingInterface = {
    Fecha: new Date(), // Fecha actual como objeto Date
    Hour: '',
    HourEnd: '',
    Descripcion: "",
    Titulo: "",
    TipoContacto: 0,
    Comentarios: "",
    Id_Bitacora: 0,
    Id_Cliente: 0
}

interface FormMeetingInterface {
    meetingProp?: MeetingInterface;
    visible: boolean;
    onClose: () => void;
    isEditing?: boolean;
}

export default function FormMeeting({
    meetingProp,
    visible,
    onClose,
    isEditing,
}: FormMeetingInterface) {
    const { showSuccess, showInfo } = useToast();
    const { isMobile } = useWindowSize();

    // Inicialización del formulario
    const [meetingForm, setMeetingForm] = useState<MeetingInterface>(INITIAL_MEETING);
    const [emailsResend, setEmailsResend] = useState<string[]>([]);

    const availableToPost: boolean =
        !!meetingForm?.Titulo && !!meetingForm?.TipoContacto && !!meetingForm?.Id_Cliente;

    const optionTipoMeeting: OptionType[] = [
        { value: 1, label: "Reunión" },
        { value: 2, label: "Llamada" },
        { value: 3, label: "Cita" },
        { value: 4, label: "Tarea" },
    ];

    const optionsClients: OptionType[] = clientsSelectExample.map((item) => ({
        label: item.Nombre as string,
        value: item.Id_Cliente as number,
    }));

    // Manejo genérico de cambios
    const handleChange = <K extends keyof MeetingInterface>(key: K, value: MeetingInterface[K]) => {
        setMeetingForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleResendEmail = (value: MultiValue<OptionInputSelectTag>) => {
        setEmailsResend((prevState) => [...prevState, value[value.length - 1].value]);
    };

    const onPostMeeting = async () => {
        if (!availableToPost) {
            return showInfo("Es necesario agregar título, tipo de contacto y cliente");
        };

        onClose();
        await postMeeting(meetingForm);
        console.log({emailsResend})

        const messageShowed = isEditing
            ? `Reunión ${meetingForm?.Titulo} editada!`
            : `Reunión ${meetingForm?.Titulo} creada!`;
        showSuccess(messageShowed);
    };

    useEffect(() => {
        if (!meetingProp) return;
        setMeetingForm(meetingProp);
    }, [meetingProp]);

    return (
        <Modal
            title="Crear Reunión"
            visible={visible}
            onClose={onClose}
            modalSize="medium"
            actionsBottom={{
                action1: {
                    action: () => onClose(),
                    label: "Cancelar",
                },
                action2: {
                    action: () => onPostMeeting(),
                    label: isEditing ? "Editar" : "Crear reunión",
                    disabled: !availableToPost,
                },
            }}
            extraStyles={{
                width: isMobile ? "100%" : "40%",
            }}
        >
            <div className={styles.formMetting}>
                <SelectReact
                    options={optionsClients}
                    name="Cliente"
                    onChange={(option) =>
                        handleChange("Id_Cliente", Number(option?.value ?? 0))
                    }
                    value={
                        optionsClients.find((item) => item.value === meetingForm.Id_Cliente) ??
                        null
                    }
                    label="Selecciona el cliente"
                />

                <SelectReact
                    options={optionTipoMeeting}
                    name="Tipo de contacto"
                    onChange={(option) =>
                        handleChange("TipoContacto", Number(option?.value ?? 0) as 0 | 1 | 2 | 3 | 4)
                    }
                    value={
                        optionTipoMeeting.find((item) => item.value === meetingForm.TipoContacto) ??
                        null
                    }
                    label="Selecciona el tipo de tarea"
                />
                <Input
                    value={meetingForm.Titulo}
                    name="Titulo"
                    placeholder="Título de la reunión"
                    onChange={(value) => handleChange("Titulo", value)}
                    label="Escribe un título para la tarea."
                />
                <Input
                    value={meetingForm.Descripcion}
                    name="Descripción"
                    placeholder="Descripción de la reunión"
                    onChange={(value) => handleChange("Descripcion", value)}
                    label="Escribe una descripción de la tarea."
                />
                <InputDatePicker
                    onChange={(value) => handleChange("Fecha", value ?? new Date())}
                    label="¿Cuándo será tu tarea?"
                    value={meetingForm.Fecha}
                />
                <div className={styles.hours}>
                    <TimeInput
                        onChange={(value) => handleChange("Hour", value)}
                        label="¿A qué hora será tu tarea?"
                        value={meetingForm.Hour || ""}
                        placeholder="Inicio"
                    />
                    <TimeInput
                        onChange={(value) => handleChange("HourEnd", value)}
                        label="."
                        value={meetingForm.HourEnd || ""}
                        placeholder="Fin"
                    />
                </div>

                <InputTextBox
                    placeholder="Comentarios de la reunión"
                    value={meetingForm.Comentarios || ""}
                    onChange={(value) => handleChange("Comentarios", value)}
                    label="¿Algún comentario extra? Estos comentarios podrán ser editados después."
                />

                <InputSelectTag
                    onChange={(value) => handleResendEmail(value)}
                    label="Escribe el correo a quien lo quieres reenviar esta tarea"
                />

                <FileUploader label="¿Deseas adjuntar algún archivo?" />
            </div>
        </Modal>
    );
}

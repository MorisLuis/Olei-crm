import { api } from "@/api/api";
import MeetingInterface from "@/interface/meeting";
import { dateValidation, hourValidation } from "@/validations/FormMeetingValidation";


export const postMeeting = async (bodyMeeting: MeetingInterface): Promise<any> => {

    try {
        // Validaciones
        const errors: string[] = [];
        
        if (!dateValidation(bodyMeeting.Fecha)) {
            errors.push('Fecha inválida.');
        }

        if (bodyMeeting.Hour && !hourValidation(bodyMeeting.Hour)) {
            errors.push('Hora inicial inválida.');
        }

        if (bodyMeeting.HourEnd && !hourValidation(bodyMeeting.HourEnd)) {
            errors.push('Hora final inválida.');
        }

        if (errors.length > 0) {
            return { error: true, message: 'Errores de validación', details: errors };
        }

        // Petición a la API
        const response = await api.post('/api/meetings', { body: bodyMeeting });
        return response.data;

    } catch (error) {
        return { error: error };
    }
};

export const updateMeeting = async (bodyMeeting: Partial<MeetingInterface>, Id_Bitacora: number): Promise<any> => {

    try {
        // Validaciones
        const errors: string[] = [];
        
        if (bodyMeeting.Fecha && !dateValidation(bodyMeeting.Fecha)) {
            errors.push('Fecha inválida.');
        }

        if (bodyMeeting.Hour && !hourValidation(bodyMeeting.Hour)) {
            errors.push('Hora inicial inválida.');
        }

        if (bodyMeeting.HourEnd && !hourValidation(bodyMeeting.HourEnd)) {
            errors.push('Hora final inválida.');
        }

        if (errors.length > 0) {
            return { error: true, message: 'Errores de validación', details: errors };
        }

        // Petición a la API
        const response = await api.put(`/api/meetings/${Id_Bitacora}`, { body: bodyMeeting });
        return response.data;

    } catch (error) {
        return { error: error };
    }
};


export const getMeetingById = async (id: string) => {

    try {
        const data  = await api.get(`/api/meetings/${id}`)
        return data.data
    } catch (error) {
        return { error: error };
    }

}
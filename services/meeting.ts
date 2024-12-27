import { api } from "@/api/api";
import MeetingInterface, { FiltersMeetings } from "@/interface/meeting";
import { dateValidation, hourValidation } from "@/validations/FormMeetingValidation";


interface getMeetingsInterface {
    PageNumber: number;
    filters: FiltersMeetings;
}

export const getMeetings = async ({
    PageNumber,
    filters
}: getMeetingsInterface) => {

    try {
        const errors: string[] = [];
    
        if(filters.FilterCliente === 1 && !filters.Id_Cliente){
            errors.push('Es necesario un Id_Cliente');
        };
    
        if(filters.FilterTipoContacto === 1 && !filters.TipoContacto){
            errors.push('Es necesario un TipoContacto');
        }

        if (errors.length > 0) {
            return { error: true, message: 'Errores de validación', details: errors };
        }

        const data = await api.get(`/api/meetings?PageNumber=${PageNumber}&FilterTipoContacto=${filters.FilterTipoContacto}&FilterCliente=${filters.FilterCliente}&TipoContacto=${filters.TipoContacto}&Id_Cliente=${filters.Id_Cliente}`);
        return data.data
    } catch (error) {
        return { error: error };
    }

};

interface getTotalMeetingsInterface {
    filters: FiltersMeetings;

}

export const getTotalMeetings = async ({
    filters
} : getTotalMeetingsInterface ) => {

    try {
        const errors: string[] = [];
    
        if(filters.FilterCliente === 1 && !filters.Id_Cliente){
            errors.push('Es necesario un Id_Cliente');
        };
    
        if(filters.FilterTipoContacto === 1 && !filters.TipoContacto){
            errors.push('Es necesario un TipoContacto');
        }

        if (errors.length > 0) {
            return { error: true, message: 'Errores de validación', details: errors };
        }

        const data = await api.get(`/api/meetings/total?FilterTipoContacto=${filters.FilterTipoContacto}&FilterCliente=${filters.FilterCliente}&TipoContacto=${filters.TipoContacto}&Id_Cliente=${filters.Id_Cliente}`);

        return data.data
    } catch (error) {
        return { error: error };
    }
}

export const getMeetingById = async (id: string) => {

    try {
        const data = await api.get(`/api/meetings/${id}`)
        return data.data
    } catch (error) {
        return { error: error };
    }

}


export const postMeeting = async (bodyMeeting: MeetingInterface): Promise<any> => {

    try {
        // Validaciones
        const errors: string[] = [];

        if(!bodyMeeting.Id_Cliente){
            errors.push("Es necesario el cliente")
        }

        if(!bodyMeeting.Id_Almacen){
            errors.push("Es necesario el almacen")
        };

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

        if(!bodyMeeting.Id_Cliente){
            errors.push("Es necesario el cliente")
        };

        if(!bodyMeeting.Id_Almacen){
            errors.push("Es necesario el almacen")
        };

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

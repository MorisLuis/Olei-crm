import { api } from "@/api/api";

export interface postEmailInterface {
    destinatario: string;
    remitente: string;
    text: string;
    subject: string;
}

export const postEmail = async ({
    destinatario, 
    remitente, 
    text, 
    subject
} : postEmailInterface ) => {

    try {
        const emailBody : postEmailInterface = {
            destinatario, 
            remitente, 
            text, 
            subject
        };

        const data = await api.post(`/api/email`, emailBody);
        return data;
    } catch (error) {
        return { error: error };
    };

}
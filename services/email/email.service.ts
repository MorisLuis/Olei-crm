import { api } from '@/api/api';
import { PostEmailCobranzaParams } from './email.interface';

export interface postEmailInterface {
  destinatario: string;
  remitente: string;
  text: string;
  subject: string;
}

export const postEmail = async ({ destinatario, remitente, text, subject }: postEmailInterface) => {
  try {
    const emailBody: postEmailInterface = {
      destinatario,
      remitente,
      text,
      subject,
    };

    const data = await api.post(`/api/email`, emailBody);
    return data;
  } catch (error) {
    return { error: error };
  }
};

export const postEmailCobranza = async (params: PostEmailCobranzaParams): Promise<void> => {

  const {
    Id_Cliente,
    destinatario,
    remitente,
    subject,
    text,
    nombreRemitente,
    filters,
    PageNumber,
    Id_Almacen
  } = params;

  const { data } = await api.post(`/api/email/cobranza/pdf/${Id_Cliente}`,
    {
      destinatario,
      remitente,
      subject,
      text,
      nombreRemitente,
      Id_Almacen
    },
    { params: { ...filters, PageNumber } }
  );

  return data;
};

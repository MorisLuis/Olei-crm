import { api } from '@/api/api';
import { FilterSellsByClient } from './cobranza/cobranza.interface';

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

export interface postEmailCobranzaInterface {
  destinatario: string;
  remitente: string;
  text: string;
  subject: string;
  nombreRemitente: string;
  Id_Cliente: number;

  PageNumber: number;
  filters: FilterSellsByClient;
}

export const postEmailCobranza = async ({
  destinatario,
  remitente,
  text,
  subject,
  nombreRemitente,
  Id_Cliente,
  PageNumber,
  filters,
}: postEmailCobranzaInterface) => {
  try {
    const emailBody: Partial<postEmailCobranzaInterface> = {
      destinatario,
      remitente,
      text,
      subject,
      nombreRemitente,
    };

    const data = await api.post(
      `/api/email/cobranza/pdf/${Id_Cliente}?PageNumber=${PageNumber}&FilterExpired=${filters.FilterExpired}&FilterNotExpired=${filters.FilterNotExpired}&TipoDoc=${filters.TipoDoc}&DateEnd=${filters.DateEnd}&DateStart=${filters.DateStart}&DateExactly=${filters.DateExactly}&sellsOrderCondition=${filters.sellsOrderCondition}`,
      emailBody
    );
    return data.data;
  } catch (error) {
    return { error: error };
  }
};

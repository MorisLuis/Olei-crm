import { OrderObject } from "@/components/UI/OrderComponent";

export const useOrderMeetingsConfig = () => {

    const orderMeetings : OrderObject[] = [
        { order: 'Fecha', value: 1, label: 'Fecha' },
        { order: 'Cliente', value: 2, label: 'Cliente' },
        { order: 'TipoContacto', value: 3, label: 'Tipo de Contacto' }
    ];

    return { orderMeetings };
};

import { OrderObject } from "@/components/UI/OrderComponent";

export const useOrderMeetingsConfig = () => {

    const orderMeetings : OrderObject[] = [
        { order: 'Cliente', value: 1, label: 'Cliente' },
        { order: 'Fecha', value: 2, label: 'Fecha' },
        { order: 'TipoContacto', value: 3, label: 'Tipo de Contacto' }
    ];

    return { orderMeetings };
};

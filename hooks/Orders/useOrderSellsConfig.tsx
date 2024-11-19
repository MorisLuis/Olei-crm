import { OrderObject } from "@/components/UI/OrderComponent";

export const useOrderSellsConfig = () => {

    const orderSells : OrderObject[] = [
        { order: 'Total', value: 1, label: 'Total' },
        { order: 'Saldo', value: 2, label: 'Saldo' },
        { order: 'Nombre', value: 3, label: 'Nombre' }
    ];

    return { orderSells };
};

export const useOrderSellsClientConfig = () => {

    const orderSellsClient : OrderObject[] = [
        { order: 'TipoDoc', value: 1, label: 'Tipo documento' },
        { order: 'Folio', value: 2, label: 'Folio' },
        { order: 'Fecha', value: 3, label: 'Fecha' },
        { order: 'FechaEntrega', value: 4, label: 'Fecha Entrega' },
        { order: 'ExpiredDays', value: 5, label: 'Dias de expiración' },
    ];

    return { orderSellsClient };
};


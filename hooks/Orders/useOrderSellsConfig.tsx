import { OrderObject } from "@/components/UI/OrderComponent";
import { SellsOrderConditionByClientType } from "@/interface/sells";

export const useOrderSellsConfig = () => {

    const orderSells : OrderObject[] = [
        { order: 'Total', value: 1, label: 'Total' },
        { order: 'Saldo', value: 2, label: 'Saldo' },
        { order: 'Nombre', value: 3, label: 'Nombre' }
    ];

    return { orderSells };
};

export interface OrderObjectSellsByClient extends Omit<OrderObject, 'order'> {
    order: SellsOrderConditionByClientType;
};


export const useOrderSellsClientConfig = () => {
    const orderSellsClient : OrderObjectSellsByClient[] = [
        { order: 'Fecha', value: 3, label: 'Fecha' },
        { order: 'TipoDoc', value: 1, label: 'Tipo documento' },
        { order: 'Folio', value: 2, label: 'Folio' },
        { order: 'FechaEntrega', value: 4, label: 'Fecha Entrega' },
        { order: 'ExpiredDays', value: 5, label: 'Dias de expiración' },
    ];

    return { orderSellsClient };
};


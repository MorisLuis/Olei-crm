import { OrderObject } from "@/components/UI/OrderComponent";
import { FilterSellsByClient } from "../cobranza/cobranza.interface";
import { typeTipoDoc } from "@/interface/sells";


interface getSellsInterface {
    PageNumber: number;
    SellsOrderCondition: OrderObject;
};

interface getSellsByClientInterface {
    client: number;
    PageNumber?: number;
    filters: FilterSellsByClient;
};

interface getSellByIdInterface {
    Folio: string;
    Serie: string;
    Id_Almacen: number;
    TipoDoc: typeTipoDoc;
};

export type {
    getSellsInterface,
    getSellsByClientInterface,
    getSellByIdInterface
}
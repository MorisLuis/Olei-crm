import { api } from "@/api/api";
import { OrderObject } from "@/components/UI/OrderComponent";

interface getSellsInterface {
    PageNumber: number;
    ClientsOrderCondition: OrderObject;
}

export const getClients = async ({
    PageNumber,
    ClientsOrderCondition
}: getSellsInterface) => {

    try {
        const data = await api.get(`/api/client?PageNumber=${PageNumber}&clientOrderCondition=${ClientsOrderCondition?.order}`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};

interface getClientByIdInterface {
    Id_Almacen: string,
    Id_Cliente: string,
};


export const getClientById = async ({
    Id_Almacen,
    Id_Cliente,
}: getClientByIdInterface) => {

    try {
        const data = await api.get(`/api/client/clientId?Id_Cliente=${Id_Cliente}&Id_Almacen=${Id_Almacen}`);
        return data.data;
    } catch (error) {
        return { error: error };
    };

};

export const getTotalClients = async () => {

    try {
        const data = await api.get(`/api/client/total`);
        return data.data;
    } catch (error) {
        return { error: error };
    }
};
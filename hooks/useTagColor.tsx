import { typeTipoDoc } from "@/interface/sells";

export type typeLabelTipoDocColor = [ "gray", "red", "blue", "green", "yellow"]
const tipoDocMap: { [key in typeTipoDoc]: typeLabelTipoDocColor[key] } = {
    0: "gray",
    1: "red",
    2: "blue",
    3: "green",
    4: "yellow"
};

export const useTagColor = () => {

    const changeColor = (value: typeTipoDoc) => {
        return tipoDocMap[value] || "gray";
    }

    return {
        changeColor
    }
}
import { TotalsSellsProductsReponse } from "@/services/sells/sells.interface";

interface Response {
    label: string;
    value: number;
}


export default function sellsProductsStats(totalStats?: TotalsSellsProductsReponse | null): Response[] {

    const labelMap: Record<string, string> = {
        SumaImporte: "Suma importe",
        SumaImpuesto: "Suma impuesto",
        SumaTotal: "Suma total",
    };

    const colorMap: Record<keyof TotalsSellsProductsReponse, string> = {
        SumaImporte: "#dff4ff",
        SumaImpuesto: "#fff7f1",
        SumaTotal: "#fef8e5"
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key] || key,
        value,
        color: colorMap[key as keyof TotalsSellsProductsReponse] 
    }));

    return headerStatsItems;
}

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

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key] || key,
        value,
    }));

    return headerStatsItems;
}

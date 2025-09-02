import { TotalSellsResponse } from "@/services/sells/sells.interface";

interface Response {
    label: string;
    value: number;
}


export default function sellsStats(totalStats?: TotalSellsResponse | null): Response[] {

    const labelMap: Record<string, string> = {
        SumaSubtotal: "Subtotal",
        SumaTotal: "Total",
    };


    const colorMap: Record<keyof TotalSellsResponse, string> = {
        SumaSubtotal: "#dff4ff",
        SumaTotal: "#fef8e5"
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key] || key,
        value,
        color: colorMap[key as keyof TotalSellsResponse]
    }));

    return headerStatsItems;
}

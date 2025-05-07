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

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key] || key,
        value,
    }));

    return headerStatsItems;
}

import { totalCobranzaByClientResponse } from "@/services/cobranza/cobranza.interface";

interface Response {
    label: string;
    value: number;
}

export default function cobranzaByClientStats(totalStats?: totalCobranzaByClientResponse): Response[] {
    const labelMap: Record<keyof totalCobranzaByClientResponse, string> = {
        SumaSaldo: "Suma saldo",
        SumaTotal: "Suma total"
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key as keyof totalCobranzaByClientResponse] || key,
        value,
    }));

    return headerStatsItems;
}

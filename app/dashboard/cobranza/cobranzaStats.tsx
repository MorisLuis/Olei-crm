import { totalCobranzaResponse } from "@/services/cobranza/cobranza.interface";

interface Response {
    label: string;
    value: number;
}

export default function cobranzaStats(totalStats?: totalCobranzaResponse): Response[] {
    const labelMap: Record<keyof totalCobranzaResponse, string> = {
        SumaSaldoVencido: "Suma saldo vencido",
        SumaSaldoNoVencido: "Suma saldo no vencido",
        SumaTotalSaldo: "Suma total saldo",
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key as keyof totalCobranzaResponse] || key,
        value,
    }));

    return headerStatsItems;
}

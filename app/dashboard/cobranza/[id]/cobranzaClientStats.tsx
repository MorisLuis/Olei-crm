import { TotalCobranzaResponse } from "@/services/cobranza/cobranza.interface";

interface Response {
    label: string;
    value: number;
}

export default function cobranzaByClientStats(totalStats?: TotalCobranzaResponse | null): Response[] {
    const labelMap: Record<keyof TotalCobranzaResponse, string> = {
        SumaSaldoNoVencido: "Suma saldo no vencido",
        SumaSaldoVencido: "Suma saldo vencido",
        SumaTotalSaldo: "Suma saldo"
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key as keyof TotalCobranzaResponse] || key,
        value,
    }));

    return headerStatsItems;
}

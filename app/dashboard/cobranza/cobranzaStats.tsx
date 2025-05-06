import { TotalCobranzaResponse } from "@/services/cobranza/cobranza.interface";

interface Response {
    label: string;
    value: number;
}

export default function cobranzaStats(totalStats?: TotalCobranzaResponse | null): Response[] {
    const labelMap: Record<keyof TotalCobranzaResponse, string> = {
        SumaSaldoVencido: "Suma saldo vencido",
        SumaSaldoNoVencido: "Suma saldo no vencido",
        SumaTotalSaldo: "Suma total saldo",
    };

    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key as keyof TotalCobranzaResponse] || key,
        value,
    }));

    return headerStatsItems;
}

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

    const colorMap: Record<keyof TotalCobranzaResponse, string> = {
        SumaSaldoVencido: "#dff4ff",
        SumaSaldoNoVencido: "#fff7f1",
        SumaTotalSaldo: "#fef8e5"
    };


    const headerStatsItems = Object.entries(totalStats || {}).map(([key, value]) => ({
        label: labelMap[key as keyof TotalCobranzaResponse] || key,
        value,
        color: colorMap[key as keyof TotalCobranzaResponse]
    }));

    return headerStatsItems;
}

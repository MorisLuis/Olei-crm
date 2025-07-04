

interface getStatisticsCRMResponse {
    eventsToday: number;
    sellsToday: number;
    eventsWeek: number;
    sellsWeek: number;

    productsSoldMonth: number;
    sellerOfMonth: number;

    sells: { period: number, sellsByMonth: number }[];
    cobranza: { type: 'MES' | 'HOY' | 'HOY_FWD' | 'TOTAL', sumCobranzaExpired: number, sumCobranza: number }[];
};


export type {
    getStatisticsCRMResponse
}
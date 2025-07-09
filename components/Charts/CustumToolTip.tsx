import { TooltipProps } from 'recharts';
import { SellsMontlyStatistics } from '@/services/statistics/statistics.interface';
import { formatMonth } from '@/utils/format/formatMonth';

const CustomTooltipSells = ({ active, payload }: TooltipProps<number, string>) : JSX.Element | null => {

    if (active && payload && payload.length) {
        const data = payload[0].payload as SellsMontlyStatistics;

        return (
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '6px'
            }}>
                <p>📅 Mes: {formatMonth(data.period)}</p>
                <p>💰 Ventas Total: ${data.sellsTotal.toLocaleString('es-MX')}</p>
                <p>💰 Ventas Contado: ${data.sellsByMonthContado.toLocaleString('es-MX')}</p>
                <p>💰 Ventas Credito: ${data.sellsByMonthCredit.toLocaleString('es-MX')}</p>
            </div>
        );
    }

    return null;
};



export {
    CustomTooltipSells
}
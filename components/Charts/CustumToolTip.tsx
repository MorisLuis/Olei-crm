import { TooltipProps } from 'recharts';
import { formatMonth } from '@/utils/format/formatMonth';


const CustomTooltipSells = ({ active, payload }: TooltipProps<number, string>) : JSX.Element | null => {

    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '6px'
            }}>
                <p>📅 Mes: {formatMonth(data.period)}</p>
                <p>💰 Ventas: ${data.sellsByMonth.toLocaleString('es-MX')}</p>
            </div>
        );
    }

    return null;
};



export {
    CustomTooltipSells
}
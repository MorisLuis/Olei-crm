'use client';

import { ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import styles from './../../styles/Components/Grafica.module.scss';
import { CustomTooltipSells } from './CustumToolTip';

interface GraficaInterface {
    data: { period: number; sellsByMonth: number }[];
    chartTitle: string;
    chartValue: string | number;
    chartMessage?: string;
    onClick?: () => void;
}

export default function ChartWidget({
    data,
    chartTitle,
    chartValue,
    chartMessage,
    onClick
}: GraficaInterface) : JSX.Element {

    return (
        <div className={styles.ChartWidget} onClick={onClick}>
            <div className={styles.ChartData}>
                <p>{chartTitle}</p>
                <p className={styles.ChartData__value}>{chartValue}</p>
                {chartMessage && <p>{chartMessage}</p>}
            </div>

            <div className={styles.graph}>
                <ResponsiveContainer width="100%" height={100} minHeight={100}>
                    <LineChart data={data}>
                        <XAxis dataKey="period" type="category" hide />
                        <YAxis dataKey="sellsByMonth" type="number" hide />
                        <Tooltip content={<CustomTooltipSells />} />
                        <Line
                            type="monotone"
                            dataKey="sellsByMonth"
                            stroke="#1C3873"
                            dot={{ r: 5 }}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

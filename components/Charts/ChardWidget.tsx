'use client';

import { ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import { getStatisticsCRMResponse } from '@/services/statistics/statistics.interface';
import styles from './../../styles/Components/Grafica.module.scss';
import { CustomTooltipSells } from './CustumToolTip';

interface GraficaInterface {
    data: getStatisticsCRMResponse['sells'];
    chartTitle: string;
    chartSubtitle?: string;
    chartValue: string | number;
    chartSubValue?: string | number;
    chartMessage?: string;
    onClick?: () => void;
}

export default function ChartWidget({
    data,
    chartTitle,
    chartSubtitle,
    chartValue,
    chartSubValue,
    chartMessage,
    onClick
}: GraficaInterface): JSX.Element {

    return (
        <div className={styles.ChartWidget} onClick={onClick}>
            <div className={styles.ChartData}>
                <div>
                    <p>{chartTitle}</p>
                    <p className={styles.ChartData__value}>{chartValue}</p>
                    {chartMessage && <p>{chartMessage}</p>}
                </div>
                {
                    (chartSubtitle && chartSubValue) &&
                    <div>
                        <p>{chartSubtitle}</p>
                        <p className={styles.ChartData__value}>{chartSubValue}</p>
                    </div>
                }
            </div>

            <div className={styles.graph}>
                <ResponsiveContainer width="100%" height={100} minHeight={100}>
                    <LineChart data={data}>
                        <XAxis dataKey="period" type="category" hide />
                        <YAxis dataKey="sellsByMonthCredit" type="number" hide />
                        <Tooltip content={<CustomTooltipSells />} />
                        <Line
                            type="monotone"
                            dataKey="sellsByMonthCredit"
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

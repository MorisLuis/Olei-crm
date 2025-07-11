import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { format } from '@/utils/currency';
import styles from '../../styles/Navigation/headerStats.module.scss'
import StatCard from '../Cards/StatCard';
import HeaderStatsSkeleton from '../Skeletons/HeaderStatsSkeleton';

interface headerStatsInterface {
    items: { label: string, value: number }[],
    isLoading: boolean,
    sizeSkeleton?: number;
}

export default function HeaderStats({
    items,
    isLoading,
    sizeSkeleton
}: headerStatsInterface): JSX.Element {

    if (!isLoading) {
        return <HeaderStatsSkeleton size={sizeSkeleton}/>
    }

    return (
        <div className={styles.headerStats}>
            {
                items.map((item, index) =>
                    <StatCard
                        key={`${index}-${item.label}`}
                        title={item.label}
                        value={format(item.value)}
                        icon={faDollarSign}
                    />
                )
            }
        </div>
    )
}
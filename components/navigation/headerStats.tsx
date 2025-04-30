import React from 'react';
import { format } from '@/utils/currency';
import styles from '../../styles/Navigation/headerStats.module.scss'
import HeaderStatsSkeleton from '../Skeletons/HeaderStatsSkeleton';

interface headerStatsInterface {
    items: { label: string, value: number }[],
    isLoading: boolean
}

export default function HeaderStats({
    items,
    isLoading
}: headerStatsInterface): JSX.Element {

    if (isLoading) {
        return <HeaderStatsSkeleton/>
    }

    return (
        <div className={styles.headerStats}>
            {
                items.map((item, index) =>
                    <StatsItem key={index} item={item} />
                )
            }
        </div>
    )
}

interface statsItemInterface {
    item: { label: string, value: number }
}

const StatsItem = ({ item }: statsItemInterface): JSX.Element => {

    return (
        <div className={styles.headerStatsItem}>
            <label>{item.label}</label>
            <p className={styles.headerStatsItem_value}>{format(item.value)}</p>
        </div>
    )

}
import React from 'react';
import StatCardSkeleton from './Cards/StateCardSkeleton';
import styles from '../../styles/Navigation/headerStats.module.scss';

const HeaderStatsSkeleton = ({ size = 2 }: { size?: number }): JSX.Element => {
    return (
        <div className={styles.headerStats}>
            {Array.from({ length: size }, (_, i) => (
                <StatCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default HeaderStatsSkeleton;

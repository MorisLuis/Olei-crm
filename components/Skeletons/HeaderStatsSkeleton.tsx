import React from 'react';
import styles from '../../styles/Navigation/headerStats.module.scss';

const HeaderStatsSkeleton = (): JSX.Element => {
    return (
        <div className={styles.headerStats}>
            {Array.from({ length: 2 }, (_, i) => (
                <div key={i} className={`${styles.headerStatsItem} skeleton`}>
                    <label></label>
                </div>
            ))}
        </div>
    );
};

export default HeaderStatsSkeleton;

import React from 'react';
import styles from '../../../styles/Tables.module.scss';


interface TableSkeletonProps {
    columns: number; // number of columns
}

const TableTertiarySkeleton = ({ columns }: TableSkeletonProps): JSX.Element => {
    return (
        <div className={styles.tableTertiary}>
            {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className={styles.item}>
                    <div className={`${styles.item__label} skeleton skeleton--text`}>
                    </div>
                    <div className={`${styles.item__value} skeleton skeleton--text`}>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableTertiarySkeleton;

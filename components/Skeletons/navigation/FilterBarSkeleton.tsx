'use client';

import React from 'react';
import styles from './../../../styles/Components/CobranzaByClientFilters.module.scss';

const FilterBarSkeleton = ({ size = 3 }: { size?: number }): JSX.Element => {

    const renderFilterBtn = (): JSX.Element => (
        <div style={{ display: 'flex' }}>
            <div
                className={`${styles.filterButton} skeleton skeleton--background`}
                style={{ 
                    borderStyle: 'solid'
                }}
            >
                <p className='skeleton skeleton--text--small'></p>
                <span className={styles.value}></span>
            </div>
        </div>
    );

    return (
        <div className={styles.filtersComponent}>
            <div className={styles.filtersWrapper}>
                {Array.from({ length: size }, (_, i) => {
                    return (
                        <div key={i} className={`${styles.filterItem}`}>
                            {/* BOTÓN / BADGE */}
                            {renderFilterBtn()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FilterBarSkeleton;

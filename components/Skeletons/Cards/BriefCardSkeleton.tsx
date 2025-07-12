import React from 'react';
import styles from '../../../styles/Components/Cards.module.scss';

export default function BriefCardSkeleton(): JSX.Element {

    return (
        <div
            className={`${styles.BriefCard} skeleton skeleton--background`}
            style={{ backgroundColor: '#f0f0f0' }}
        >
            <h3 className='skeleton skeleton--text skeleton--h2'></h3>
            <div className="divider small"></div>

            {Array.from({ length: 7 }, (_, i: number) => (
                <div key={i} className={styles.BriefCard__data}>
                    <div className={styles.dataItem}>
                        <label className='skeleton skeleton--text utils__marginBottom__small' style={{ minWidth: "50%" }}></label>
                        <p className='skeleton skeleton--text'></p>
                    </div>
                    <div className={`${styles.dividerLocal} divider small`}></div>
                </div>
            ))}
        </div>
    );
}

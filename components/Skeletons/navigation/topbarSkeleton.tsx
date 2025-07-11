'use client';
import React from 'react';
import styles from '../../../styles/Navigation.module.scss';


export default function TopbarSkeleton(): JSX.Element {

    return (
        <div className={styles.profile}>
            <div className={`${styles.info}`}>
                <p className='skeleton skeleton--text'></p>
            </div>
            <div className={`${styles.circle} skeleton`}>
                <p></p>
            </div>
        </div>
    );
}

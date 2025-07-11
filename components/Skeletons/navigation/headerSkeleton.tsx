'use client';

import React from 'react';
import styles from '../../../styles/Navigation.module.scss';

export default function HeaderSkeleton(): JSX.Element {

    return (
        <div className={`${styles.header}`}>
            <div className={`${styles.header__title}`}>
                <div className={`${styles.icon} skeleton`}>
                </div>
                <h2 className={`${styles.text} skeleton skeleton--h2`}></h2>
            </div>
            {/* <ActionsComponent actions={actions} /> */}
        </div>
    );
}

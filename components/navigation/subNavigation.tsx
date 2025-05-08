"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import styles from "../../styles/Navigation/SubNavigation.module.scss";


interface SubNavigationInterface {
    items: { name: string, pathname: string, key: number }[]
}

const SubNavigation = ({ items } : SubNavigationInterface) : JSX.Element => {

    const pathname = usePathname();
    const actualPathname = pathname.split('/').filter(Boolean)[2];

    return (
        <div className={styles.subNavigation}>
            <div className={styles.menu}>
                {
                    items.map((item) =>
                        <div key={item.key} className={item.pathname === actualPathname ? `${styles.link} ${styles.active}` : `${styles.link}`}>
                            <Link href={item.pathname} shallow>
                                {item.name}
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SubNavigation

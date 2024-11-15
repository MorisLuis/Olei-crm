import React from 'react';
import styles from '../../styles/Navigation.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import logoOlei from '../../public/HORIZONTAL_COLOR PRINCIPAL.svg'
import Image from 'next/image';

interface SidebarInterface {
    visible?: boolean;
}

export default function Sidebar({
    visible
}: SidebarInterface) {
    return (
        <aside className={`${styles.sidebar} ${!visible && styles.hide}`}>
            <div className={styles.logoOlei}>
                <Image
                    src={logoOlei}
                    alt={'olei crm'}
                    width={200}
                    height={200}
                    priority
                />
            </div>
            <nav>
                <ul>
                    <Link href={"/"}>
                        <FontAwesomeIcon icon={faCoffee} style={{ width: "16px", height: "16px" }} />
                        <p>Home</p>
                    </Link>

                    <Link href={"/dashboard"}>
                        <FontAwesomeIcon icon={faCoffee} style={{ width: "16px", height: "16px" }} />
                        <p>Dashboard</p>
                    </Link>

                    <Link href="/settings">
                        <FontAwesomeIcon icon={faCoffee} style={{ width: "16px", height: "16px" }} />
                        <p>Settings</p>
                    </Link>

                    <Link href="/profile">
                        <FontAwesomeIcon icon={faCoffee} style={{ width: "16px", height: "16px" }} />
                        <p>Profile</p>
                    </Link>

                </ul>
            </nav>
        </aside>
    )
}

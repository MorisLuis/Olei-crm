import React from 'react';
import styles from '../../styles/Navigation.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface SidebarInterface {
    visible?: boolean;
}

export default function Sidebar({
    visible
} : SidebarInterface ) {
    return (
        <aside className={`${styles.sidebar} ${ !visible && styles.hide }`}>
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

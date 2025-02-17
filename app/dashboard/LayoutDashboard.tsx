"use client";

import Sidebar from '@/components/navigation/sidebar'
import Topbar from '@/components/navigation/topbar'
import React, { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import styles from "../../styles/RootLayout.module.scss";

interface LayoutDashboardInterface {
    children: ReactNode
}

export default function LayoutDashboard({
    children
}: LayoutDashboardInterface) {

    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(!openMenu)

    return (
        <div className={styles.RootLayout}>

            {openMenu && <div id="back" className="modalBackground" onClick={handleOpenMenu}></div>}
            <Sidebar visible={openMenu} />

            <main className={styles.mainContent} id="mainPrimary">
                <Topbar openMenu={handleOpenMenu} />
                <div className={styles.mainbody}>
                    {children}
                </div>
            </main>
            <Toaster />
        </div>
    )
}

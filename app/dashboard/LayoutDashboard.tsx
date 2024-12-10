"use client";

import Sidebar from '@/components/navigation/sidebar'
import Topbar from '@/components/navigation/topbar'
import React, { ReactNode, useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '@/context/auth/AuthContext';
import styles from "../../styles/RootLayout.module.scss";

interface LayoutDashboardInterface {
    children: ReactNode
}

export default function LayoutDashboard({
    children
}: LayoutDashboardInterface) {

    const [openMenu, setOpenMenu] = useState(false);
    const handleOpenMenu = () => setOpenMenu(!openMenu)
    const { user } = useContext(AuthContext);


    return (
        <div className={styles.RootLayout}>

            {openMenu && <div id="back" className="modalBackground" onClick={handleOpenMenu}></div>}
            <Sidebar visible={openMenu} />

            <main className={styles.mainContent} id="mainPrimary">
                <Topbar openMenu={handleOpenMenu} />
                <div className={styles.mainbody}>
                    {children}
                    <div style={{
                            position: 'absolute',
                            right: '10px',
                            bottom: '10px',
                            width: '200px',
                            height: '200px',
                            backgroundColor: 'beige',
                            border: "1px solid black",
                            zIndex: 999999
                        }}>
                            <p>Id: {user.Id}</p>
                            <p>Id_Almacen: {user.Id_Almacen}</p>
                            <p>Id_Usuario: {user.Id_Usuario}</p>
                            <p>Nombre: {user.Nombre}</p>
                            <p>TipoUsuario: {user.TipoUsuario}</p>
                            <p>Vigencia: {user.Vigencia}</p>
                            <p>from: {user.from}</p>
                        </div>
                </div>
            </main>
            <Toaster />
        </div>
    )
}

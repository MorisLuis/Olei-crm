import { screenData } from '@/database/screens';
import React from 'react';

export async function generateMetadata() {
    const title = screenData.find((item) => item.name === 'Iniciar sesión')?.name || 'Default Title';
    const description = screenData.find((item) => item.name === 'Iniciar sesión')?.description || 'Default Description';

    return {
        title,
        description,
    };
}

export default function layoutLogin({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    )
}

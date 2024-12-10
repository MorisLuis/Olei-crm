
import type { Metadata } from "next";
import Head from "next/head";
import iconLogo from '../public/circle-solid.svg'
import '../styles/globals.scss'
import { SettingsProvider } from "@/context/Settings/SettingsProvider";
import NProgressComponent from "@/components/Nprogress";
import { AuthProvider } from "@/context/auth/AuthProvider";

export const metadata: Metadata = {
    title: "Olei CRM",
    description: "Dashboard layout with sidebar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <Head>
                <link rel="icon" href={iconLogo} />
            </Head>
            <body>
                <AuthProvider>
                    <SettingsProvider>
                        <NProgressComponent />
                        {children}
                    </SettingsProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

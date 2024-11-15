import type { Metadata } from "next";
import '../styles/globals.scss'
import Head from "next/head";
import LayoutDashboard from "./LayoutDashboard";
import iconLogo from '../public/circle-solid.svg'

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
      <LayoutDashboard>
        {children}
      </LayoutDashboard>
    </html>
  );
}

import type { Metadata } from "next";
import '../styles/globals.scss'
import Head from "next/head";
import LayoutDashboard from "./LayoutDashboard";

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
        <link rel="icon" href="/circle-solid.svg" />
      </Head>

      <LayoutDashboard>
        {children}
      </LayoutDashboard>
    </html>
  );
}

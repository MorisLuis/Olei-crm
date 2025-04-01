import type { Metadata } from "next";
import "../styles/globals.scss";
import ErrorBoundary from "@/components/ErrorBoundary";
import NProgressComponent from "@/components/Nprogress";
import { SettingsProvider } from "@/context/Settings/SettingsProvider";
import { AuthProvider } from "@/context/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Olei CRM",
  description: "Dashboard layout with sidebar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) : JSX.Element {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <AuthProvider>
            <SettingsProvider>
              <NProgressComponent />
              {children}
            </SettingsProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

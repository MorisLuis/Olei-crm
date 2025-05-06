'use client';

import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from "@/components/ErrorBoundary";
import NProgressComponent from "@/components/Nprogress";
import { SettingsProvider } from "@/context/Settings/SettingsProvider";
import { AuthProvider } from "@/context/auth/AuthProvider";


export const queryClient = new QueryClient();


export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AuthProvider>
              <SettingsProvider>
                <NProgressComponent />
                {children}
              </SettingsProvider>
            </AuthProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </body>
    </html>
  );
}

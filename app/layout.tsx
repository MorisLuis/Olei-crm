'use client';

import "../styles/globals.scss";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import NProgressComponent from "@/components/Nprogress";
import { MeetingEventsProvider } from "@/context/Meetings/MeetingsContext";
import { NavigationProvider } from "@/context/Navigation/NavigationContext";
import { SettingsProvider } from "@/context/Settings/SettingsProvider";
import { AuthProvider } from "@/context/auth/AuthProvider";


export const queryClient = new QueryClient();


export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <MeetingEventsProvider>
                <NavigationProvider>
                  <AuthProvider>
                    <SettingsProvider>
                      <NProgressComponent />
                      {children}
                      <div id="portal-root" />
                    </SettingsProvider>
                  </AuthProvider>
                </NavigationProvider>
              </MeetingEventsProvider>
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>

      </body>
    </html>
  );
}

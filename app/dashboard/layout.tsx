import type { Metadata } from 'next';
import LayoutDashboard from './LayoutDashboard';

export const metadata: Metadata = {
  title: 'Olei CRM',
  description: 'Dashboard layout with sidebar',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) : JSX.Element {
  return (
    <div>
      <LayoutDashboard>{children}</LayoutDashboard>
    </div>
  );
}

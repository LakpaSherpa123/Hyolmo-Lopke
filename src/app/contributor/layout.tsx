import type { ReactNode } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { BottomNavbar } from '@/components/layout/BottomNavbar';

export default function ContributorLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex md:flex-row flex-col min-h-screen">
        <AppSidebar />
        <main className="flex-1 pb-16 md:pb-0 bg-background">
          {children}
        </main>
        <BottomNavbar />
      </div>
    </SidebarProvider>
  );
}

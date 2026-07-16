import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { BottomNavbar } from '@/components/layout/BottomNavbar';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex md:flex-row flex-col min-h-screen">
        <AppSidebar />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
        </main>
        <BottomNavbar />
      </div>
    </SidebarProvider>
  );
}

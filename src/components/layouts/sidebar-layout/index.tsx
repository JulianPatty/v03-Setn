import { AppSidebar } from '@/components/layouts/sidebar-layout/app-sidebar';
import { AppTopbar } from '@/components/layouts/sidebar-layout/app-topbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        {/* Top bar spans full width */}
        <AppTopbar />
        
        {/* Sidebar and main content below top bar */}
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex h-full w-full flex-col overflow-hidden relative">
            <SidebarTrigger className="absolute z-10 top-4 left-4" />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
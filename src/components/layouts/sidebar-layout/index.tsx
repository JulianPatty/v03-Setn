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
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <AppTopbar />
          
          {/* Main content area */}
          <main className="flex h-full w-full flex-1 overflow-hidden relative">
            <SidebarTrigger className="absolute z-10 top-4 left-4" />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
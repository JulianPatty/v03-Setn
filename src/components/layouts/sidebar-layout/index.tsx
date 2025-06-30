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
      <AppSidebar />
      <main className="flex h-screen w-full flex-col overflow-hidden">
        <AppTopbar />
        <div className="relative flex-1">
          <SidebarTrigger className="absolute z-10 top-4 left-4" />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
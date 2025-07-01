import { AppSidebar } from '@/components/layouts/sidebar-layout/app-sidebar';
import { AppTopbar } from '@/components/layouts/sidebar-layout/app-topbar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gray-50">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
          <AppTopbar />
          
          {/* Main content area */}
          <main className="flex h-full w-full flex-1 overflow-hidden bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
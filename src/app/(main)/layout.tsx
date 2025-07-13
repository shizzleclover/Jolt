import AppSidebar from '@/components/layout/app-sidebar';
import BottomNav from '@/components/layout/bottom-nav';
import AppHeader from '@/components/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-muted/30 p-4 sm:p-6 lg:p-8">
              {children}
            </main>
            <BottomNav />
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

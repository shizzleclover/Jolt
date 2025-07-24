import AppSidebar from '@/components/layout/app-sidebar';
import BottomNav from '@/components/layout/bottom-nav';
import AppHeader from '@/components/layout/app-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { ProtectedRoute } from '@/components/auth-provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
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
              <main className="flex-1 overflow-y-auto bg-muted/30 p-2 sm:p-4 lg:p-6 xl:p-8">
                {children}
              </main>
              <BottomNav />
            </div>
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </ProtectedRoute>
  );
}

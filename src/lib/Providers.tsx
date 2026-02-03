import { DashboardSidebar } from "@/components/Shared/DashboardSidebar";
import { Header } from "@/components/Shared/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <Header title="Provider Dashboard" />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Providers;

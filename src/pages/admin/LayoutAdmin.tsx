import { AppSidebar } from '@/components/admin/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function LayoutAdmin() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </>
  )
}

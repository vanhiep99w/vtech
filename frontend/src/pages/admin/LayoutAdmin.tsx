import { AppSidebar } from '@/components/admin/app-sidebar'
import { ModeToggle } from '@/components/provider/MoodToggle'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AppAreaChart from '@/pages/admin/AppAreaChart'
import AppBarChart from '@/pages/admin/AppBarChart'
import AppPieChart from '@/pages/admin/AppPieChart'

export default function LayoutAdmin() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className='hidden md:block'>
                    <BreadcrumbLink href='#'>VTech</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='hidden md:block' />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
            <div className='grid auto-rows-min gap-4 md:grid-cols-4'>
              <div className='bg-primary-foreground p-4 rounded-sm lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppBarChart />
              </div>
              <div className='bg-primary-foreground p-4 rounded-sm'>Test</div>
              <div className='bg-primary-foreground p-4 rounded-sm'>
                <AppPieChart />
              </div>
              <div className='bg-primary-foreground p-4 rounded-sm'>Test</div>
              <div className='bg-primary-foreground p-4 rounded-sm lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
                <AppAreaChart />
              </div>
              <div className='bg-primary-foreground p-4 rounded-sm'>Test</div>
            </div>
            <div className='bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min' />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'></div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

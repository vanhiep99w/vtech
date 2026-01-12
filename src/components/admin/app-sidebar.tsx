import {
  AudioWaveform,
  Box,
  Command,
  GalleryVerticalEnd,
  ListCollapseIcon,
  MessageCircleMore,
  Settings,
  ShoppingCart,
  StickyNote,
  Tags,
  TicketPercent,
  Users2
} from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/admin/nav-main'
import { NavProjects } from '@/components/admin/nav-projects'
import { NavUser } from '@/components/admin/nav-user'
import { TeamSwitcher } from '@/components/admin/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  user: {
    name: 'VTech',
    email: 'vtech@gmail.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Products',
      url: '#',
      icon: Box,
      isActive: true,
      items: [
        {
          title: 'List Products',
          url: '#'
        },
        {
          title: 'Product Variant',
          url: '#'
        },
        {
          title: 'Colors',
          url: '#'
        },
        {
          title: 'Versions',
          url: '#'
        },
        {
          title: 'Specifications',
          url: '#'
        }
      ]
    },
    {
      title: 'Orders',
      url: '#',
      icon: ShoppingCart,
      items: [
        {
          title: 'Introduction',
          url: '#'
        },
        {
          title: 'Get Started',
          url: '#'
        },
        {
          title: 'Tutorials',
          url: '#'
        },
        {
          title: 'Changelog',
          url: '#'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Categories',
      url: '#',
      icon: ListCollapseIcon
    },
    {
      name: 'Blog',
      url: '#',
      icon: StickyNote
    },
    {
      name: 'Users',
      url: '#',
      icon: Users2
    },
    {
      name: 'Vouchers',
      url: '#',
      icon: TicketPercent
    },
    {
      name: 'Tags',
      url: '#',
      icon: Tags
    },
    {
      name: 'Reviews',
      url: '#',
      icon: MessageCircleMore
    },
    {
      name: 'Settings',
      url: '#',
      icon: Settings
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

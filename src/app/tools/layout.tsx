'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools } from '@/lib/tools';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { MountainIcon } from 'lucide-react';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-foreground group-data-[collapsible=icon]:hidden">
            <MountainIcon className="w-6 h-6 text-primary" />
            Toolzen
          </Link>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {tools.map((tool) => (
              <SidebarMenuItem key={tool.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === tool.href}
                  tooltip={{ children: tool.name, side: 'right' }}
                >
                  <Link href={tool.href}>
                    <tool.icon />
                    <span>{tool.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
          <div className="mx-auto w-full max-w-5xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

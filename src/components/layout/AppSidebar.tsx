"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  BookText,
  GraduationCap,
  LayoutGrid,
  LogOut,
  Mic,
  MoreVertical,
  Settings,
  Languages,
  Award,
  PlusCircle,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

export const navItems = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Home' },
  { href: '/dashboard/lessons', icon: GraduationCap, label: 'Learning Path' },
  { href: '/dashboard/alphabets', icon: BookText, label: 'Alphabets' },
  { href: '/dashboard/pronunciation', icon: Mic, label: 'AI Tutor' },
];

export const contributorItems = [
  { href: '/contributor/dashboard', icon: Award, label: 'My Impact' },
  { href: '/contributor/translate', icon: PlusCircle, label: 'Add Translation' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === 'collapsed';
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="p-4">
        <Logo isCollapsed={isCollapsed} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                    tooltip={item.label}
                    className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Contributor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contributorItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Avatar className="size-8">
            <AvatarImage src="https://picsum.photos/seed/tenzing/100" data-ai-hint="sherpa person" />
            <AvatarFallback>TN</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate font-semibold text-sm text-sidebar-foreground">
                Tenzing Norgay
              </p>
              <p className="truncate text-xs text-sidebar-foreground/70">
                Learner & Contributor
              </p>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`size-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

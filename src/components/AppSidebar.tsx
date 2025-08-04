import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Building2, Upload, CheckCircle, FileText, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Upload',
    url: '/',
    icon: Upload,
  },
  {
    title: 'Revisar',
    url: '/revisar',
    icon: FileText,
  },
  {
    title: 'Concluído',
    url: '/concluido',
    icon: CheckCircle,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar-background">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            {state !== 'collapsed' && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">CondoConta</h2>
                <p className="text-xs text-sidebar-foreground/60">Gestão Condominial</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider px-3 py-2">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`
                        text-sidebar-foreground/80 hover:text-sidebar-foreground 
                        hover:bg-sidebar-accent transition-colors
                        ${isActive ? 'bg-sidebar-accent text-sidebar-foreground font-medium' : ''}
                      `}
                    >
                      <NavLink to={item.url} className="flex items-center space-x-3">
                        <item.icon className="h-4 w-4" />
                        {state !== 'collapsed' && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
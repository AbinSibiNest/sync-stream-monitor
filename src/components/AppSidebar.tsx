
import { useState } from "react";
import { Database, ChevronRight, Briefcase, FileText, CreditCard, Building, Users, Scale, HelpCircle, Code, FolderOpen, MessageSquare } from "lucide-react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
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
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Migration Sync Config", icon: Database },
  { title: "Cases", icon: Briefcase },
  { title: "Requests", icon: FileText },
  { title: "Payments", icon: CreditCard },
  { title: "Firms", icon: Building },
  { title: "Customers", icon: Users },
  { title: "Defendants", icon: Scale },
  { title: "Case Types", icon: HelpCircle },
  { title: "Questionnaires", icon: FileText },
  { title: "Snippets", icon: Code },
  { title: "File Manager", icon: FolderOpen },
  { title: "Communications", icon: MessageSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#1e2328] border-r border-gray-700 mt-16`}>
      <SidebarContent className="bg-[#1e2328]">
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

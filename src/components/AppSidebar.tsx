
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
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
  const [isOpen, setIsOpen] = useState(true);

  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#1e2328] border-r border-gray-700 mt-16`}>
      <SidebarContent className="bg-[#1e2328]">
        <SidebarGroup className="px-3 py-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between text-gray-400 hover:text-gray-200 cursor-pointer group px-3 py-2 mb-2">
                <Typography variant="caption" className="text-xs uppercase tracking-wide font-semibold">
                  Migration Sync Config
                </Typography>
                {!collapsed && (
                  <ChevronRight className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
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
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

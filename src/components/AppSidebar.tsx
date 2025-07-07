
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  History,
  Settings,
  Database,
  ChevronRight,
} from "lucide-react";
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
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "File Upload", url: "/upload", icon: Upload },
  { title: "Migration History", url: "/history", icon: History },
  { title: "Configuration", url: "/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const collapsed = state === "collapsed";
  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = menuItems.some((item) => isActive(item.url));

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-gray-900 border-r border-gray-800`}>
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <Database className="h-8 w-8 text-purple-400" />
            {!collapsed && (
              <span className="text-xl font-bold text-gray-100">Migration Sync</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between text-gray-400 hover:text-gray-100 cursor-pointer group">
                <span>Migration Sync Config</span>
                {!collapsed && (
                  <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              isActive
                                ? "bg-purple-600 text-white"
                                : "text-gray-300 hover:text-white hover:bg-gray-800"
                            }`
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
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

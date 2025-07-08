
import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [isOpen, setIsOpen] = useState(true);

  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#1e2328] border-r border-gray-700`}>
      <SidebarContent className="bg-[#1e2328]">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-700 rounded-lg">
              <Database className="h-6 w-6 text-teal-400" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-lg font-bold text-gray-100">Migration Sync</div>
                <div className="text-xs text-gray-400">Data Processing Platform</div>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between text-gray-400 hover:text-gray-200 cursor-pointer group px-3 py-2 mb-2">
                <span className="text-xs uppercase tracking-wide font-semibold">Migration Sync Config</span>
                {!collapsed && (
                  <ChevronRight className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                )}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                              isActive
                                ? "bg-teal-600/20 text-white border border-teal-500/30 shadow-md"
                                : "text-gray-300 hover:text-gray-100 hover:bg-gray-700/50"
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!collapsed && (
                            <span className="text-sm font-medium truncate">{item.title}</span>
                          )}
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

import { useState } from "react";
import { Database, ChevronRight } from "lucide-react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function AppSidebar() {
  const { state } = useSidebar();
  const [isOpen, setIsOpen] = useState(true);

  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#1e2328] border-r border-gray-700 mt-16`}>
      <SidebarContent className="bg-[#1e2328]">
        <Box className="p-4 border-b border-gray-700">
          <Box className="flex items-center gap-3 mb-2">
            <Box className="p-2 bg-gray-700 rounded-lg">
              <Database className="h-6 w-6 text-teal-400" />
            </Box>
            {!collapsed && (
              <Box>
                <Typography variant="h6" className="text-lg font-bold text-gray-100">
                  Migration Sync
                </Typography>
                <Typography variant="caption" className="text-xs text-gray-400">
                  Data Processing Platform
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

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
                {/* Menu items removed as requested */}
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

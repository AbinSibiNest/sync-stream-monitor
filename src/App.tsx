
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/FileUpload";
import MigrationHistory from "./pages/MigrationHistory";
import RunDetail from "./pages/RunDetail";
import Configuration from "./pages/Configuration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const menuItems = [
  { title: "Dashboard", url: "/" },
  { title: "File Upload", url: "/upload" },
  { title: "Migration History", url: "/history" },
  { title: "Configuration", url: "/config" },
];

const AppContent = () => {
  const location = useLocation();
  
  const getCurrentMenuTitle = () => {
    const currentItem = menuItems.find(item => item.url === location.pathname);
    return currentItem ? currentItem.title : "Dashboard";
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-gray-950 text-gray-100">
      <header 
        className="h-16 flex items-center justify-between px-6 w-full"
        style={{ backgroundColor: 'rgb(0, 102, 124)' }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:text-gray-200" />
          <span className="text-white font-medium">John Doe</span>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="text-2xl font-bold text-white">
            V.
          </div>
        </div>
        
        <div className="text-white font-medium">
          {getCurrentMenuTitle()}
        </div>
      </header>
      
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/history" element={<MigrationHistory />} />
            <Route path="/run/:id" element={<RunDetail />} />
            <Route path="/config" element={<Configuration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <AppContent />
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

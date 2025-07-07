
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gray-950 text-gray-100">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-14 border-b border-gray-800 flex items-center px-4 bg-gray-900/50">
                <SidebarTrigger className="text-gray-400 hover:text-gray-100" />
                <h1 className="ml-4 text-lg font-semibold text-gray-100">Migration Sync Config</h1>
              </header>
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
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

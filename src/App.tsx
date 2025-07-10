import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import FileUpload from "./pages/FileUpload";
import PendingMigration from "./pages/PendingMigration";
import MigrationHistory from "./pages/MigrationHistory";
import RunDetail from "./pages/RunDetail";
import Configuration from "./pages/Configuration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#14b8a6',
    },
    background: {
      default: '#1a1f26',
      paper: '#1e2328',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getCurrentTab = () => {
    switch (location.pathname) {
      case "/": return "dashboard";
      case "/upload": return "upload";
      case "/pending": return "pending";
      case "/history": return "history";
      case "/config": return "config";
      default: return "dashboard";
    }
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case "dashboard": navigate("/"); break;
      case "upload": navigate("/upload"); break;
      case "pending": navigate("/pending"); break;
      case "history": navigate("/history"); break;
      case "config": navigate("/config"); break;
    }
  };

  // Handle special routes that don't need tabs
  if (location.pathname.startsWith("/run/")) {
    return (
      <div className="min-h-screen flex flex-col w-full bg-[#1a1f26] text-gray-100 dark">
        <header 
          className="h-16 flex items-center justify-between px-6 w-full border-b border-gray-700 fixed top-0 left-0 right-0 z-50"
          style={{ backgroundColor: 'rgb(0, 102, 124)' }}
        >
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:text-gray-200" />
            <span className="text-white font-medium">Migration Sync</span>
          </div>
          
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-2xl font-bold text-white">
              V.
            </div>
          </div>
          
          <div className="text-white font-medium">
            John Doe
          </div>
        </header>
        
        <div className="flex flex-1 pt-16">
          <AppSidebar />
          <main className="flex-1 p-6 bg-[#1a1f26]">
            <Routes>
              <Route path="/run/:id" element={<RunDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#1a1f26] text-gray-100 dark">
      <header 
        className="h-16 flex items-center justify-between px-6 w-full border-b border-gray-700 fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'rgb(0, 102, 124)' }}
      >
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:text-gray-200" />
          <span className="text-white font-medium">Migration Sync</span>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="text-2xl font-bold text-white">
            V.
          </div>
        </div>
        
        <div className="text-white font-medium">
          John Doe
        </div>
      </header>
      
      <div className="flex flex-1 pt-16">
        <AppSidebar />
        <main className="flex-1 bg-[#1a1f26]">
          <Tabs value={getCurrentTab()} onValueChange={handleTabChange} className="h-full flex flex-col">
            <div className="border-b border-gray-700 px-6">
              <TabsList className="grid w-full max-w-5xl grid-cols-5 bg-transparent h-12 p-0">
                <TabsTrigger 
                  value="dashboard" 
                  className="text-gray-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-teal-400 rounded-none h-12 hover:text-white transition-colors"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="upload" 
                  className="text-gray-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-teal-400 rounded-none h-12 hover:text-white transition-colors"
                >
                  File Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="text-gray-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-teal-400 rounded-none h-12 hover:text-white transition-colors"
                >
                  Pending Migration
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="text-gray-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-teal-400 rounded-none h-12 hover:text-white transition-colors"
                >
                  Migration History
                </TabsTrigger>
                <TabsTrigger 
                  value="config" 
                  className="text-gray-300 data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-teal-400 rounded-none h-12 hover:text-white transition-colors"
                >
                  Configuration
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 p-6">
              <TabsContent value="dashboard" className="h-full m-0">
                <Dashboard />
              </TabsContent>
              <TabsContent value="upload" className="h-full m-0">
                <FileUpload />
              </TabsContent>
              <TabsContent value="pending" className="h-full m-0">
                <PendingMigration />
              </TabsContent>
              <TabsContent value="history" className="h-full m-0">
                <MigrationHistory />
              </TabsContent>
              <TabsContent value="config" className="h-full m-0">
                <Configuration />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <AppContent />
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

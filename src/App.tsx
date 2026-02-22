import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientDashboard from "./pages/patient/Dashboard";
import PatientBooking from "./pages/patient/Booking";
import PatientNotifications from "./pages/patient/Notifications";
import DoctorLogin from "./pages/doctor/Login";
import DoctorQueue from "./pages/doctor/Queue";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/booking" element={<PatientBooking />} />
          <Route path="/patient/notifications" element={<PatientNotifications />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/queue" element={<DoctorQueue />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

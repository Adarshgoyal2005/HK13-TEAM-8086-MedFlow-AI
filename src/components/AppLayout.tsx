import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Home,
  Calendar,
  Bell,
  LogOut,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  Stethoscope,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
  role: "patient" | "doctor" | "admin";
}

const sidebarItems = {
  patient: [
    { label: "Dashboard", icon: Home, href: "/patient/dashboard" },
    { label: "Book Appointment", icon: Calendar, href: "/patient/booking" },
    { label: "Notifications", icon: Bell, href: "/patient/notifications" },
  ],
  doctor: [
    { label: "Queue", icon: ClipboardList, href: "/doctor/queue" },
    { label: "Patients", icon: Users, href: "/doctor/queue" },
  ],
  admin: [
    { label: "Dashboard", icon: BarChart3, href: "/admin/dashboard" },
    { label: "Settings", icon: Settings, href: "/admin/dashboard" },
  ],
};

const roleLabels = {
  patient: "Patient Portal",
  doctor: "Doctor Portal",
  admin: "Admin Command Center",
};

const roleIcons = {
  patient: Home,
  doctor: Stethoscope,
  admin: BarChart3,
};

export default function AppLayout({ children, role }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const items = sidebarItems[role];
  const RoleIcon = roleIcons[role];

  return (
    <div className="min-h-screen gradient-bg flex">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 fixed inset-y-0 left-0 z-40 glass-card border-r border-border/30 flex flex-col">
          <div className="p-6 border-b border-border/20">
            <Link to="/" className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="font-bold tracking-tight">
                Med<span className="text-primary">Flow</span>{" "}
                <span className="text-accent text-xs">AI</span>
              </span>
            </Link>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <RoleIcon className="w-3.5 h-3.5" />
              {roleLabels[role]}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {items.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border/20">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <LogOut className="w-4 h-4" />
              Exit Portal
            </Link>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!isMobile ? "ml-64" : ""} ${isMobile ? "pb-20" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Tab Bar */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/30 backdrop-blur-2xl">
          <div className="flex items-center justify-around h-16">
            {items.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
            <Link
              to="/"
              className="flex flex-col items-center gap-1 px-3 py-1 text-muted-foreground"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-medium">Exit</span>
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}

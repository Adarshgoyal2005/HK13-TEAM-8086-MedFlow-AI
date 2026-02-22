import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Zap, Clock, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  message: string;
  type: "optimization" | "update" | "complete";
  time: string;
}

const initialNotifications: Notification[] = [
  { id: 1, message: "Queue optimized — your wait time reduced by 8 min", type: "optimization", time: "2 min ago" },
  { id: 2, message: "Dr. Sharma is ready for your consultation", type: "complete", time: "5 min ago" },
  { id: 3, message: "AI rescheduled 3 patients ahead for faster flow", type: "update", time: "12 min ago" },
];

const liveMessages = [
  "AI detected low queue density — advancing your slot",
  "Emergency patient re-routed — queue position updated",
  "Consultation time predicted: 15 min",
  "Queue re-optimized — 2 patients moved to parallel track",
];

const typeIcons = {
  optimization: Zap,
  update: Clock,
  complete: CheckCircle2,
};

const typeColors = {
  optimization: "text-primary",
  update: "text-muted-foreground",
  complete: "text-accent",
};

export default function PatientNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = liveMessages[Math.floor(Math.random() * liveMessages.length)];
      const newNotif: Notification = {
        id: Date.now(),
        message: msg,
        type: "optimization",
        time: "Just now",
      };
      setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
      toast({ title: "🤖 AI Update", description: msg });
    }, 8000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <AppLayout role="patient">
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">AI Live Updates</h1>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Live
          </span>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {notifications.map((notif) => {
              const Icon = typeIcons[notif.type];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-4 rounded-xl flex items-start gap-3"
                >
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${typeColors[notif.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}

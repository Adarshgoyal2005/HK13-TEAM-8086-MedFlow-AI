import { motion } from "framer-motion";
import { Activity, Clock, CalendarCheck, TrendingUp } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const statusCards = [
  { label: "Upcoming Appointments", value: "2", icon: CalendarCheck, color: "text-primary" },
  { label: "Avg. Wait Time", value: "12 min", icon: Clock, color: "text-accent" },
  { label: "Health Score", value: "87%", icon: TrendingUp, color: "text-primary" },
];

export default function PatientDashboard() {
  return (
    <AppLayout role="patient">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-gradient">Alex</span>
          </h1>
          <p className="text-muted-foreground">Here's your health overview for today.</p>
        </motion.div>

        {/* Current Status */}
        <div className="glass-card p-6 rounded-2xl mb-8 neon-border">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Current Status</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              No active queue — You're all clear!
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          {statusCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-5 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, User, Zap } from "lucide-react";
import AppLayout from "@/components/AppLayout";

interface Patient {
  id: number;
  name: string;
  age: number;
  urgency: "critical" | "high" | "normal";
  predictedTime: string;
  complaint: string;
}

const patients: Patient[] = [
  { id: 1, name: "Ravi Kumar", age: 45, urgency: "critical", predictedTime: "8 min", complaint: "Chest pain" },
  { id: 2, name: "Priya Singh", age: 32, urgency: "high", predictedTime: "12 min", complaint: "Severe headache" },
  { id: 3, name: "Amit Patel", age: 58, urgency: "normal", predictedTime: "15 min", complaint: "Follow-up" },
  { id: 4, name: "Sara Khan", age: 27, urgency: "high", predictedTime: "10 min", complaint: "Breathing difficulty" },
  { id: 5, name: "Vijay Reddy", age: 63, urgency: "normal", predictedTime: "20 min", complaint: "Routine checkup" },
];

const urgencyConfig = {
  critical: { label: "Critical", className: "bg-destructive/15 text-destructive border-destructive/30" },
  high: { label: "High", className: "bg-primary/15 text-primary border-primary/30" },
  normal: { label: "Normal", className: "bg-accent/15 text-accent border-accent/30" },
};

export default function DoctorQueue() {
  const location = useLocation();
  const department = (location.state as { department?: string })?.department || "Cardiology";

  return (
    <AppLayout role="doctor">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{department}</h1>
            <p className="text-muted-foreground text-sm">Today's patient queue</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-accent">
            <Zap className="w-3.5 h-3.5" />
            AI-Optimized Queue
          </div>
        </div>

        <div className="space-y-3">
          {patients.map((patient, i) => {
            const urgency = urgencyConfig[patient.urgency];
            return (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card-hover p-5 rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{patient.name}</h3>
                      <span className="text-xs text-muted-foreground">Age {patient.age}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{patient.complaint}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide border ${urgency.className}`}
                    >
                      {patient.urgency === "critical" && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                      {urgency.label}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {patient.predictedTime}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

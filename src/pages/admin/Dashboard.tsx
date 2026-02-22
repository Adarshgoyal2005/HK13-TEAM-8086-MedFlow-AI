import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Clock, Zap, BarChart3, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import gsap from "gsap";

interface PatientRow {
  id: number;
  name: string;
  department: string;
  waitTime: number;
  urgency: number;
  status: string;
}

const initialPatients: PatientRow[] = [
  { id: 1, name: "Ravi Kumar", department: "Cardiology", waitTime: 45, urgency: 9, status: "Waiting" },
  { id: 2, name: "Priya Singh", department: "Neurology", waitTime: 30, urgency: 7, status: "Waiting" },
  { id: 3, name: "Amit Patel", department: "Orthopedics", waitTime: 60, urgency: 4, status: "Waiting" },
  { id: 4, name: "Sara Khan", department: "Emergency", waitTime: 15, urgency: 10, status: "Waiting" },
  { id: 5, name: "Vijay Reddy", department: "Cardiology", waitTime: 50, urgency: 3, status: "Waiting" },
  { id: 6, name: "Meera Joshi", department: "Pediatrics", waitTime: 25, urgency: 6, status: "Waiting" },
  { id: 7, name: "Arjun Nair", department: "Emergency", waitTime: 10, urgency: 8, status: "Waiting" },
  { id: 8, name: "Lakshmi Devi", department: "General", waitTime: 35, urgency: 5, status: "Waiting" },
];

const stats = [
  { label: "Total Patients", value: "142", icon: Users, color: "text-primary" },
  { label: "Avg. Wait Time", value: "23 min", icon: Clock, color: "text-accent" },
  { label: "AI Efficiency", value: "20.71%", icon: Zap, color: "text-primary" },
];

export default function AdminDashboard() {
  const [patients, setPatients] = useState(initialPatients);
  const [optimizing, setOptimizing] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleOptimize = useCallback(() => {
    if (optimizing) return;
    setOptimizing(true);

    const rows = tableRef.current?.querySelectorAll("[data-row]");
    if (rows) {
      gsap.to(rows, {
        opacity: 0.3,
        y: -5,
        stagger: 0.05,
        duration: 0.3,
        onComplete: () => {
          // Sort by urgency (desc) then waitTime (desc)
          setPatients((prev) =>
            [...prev].sort((a, b) => b.urgency - a.urgency || b.waitTime - a.waitTime)
          );

          requestAnimationFrame(() => {
            const newRows = tableRef.current?.querySelectorAll("[data-row]");
            if (newRows) {
              gsap.fromTo(
                newRows,
                { opacity: 0, y: 20, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  stagger: 0.08,
                  duration: 0.4,
                  ease: "back.out(1.2)",
                  onComplete: () => setOptimizing(false),
                }
              );
            }
          });
        },
      });
    }
  }, [optimizing]);

  return (
    <AppLayout role="admin">
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Command Center</h1>
            <p className="text-muted-foreground text-sm">Global overview & AI optimization</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-accent">
            <BarChart3 className="w-3.5 h-3.5" />
            Real-time Analytics
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-5 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Optimization Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-border/30">
            <h2 className="font-semibold">Live Patient Queue</h2>
            <Button
              onClick={handleOptimize}
              disabled={optimizing}
              size="sm"
              className="bg-primary text-primary-foreground"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              {optimizing ? "Optimizing..." : "Optimize with AI"}
            </Button>
          </div>

          <div ref={tableRef} className="divide-y divide-border/20">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Patient</span>
              <span>Department</span>
              <span className="flex items-center gap-1">
                Wait <ArrowUpDown className="w-3 h-3" />
              </span>
              <span className="flex items-center gap-1">
                Urgency <ArrowUpDown className="w-3 h-3" />
              </span>
              <span>Status</span>
            </div>

            {patients.map((patient) => (
              <div
                key={patient.id}
                data-row
                className="grid grid-cols-5 gap-4 px-5 py-4 text-sm hover:bg-secondary/30 transition-colors"
              >
                <span className="font-medium">{patient.name}</span>
                <span className="text-muted-foreground">{patient.department}</span>
                <span className="text-muted-foreground">{patient.waitTime} min</span>
                <span>
                  <span
                    className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      patient.urgency >= 8
                        ? "bg-destructive/15 text-destructive"
                        : patient.urgency >= 5
                        ? "bg-primary/15 text-primary"
                        : "bg-accent/15 text-accent"
                    }`}
                  >
                    {patient.urgency}/10
                  </span>
                </span>
                <span className="text-muted-foreground">{patient.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

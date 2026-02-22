import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Building2, CalendarDays, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/components/AppLayout";
import { useToast } from "@/hooks/use-toast";

const departments = ["Cardiology", "Emergency", "Orthopedics", "Neurology", "Pediatrics", "General Medicine"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const steps = [
  { label: "Details", icon: User },
  { label: "Department", icon: Building2 },
  { label: "Schedule", icon: CalendarDays },
];

export default function PatientBooking() {
  const [step, setStep] = useState(0);
  // States for MySQL and AI
  const [name, setName] = useState("");
  const [age, setAge] = useState(""); // CatBoost ke liye zaroori
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [priority, setPriority] = useState("Normal"); // RL Agent ke liye
  
  const { toast } = useToast();

  const handleSubmit = async () => {
    // Yahan humara MySQL/FastAPI Connection jayega
    toast({
      title: "Appointment Booked! 🚀",
      description: `${department} for ${name}. AI is calculating your wait time...`,
    });
    
    // Reset Form
    setStep(0);
    setName(""); setAge(""); setPhone(""); setDepartment(""); setTimeSlot("");
  };

  return (
    <AppLayout role="patient">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Book Your AI-Optimized Appointment
        </h1>

        {/* Step Indicator (Aapka original design) */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2 flex-1 min-w-[100px]">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${i <= step ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              </div>
              <span className={`text-xs font-medium ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-primary/40" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl"
          >
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold flex items-center gap-2"><User className="w-5 h-5 text-blue-400"/> Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="bg-white/5 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label>Age (Required for AI)</Label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" className="bg-white/5 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Triage Priority</Label>
                  <div className="flex gap-3">
                    {["Normal", "Urgent"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 p-3 rounded-xl border transition-all text-sm font-medium ${priority === p ? (p === 'Urgent' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-blue-500/20 border-blue-500 text-blue-400') : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                      >
                        {p === 'Urgent' ? '🚨 Urgent Case' : '🟢 Normal Flow'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Building2 className="w-5 h-5 text-emerald-400"/> Select Department</h2>
                <div className="grid grid-cols-2 gap-3">
                  {departments.map((dept) => (
                    <button key={dept} onClick={() => setDepartment(dept)} className={`p-4 rounded-xl text-sm font-medium text-left transition-all ${department === dept ? "bg-primary/20 border border-primary text-primary" : "bg-white/5 border border-white/10 hover:border-emerald-500/30"}`}>
                      {dept}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><CalendarDays className="w-5 h-5 text-purple-400"/> Choose Time</h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button key={slot} onClick={() => setTimeSlot(slot)} className={`p-3 rounded-xl text-sm font-medium transition-all ${timeSlot === slot ? "bg-primary/20 border border-primary text-primary" : "bg-white/5 border border-white/10 hover:border-purple-500/30"}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0} className="hover:bg-white/5">
            <ArrowLeft className="w-4 h-4 mr-2" /> Previous
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-4 h-4 mr-2" /> Confirm & Analyze
            </Button>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const departments = [
  "Cardiology",
  "Emergency",
  "Orthopedics",
  "Neurology",
  "Pediatrics",
  "General Medicine",
];

export default function DoctorLogin() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selected) {
      navigate("/doctor/queue", { state: { department: selected } });
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <div className="pt-32 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-2xl max-w-md w-full"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Doctor Login</h1>
              <p className="text-xs text-muted-foreground">Select your department to continue</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelected(dept)}
                className={`p-3 rounded-xl text-sm font-medium transition-all ${
                  selected === dept
                    ? "bg-accent/15 border border-accent/40 text-accent"
                    : "bg-secondary border border-border hover:border-accent/20 text-foreground"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <Button
            onClick={handleLogin}
            disabled={!selected}
            className="w-full bg-accent text-accent-foreground"
          >
            <LogIn className="w-4 h-4 mr-2" /> Enter Queue View
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

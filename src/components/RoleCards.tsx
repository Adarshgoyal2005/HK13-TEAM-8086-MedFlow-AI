import { Link } from "react-router-dom";
import { User, Stethoscope, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  {
    title: "Patient Portal",
    description: "Book appointments, view your health records, and receive AI-powered updates.",
    icon: User,
    href: "/patient/dashboard",
    gradient: "from-primary/20 to-primary/5",
    glowColor: "hover:shadow-[0_0_40px_hsl(191_100%_50%/0.2)]",
    iconColor: "text-primary",
  },
  {
    title: "Doctor Portal",
    description: "Manage patient queues, view AI predictions, and optimize consultations.",
    icon: Stethoscope,
    href: "/doctor/login",
    gradient: "from-accent/20 to-accent/5",
    glowColor: "hover:shadow-[0_0_40px_hsl(160_84%_39%/0.2)]",
    iconColor: "text-accent",
  },
  {
    title: "Admin Portal",
    description: "Monitor global stats, optimize workflows, and oversee AI efficiency.",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    gradient: "from-primary/15 via-accent/10 to-primary/5",
    glowColor: "hover:shadow-[0_0_40px_hsl(191_100%_50%/0.15)]",
    iconColor: "text-primary",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RoleCards() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6"
    >
      {roles.map((role) => (
        <motion.div key={role.title} variants={item}>
          <Link to={role.href} className="block group">
            <div
              className={`glass-card p-8 rounded-2xl bg-gradient-to-br ${role.gradient} transition-all duration-500 ${role.glowColor} hover:border-primary/30 hover:-translate-y-1`}
            >
              <div className="mb-6">
                <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center ${role.iconColor} group-hover:animate-pulse-glow transition-all`}>
                  <role.icon className="w-7 h-7" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {role.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Enter Portal →
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

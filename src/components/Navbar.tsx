import { Link, useLocation } from "react-router-dom";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About AI", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">
            Med<span className="text-primary">Flow</span>{" "}
            <span className="text-accent text-sm font-medium">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

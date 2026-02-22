import { Suspense } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RoleCards from "@/components/RoleCards";
import Heart3D from "@/components/Heart3D";

export default function Index() {
  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                AI-Powered Healthcare
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-foreground">Welcome to</span>
                <br />
                <span className="text-gradient">MedFlow AI</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Next-generation healthcare management powered by artificial intelligence. 
                Streamline patient flow, optimize queues, and deliver exceptional care.
              </p>
            </motion.div>

            {/* Right - 3D */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[400px] lg:h-[500px]"
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }
              >
                <Heart3D />
              </Suspense>
            </motion.div>
          </div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold mb-2">Select Your Portal</h2>
            <p className="text-muted-foreground">Choose your role to get started</p>
          </motion.div>

          <RoleCards />
        </div>
      </section>
    </div>
  );
}

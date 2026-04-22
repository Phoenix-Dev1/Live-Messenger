"use client";

import { motion } from "framer-motion";

const AmbientBackground = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f172a] flex items-center justify-center p-12">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 40, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-[50%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#60a5fa]/20 via-[#3b82f6]/10 to-transparent blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#93c5fd]/15 via-transparent to-transparent blur-3xl pointer-events-none mix-blend-screen"
      />
      <div className="z-10 text-white w-full max-w-4xl space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300"
        >
          Communication.<br/>Refined.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-slate-300 text-lg md:text-xl font-medium tracking-wide max-w-md"
        >
          A minimalist sanctuary for your most important conversations. No clutter, just connection.
        </motion.p>
      </div>
      {/* Decorative architectural lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/10" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-white/10" />
    </div>
  );
};

export default AmbientBackground;

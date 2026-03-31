import { motion } from "motion/react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          x: [0, 100, 0, -100, 0],
          y: [0, -50, 50, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-brand-accent/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 270, 180, 90, 0],
          x: [0, -100, 0, 100, 0],
          y: [0, 50, -50, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-brand-accent/10 rounded-full blur-3xl"
      />
      <div className="absolute inset-0 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />
    </div>
  );
}

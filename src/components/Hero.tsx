import { motion } from "motion/react";
import { ArrowRight, PenTool, Zap, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-template-columns:1fr_1fr gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 bg-brand-accent/10 text-brand-accent font-mono text-sm rounded-full mb-6">
            AVAILABLE FOR NEW PROJECTS
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8">
            CRAFTING <br />
            <span className="text-brand-accent">IDENTITIES</span> <br />
            THAT STICK.
          </h1>
          <p className="text-xl text-brand-black/70 max-w-lg mb-10 leading-relaxed">
            I help brands stand out through minimalist, impactful, and timeless logo design. 
            Transforming your vision into a visual legacy.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="brutal-btn bg-brand-accent text-white flex items-center gap-2"
            >
              View Portfolio <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="brutal-btn bg-white"
            >
              My Process
            </motion.button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black">50+</span>
              <span className="text-sm font-mono opacity-60">LOGOS CREATED</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black">1+</span>
              <span className="text-sm font-mono opacity-60">YEARS EXP</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black">100%</span>
              <span className="text-sm font-mono opacity-60">SATISFACTION</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="w-full aspect-square brutal-border bg-white p-8 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Logo Shape */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-64 h-64 border-8 border-brand-accent rounded-full flex items-center justify-center"
             >
               <div className="w-32 h-32 bg-brand-black rounded-lg transform rotate-45" />
             </motion.div>
             
             {/* Floating Elements */}
             <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="absolute top-10 right-10 glass p-4 brutal-border"
             >
               <PenTool className="text-brand-accent" />
             </motion.div>
             <motion.div 
               animate={{ y: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute bottom-20 left-10 glass p-4 brutal-border"
             >
               <Zap className="text-brand-accent" />
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

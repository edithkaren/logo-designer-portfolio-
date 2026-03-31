import { motion } from "motion/react";
import { Palette, Layers, Box, Send } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Brand Identity",
      description: "Complete visual systems including logos, color palettes, and typography guidelines.",
      icon: <Palette className="w-8 h-8" />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Logo Redesign",
      description: "Modernizing existing identities while preserving core brand values and recognition.",
      icon: <Layers className="w-8 h-8" />,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "3D Mockups",
      description: "Realistic visualizations of your logo on physical products and environmental spaces.",
      icon: <Box className="w-8 h-8" />,
      color: "bg-brand-accent/10 text-brand-accent",
    },
    {
      title: "Social Kits",
      description: "Optimized assets for all social media platforms to ensure consistent brand presence.",
      icon: <Send className="w-8 h-8" />,
      color: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <section id="services" className="py-20 px-6 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-brand-accent mb-4 block">WHAT I OFFER</span>
            <h2 className="text-5xl md:text-7xl font-black">SERVICES</h2>
          </div>
          <p className="text-white/60 max-w-md text-lg">
            I provide comprehensive design solutions that help businesses communicate their 
            unique value through powerful visual storytelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-white/10 hover:border-brand-accent transition-colors group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

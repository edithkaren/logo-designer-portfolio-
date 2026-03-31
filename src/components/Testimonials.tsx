import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CEO, TechFlow",
      text: "The logo redesign completely transformed our brand perception. It's minimalist yet says everything about our speed and efficiency.",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    }, 
    {
      name: "Marcus Thorne",
      role: "Founder, EcoRoot",
      text: "Working with the designer was a breeze. They understood our sustainability values and translated them into a timeless mark.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Elena Rossi",
      role: "Creative Director, Vibe",
      text: "Impactful, versatile, and bold. The new identity system has been a game-changer for our social media presence.",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  return (
    <section className="py-20 px-6 bg-brand-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-mono text-brand-accent mb-4 block uppercase tracking-widest">Client Feedback</span>
          <h2 className="text-5xl md:text-6xl font-black">TESTIMONIALS</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white brutal-border relative"
            >
              <Quote className="absolute top-4 right-4 text-brand-accent/20 w-12 h-12" />
              <p className="text-lg italic mb-8 relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full brutal-border"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold">{t.name}</h4>
                  <p className="text-sm opacity-50 font-mono">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

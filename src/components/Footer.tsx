import { motion } from "motion/react";
import { Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-brand-black/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-2">
          <div className="text-3xl font-display font-black tracking-tighter mb-6">
            LOGO<span className="text-brand-accent">DESIGN</span>
          </div>
          <p className="text-xl text-brand-black/60 max-w-md mb-8">
            Let's build something iconic together. Reach out for collaborations or just to say hi.
          </p>
          <div className="flex gap-4">
            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
              <motion.a
                key={i}
                href="https://instagram.com/rudraksh.paliwal22"
                whileHover={{ y: -5, color: "#ff4e00" }}
                className="w-12 h-12 brutal-border bg-white flex items-center justify-center transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6 uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-4 font-mono text-sm">
            <li><a href="#portfolio" className="hover:text-brand-accent transition-colors">PORTFOLIO</a></li>
            <li><a href="#services" className="hover:text-brand-accent transition-colors">SERVICES</a></li>
            <li><a href="#about" className="hover:text-brand-accent transition-colors">ABOUT ME</a></li>
            <li><a href="#contact" className="hover:text-brand-accent transition-colors">CONTACT</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-xl mb-6 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-4 font-mono text-sm">
            <li className="opacity-60">EMAIL</li>
            <li className="font-bold">hello@rudrakshdesign.com</li>
            <li className="opacity-60 mt-4">LOCATION</li>
            <li className="font-bold">Indore, MP</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs opacity-40">© 2026 LOGODESIGN PRO. ALL RIGHTS RESERVED.</p>
        <p className="font-mono text-xs opacity-40">DESIGNED WITH PASSION.</p>
      </div>
    </footer>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ExternalLink, Calendar, User } from "lucide-react";

interface Project {
  title: string;
  category: string;
  img: string;
  description: string;
  client: string;
  year: string;
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    { 
      title: "Vibrant Tech", 
      category: "Branding", 
      img: "https://picsum.photos/seed/tech/800/600",
      description: "A complete brand overhaul for a Silicon Valley startup focusing on sustainable energy solutions. We created a dynamic visual language that reflects their innovative spirit.",
      client: "Vibrant Energy Co.",
      year: "2025"
    },
    { 
      title: "Eco Leaf", 
      category: "Logo", 
      img: "https://picsum.photos/seed/nature/800/600",
      description: "Minimalist logo design for an organic skincare brand. The leaf symbol represents growth and purity, while the custom typography adds a touch of modern elegance.",
      client: "EcoLeaf Organics",
      year: "2024"
    },
    { 
      title: "Urban Pulse", 
      category: "Branding", 
      img: "https://picsum.photos/seed/urban/800/600",
      description: "Identity design for a metropolitan lifestyle magazine. The 'U' and 'P' are integrated into a rhythmic pattern that mimics the heartbeat of the city.",
      client: "Pulse Media Group",
      year: "2024"
    },
    { 
      title: "Nova Space", 
      category: "3D", 
      img: "https://picsum.photos/seed/space/800/600",
      description: "3D visualization and branding for a private aerospace firm. We developed a series of high-fidelity renders showing the brand integrated into futuristic space habitats.",
      client: "Nova Aerospace",
      year: "2025"
    },
    { 
      title: "Pure Flow", 
      category: "Logo", 
      img: "https://picsum.photos/seed/water/800/600",
      description: "A fluid, dynamic logo for a premium bottled water company. The mark uses negative space to suggest a continuous stream of pure, refreshing water.",
      client: "Flow Hydration",
      year: "2023"
    },
    { 
      title: "Bold Move", 
      category: "3D", 
      img: "https://picsum.photos/seed/fitness/800/600",
      description: "3D product mockups and brand identity for a high-performance fitness equipment brand. The visuals emphasize strength, durability, and cutting-edge design.",
      client: "Bold Fitness",
      year: "2024"
    },
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-brand-accent mb-4 block">SELECTED WORKS</span>
            <h2 className="text-5xl md:text-7xl font-black">PORTFOLIO</h2>
          </div>
          <div className="flex flex-wrap gap-4">
             {["All", "Branding", "Logo", "3D"].map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setFilter(cat)}
                 className={`px-4 py-2 font-mono text-sm border-b-2 transition-all ${
                   filter === cat ? "border-brand-accent text-brand-accent" : "border-transparent opacity-50 hover:opacity-100"
                 }`}
               >
                 {cat.toUpperCase()}
               </button>
             ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden brutal-border bg-white cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.img} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6 text-center">
                    <span className="font-mono text-xs mb-2 text-brand-accent">{project.category.toUpperCase()}</span>
                    <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                    <div className="brutal-btn bg-brand-accent text-white py-2 px-4 text-sm">
                      VIEW DETAILS
                    </div>
                  </div>
                </div>
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-sm font-mono opacity-50">{project.category}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-brand-black flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-white brutal-border overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white brutal-border flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <span className="font-mono text-brand-accent mb-2 block">{selectedProject.category.toUpperCase()}</span>
                <h2 className="text-4xl md:text-5xl font-black mb-6">{selectedProject.title}</h2>
                
                <p className="text-lg text-brand-black/70 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono opacity-50 uppercase">Client</p>
                      <p className="font-bold text-sm">{selectedProject.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono opacity-50 uppercase">Year</p>
                      <p className="font-bold text-sm">{selectedProject.year}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full brutal-btn bg-brand-accent text-white flex items-center justify-center gap-2">
                  Visit Website <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

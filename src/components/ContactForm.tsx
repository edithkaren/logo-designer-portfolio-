import { motion } from "motion/react";
import { Send, Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "New Logo Project",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    // Simulate API call
    setTimeout(() => setStatus("success"), 1500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-brand-black text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <span className="font-mono text-brand-accent mb-4 block">GET IN TOUCH</span>
          <h2 className="text-5xl md:text-7xl font-black mb-8">LET'S TALK <br /> DESIGN.</h2>
          <p className="text-xl text-white/60 mb-12 max-w-md">
            Have a project in mind? Or just want to say hello? 
            Fill out the form and I'll get back to you within 24 hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Mail className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm opacity-50 font-mono">EMAIL</p>
                <p className="font-bold">hello@logodesign.pro</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Phone className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm opacity-50 font-mono">PHONE</p>
                <p className="font-bold">+1 (555) 000-1234</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <MapPin className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm opacity-50 font-mono">LOCATION</p>
                <p className="font-bold">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 brutal-border text-brand-black">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <Send size={40} />
              </div>
              <h3 className="text-3xl font-black mb-4">MESSAGE SENT!</h3>
              <p className="text-brand-black/60 mb-8">
                Thank you for reaching out. I'll get back to you very soon.
              </p>
              <button 
                onClick={() => {
                  setStatus("idle");
                  setFormData({ name: "", email: "", subject: "New Logo Project", message: "" });
                }}
                className="brutal-btn bg-brand-accent text-white"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase font-bold">Name</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    placeholder="John Doe"
                    className={`w-full bg-brand-white brutal-border px-4 py-3 focus:outline-none ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs uppercase font-bold">Email</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="john@example.com"
                    className={`w-full bg-brand-white brutal-border px-4 py-3 focus:outline-none ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase font-bold">Subject</label>
                <select 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-brand-white brutal-border px-4 py-3 focus:outline-none appearance-none"
                >
                  <option>New Logo Project</option>
                  <option>Brand Identity</option>
                  <option>Redesign</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-mono text-xs uppercase font-bold">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className={`w-full bg-brand-white brutal-border px-4 py-3 focus:outline-none resize-none ${errors.message ? "border-red-500" : ""}`}
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 font-mono flex items-center gap-1">
                    <AlertCircle size={10} /> {errors.message}
                  </p>
                )}
              </div>
              <button 
                type="submit"
                disabled={status === "sending"}
                className="w-full brutal-btn bg-brand-accent text-white flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "sending" ? "SENDING..." : "SEND MESSAGE"} <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

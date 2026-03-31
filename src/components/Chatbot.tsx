import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, User, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm the LogoDesign Pro assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const MAX_CHARS = 200;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) {
      setError("Please enter a message");
      return;
    }
    if (input.length > MAX_CHARS) {
      setError(`Message too long (max ${MAX_CHARS} chars)`);
      return;
    }
    if (isLoading) return;

    setError(null);
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are "LogoBot", the highly creative and professional AI assistant for a world-class logo designer. 
            The designer's style is minimalist, timeless, and impactful.
            
            Key Information:
            - Services: Brand Identity (full systems), Logo Redesign (modernizing), 3D Mockups (visualizations), and Social Kits (assets).
            - Values: Simplicity, Versatility, and Scalability.
            - Process: Discovery -> Concept -> Refinement -> Delivery.
            - Pricing: Custom quotes based on project scope.
            
            Guidelines:
            - Be professional yet creative and slightly bold (brutalist style).
            - If asked about pricing, suggest booking a discovery call.
            - If asked about the designer's name, refer to them as "The Designer".
            - Keep responses concise and helpful.
            
            User Query: ${userMessage}` }],
          },
        ],
      });

      const botText = response.text || "I'm sorry, I couldn't process that.";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "bot", text: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] glass brutal-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand-black text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-display font-bold">Design Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-accent">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-brand-accent text-white rounded-tr-none"
                        : "bg-white/50 brutal-border rounded-tl-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-mono">
                      {msg.role === "user" ? <User size={10} /> : <Bot size={10} />}
                      {msg.role}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/50 brutal-border p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-black/30 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-black/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-black/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-brand-black/10 bg-white/30">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (error) setError(null);
                    }}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about my services..."
                    className={`flex-1 bg-white brutal-border px-4 py-2 text-sm focus:outline-none ${
                      error ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-brand-accent text-white p-2 brutal-border hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center px-1">
                  {error ? (
                    <span className="text-[10px] text-red-500 font-mono">{error}</span>
                  ) : (
                    <span className="text-[10px] opacity-30 font-mono">
                      {input.length}/{MAX_CHARS}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-lg brutal-border"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </motion.button>
    </div>
  );
}

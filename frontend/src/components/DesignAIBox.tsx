'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, Bot, Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function DesignAIBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Welcome to Moha Interiors. I am your AI Design Architect. How may I assist in conceptualizing your space today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/ai/consult`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: userMsg })
            });

            const data = await response.json();
            if (data.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.advice }]);
            } else {
                throw new Error();
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "My apologies, I am having trouble reaching our design registry. Please contact our human concierge." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 bg-mutedGold text-charcoal p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold font-inter text-sm group"
            >
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-[150px] transition-all duration-500 whitespace-nowrap">AI Design Consult</span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-24 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] bg-charcoal-light border border-offWhite/10 rounded-sm shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 bg-charcoal border-b border-offWhite/10 flex justify-between items-center">
                            <div>
                                <h3 className="font-playfair text-xl text-offWhite flex items-center gap-2">
                                    <Sparkles size={18} className="text-mutedGold" />
                                    Design Registry
                                </h3>
                                <p className="text-[10px] text-mutedGold uppercase tracking-widest font-bold">AI Architect | Online</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-coolGrey hover:text-offWhite transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                            {messages.map((msg, i) => (
                                <div key={i} className={clsx("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                                    <div className={clsx(
                                        "max-w-[85%] p-4 text-sm leading-relaxed rounded-sm",
                                        msg.role === 'user'
                                            ? "bg-mutedGold text-charcoal"
                                            : "bg-offWhite/5 text-offWhite border border-offWhite/10"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] uppercase tracking-tighter text-coolGrey mt-1">
                                        {msg.role === 'user' ? 'Client' : 'AI Architect'}
                                    </span>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-offWhite/5 p-4 rounded-sm border border-offWhite/10">
                                        <Loader2 size={18} className="text-mutedGold animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-charcoal border-t border-offWhite/10">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about materials, styles, or concepts..."
                                    className="w-full bg-offWhite/5 border border-offWhite/10 rounded-sm py-3 pl-4 pr-12 text-sm text-offWhite placeholder:text-coolGrey focus:border-mutedGold outline-none transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-mutedGold hover:text-offWhite transition-colors disabled:opacity-30"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

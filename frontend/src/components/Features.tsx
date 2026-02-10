'use client';

import { motion } from 'framer-motion';
import { Cpu, Globe, Image as ImageIcon, Search, Zap, Layers, BarChart3, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
    {
        title: 'Research Intelligence',
        description: 'AgentX doesnt just write. It researches the live web using advanced semantic search to find facts, data, and trends.',
        icon: Search,
        className: 'md:col-span-2 lg:col-span-1',
        color: 'text-emerald-400'
    },
    {
        title: 'Visual Synthesis',
        description: 'Every blog is paired with high-definition, contextual AI imagery generated on-the-fly.',
        icon: ImageIcon,
        className: 'md:col-span-1 lg:col-span-1',
        color: 'text-blue-400'
    },
    {
        title: 'SEO Autopilot',
        description: 'Schema markup, meta tags, and keyword density are handled automatically for maximum authority.',
        icon: Globe,
        className: 'md:col-span-1 lg:col-span-1',
        color: 'text-purple-400'
    },
    {
        title: 'Gemini 2.0 Core',
        description: 'Powered by the most capable LLMs for human-like reasoning and flawless technical writing.',
        icon: Cpu,
        className: 'md:col-span-2 lg:col-span-2',
        color: 'text-orange-400'
    }
];

export default function Features() {
    return (
        <section id="features" className="py-32 bg-[#020617] relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6 block"
                        >
                            Capabilities
                        </motion.span>
                        <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Built for <span className="text-gradient">Content Dominance.</span>
                        </h3>
                    </div>
                    <p className="text-slate-500 max-w-sm mb-2 font-medium">
                        Why settle for basic AI when you can have a dedicated agent architecting your brand?
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "group relative p-10 rounded-[32px] glass border-white/5 hover:border-emerald-500/20 transition-all duration-700 overflow-hidden",
                                feature.className
                            )}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <feature.icon size={120} />
                            </div>

                            <div className={cn("w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500", feature.color)}>
                                <feature.icon className="w-6 h-6" />
                            </div>

                            <h4 className="text-2xl font-black text-white mb-4 tracking-tighter">{feature.title}</h4>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                {feature.description}
                            </p>

                            <div className="mt-8 flex items-center gap-2 text-white/40 group-hover:text-emerald-400 transition-colors text-[10px] font-black tracking-widest uppercase">
                                Explore Tech <BarChart3 size={12} />
                            </div>
                        </motion.div>
                    ))}

                    {/* Bento Box Extra */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="md:col-span-3 lg:col-span-3 glass-emerald bg-emerald-500/5 p-12 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-10 border-emerald-500/10 hover:border-emerald-500/30 transition-all"
                    >
                        <div className="max-w-lg">
                            <h4 className="text-3xl font-black text-white mb-4 tracking-tight">Zero Fluff. All Authority.</h4>
                            <p className="text-emerald-100/60 leading-relaxed">
                                Our agent follows a unique multi-step reasoning protocol. It summarizes competing viewpoints, verifies technical claims, and ensures every paragraph adds value. No generic AI repetitions.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 animate-pulse"><Fingerprint size={24} /></div>
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 animate-pulse delay-75"><Zap size={24} /></div>
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 animate-pulse delay-150"><Layers size={24} /></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

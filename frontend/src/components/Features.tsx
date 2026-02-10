'use client';

import { motion } from 'framer-motion';
import { Cpu, Brain, Sparkles, Target, Zap, Globe, Share2, Shield, Search, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Features() {
    const features = [
        {
            title: 'Neural Web Synthesis',
            desc: 'Autonomous agents scan thousands of digital nodes to build a factual foundation.',
            icon: Brain,
            color: 'text-accent-blue',
            bg: 'bg-accent-blue/5',
        },
        {
            title: 'Dynamic GEO Context',
            desc: 'Optimize for Next-Gen search by aligning content with intent and authority.',
            icon: Target,
            color: 'text-accent-purple',
            bg: 'bg-accent-purple/5',
        },
        {
            title: 'Holographic Visuals',
            desc: 'Every node generates custom-branded neural imagery with high-def precision.',
            icon: Zap,
            color: 'text-accent-magenta',
            bg: 'bg-accent-magenta/5',
        }
    ];

    return (
        <section id="features" className="py-40 relative bg-bg-dark overflow-hidden">
            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-32">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-accent-blue font-black uppercase tracking-[0.5em] text-[11px] mb-8 block"
                    >
                        Intelligence Core
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase"
                    >
                        Harness AI Consulting to <br />
                        <span className="text-gradient">Accelerate Growth.</span>
                    </motion.h2>
                </div>

                {/* Grid Visual (Screenshot 3 Style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-[48px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative glass-card p-14 rounded-[48px] border-white/10 transition-all duration-700 bg-bg-surface/40 hover:translate-y-[-10px]">
                                <div className={cn("w-20 h-20 rounded-[28px] flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110", feature.bg)}>
                                    <feature.icon className={cn("w-10 h-10", feature.color)} />
                                </div>
                                <h3 className="text-3xl font-black text-white mb-6 tracking-tight uppercase">{feature.title}</h3>
                                <p className="text-slate-500 text-lg font-bold leading-relaxed">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Massive Branding Row (Screenshot 2 influence) */}
                <div className="mt-40 pt-20 border-t border-white/5">
                    <p className="text-center text-[10px] text-slate-600 font-black uppercase tracking-[0.5em] mb-12">Trusted by 120+ Global Agencies</p>
                    <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 grayscale hover:grayscale-0 transition-all">
                        {['Retool', 'Remote', 'Arc', 'Raycast', 'Runway'].map((brand) => (
                            <span key={brand} className="text-3xl font-black text-white italic tracking-tighter">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

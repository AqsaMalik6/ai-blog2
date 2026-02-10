'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Play, Zap, Shield, Cpu, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 400], [0, 100]);
    const y2 = useTransform(scrollY, [0, 400], [0, -100]);

    return (
        <div className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020617]">
            {/* Dynamic Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            {/* Pulsing Orbs */}
            <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
            <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-700" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 text-emerald-400 text-[11px] font-black tracking-[0.2em] uppercase mb-12 shadow-2xl"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Next-Gen Agentic Content Engine
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter mb-10 selection:bg-emerald-500"
                >
                    DESIGN <br />
                    <span className="text-gradient">FASTER.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-medium"
                >
                    Transform raw ideas into high-ranking search authority. AgentX combines real-time deep research with industry-leading Gemini 2.0 intelligence.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/workspace"
                        className="group relative px-10 py-5 bg-white text-black rounded-2xl font-black flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10">START GENERATING</span>
                        <ArrowDownRight className="w-5 h-5 relative z-10 transition-transform group-hover:rotate-45" />
                    </Link>

                    <Link
                        href="#how-it-works"
                        className="px-10 py-5 glass hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black flex items-center gap-3 transition-all hover:border-emerald-500/50"
                    >
                        <Play className="w-4 h-4 fill-white" />
                        VIEW DEMO
                    </Link>
                </motion.div>

                {/* Tech Stack Floaties */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 max-w-4xl mx-auto opacity-40">
                    <div className="flex items-center gap-3 justify-center text-white font-bold tracking-widest text-[10px] uppercase border font-mono border-white/5 p-4 rounded-xl">
                        <Cpu size={14} className="text-emerald-500" /> GEMINI 2.0
                    </div>
                    <div className="flex items-center gap-3 justify-center text-white font-bold tracking-widest text-[10px] uppercase border font-mono border-white/5 p-4 rounded-xl">
                        <Zap size={14} className="text-blue-500" /> FAST API
                    </div>
                    <div className="flex items-center gap-3 justify-center text-white font-bold tracking-widest text-[10px] uppercase border font-mono border-white/5 p-4 rounded-xl">
                        <Shield size={14} className="text-purple-500" /> SECURE AI
                    </div>
                    <div className="flex items-center gap-3 justify-center text-white font-bold tracking-widest text-[10px] uppercase border font-mono border-white/5 p-4 rounded-xl">
                        <Zap size={14} className="text-yellow-500" /> SEO READY
                    </div>
                </div>
            </div>

            {/* Decorative Scan Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-emerald-500/5 to-transparent border-b border-emerald-500/10" />
        </div>
    );
}

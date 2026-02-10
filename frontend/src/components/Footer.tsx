'use client';

import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    <div className="md:col-span-4 lg:col-span-5">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="bg-emerald-500 p-2.5 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">AGENTX</span>
                        </Link>
                        <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-md font-medium">
                            Architecting the next generation of content distribution via autonomous AI agents and deep web research.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Linkedin, MessageCircle].map((Icon, idx) => (
                                <Link key={idx} href="#" className="w-12 h-12 glass flex items-center justify-center rounded-xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all group">
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div>
                            <h5 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Platform</h5>
                            <ul className="space-y-5 text-slate-400 font-bold text-sm">
                                <li><Link href="#features" className="hover:text-white transition-colors flex items-center gap-2">Features <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100" /></Link></li>
                                <li><Link href="/workspace" className="hover:text-white transition-colors">Workspace</Link></li>
                                <li><Link href="/blogs" className="hover:text-white transition-colors">AI Feed</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">API Docs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Ecosystem</h5>
                            <ul className="space-y-5 text-slate-400 font-bold text-sm">
                                <li><Link href="#" className="hover:text-white transition-colors">Gemini Core</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">FastAPI</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">PostgreSQL</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Next.js</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-white font-black text-[11px] uppercase tracking-[0.2em] mb-8">Social</h5>
                            <ul className="space-y-5 text-slate-400 font-bold text-sm">
                                <li><Link href="#" className="hover:text-white transition-colors">Twitter (X)</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">LinkedIn</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Email</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:row items-center justify-between gap-8">
                    <p className="text-slate-600 text-[11px] font-black uppercase tracking-[0.1em] text-center md:text-left">
                        © 2026 AGENTX RESEARCH. HANDCRAFTED FOR PERFORMANCE.
                    </p>
                    <div className="flex gap-10">
                        <span className="text-[10px] text-slate-700 uppercase tracking-widest font-black flex items-center gap-2 animate-pulse">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> LIVE SYSTEM
                        </span>
                        <span className="text-[10px] text-slate-700 uppercase tracking-widest font-black">Lighthouse 95+</span>
                        <span className="text-[10px] text-slate-700 uppercase tracking-widest font-black">AEO Optimized</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

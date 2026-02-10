'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Menu, X, ArrowRight, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    const opacity = useTransform(scrollY, [0, 100], [0.5, 1]);
    const blur = useTransform(scrollY, [0, 100], [0, 8]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
                isScrolled ? 'py-3' : 'bg-transparent'
            )}
        >
            <motion.div
                style={{ opacity, backdropFilter: `blur(${blur}px)` }}
                className={cn(
                    "max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500",
                    isScrolled ? "glass shadow-2xl shadow-emerald-500/10 border-white/10" : "bg-transparent border-transparent"
                )}
            >
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-emerald-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-bg-dark p-2 rounded-lg border border-emerald-500/20 group-hover:rotate-12 transition-transform duration-300">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white">
                        AGENT<span className="text-emerald-500">X</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <div className="flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-slate-400">
                        <Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link>
                        <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors">Process</Link>
                        <Link href="/blogs" className="hover:text-emerald-400 transition-colors">Insights</Link>
                    </div>

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    <div className="flex items-center gap-4">
                        <Link href="https://github.com" className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Github size={20} />
                        </Link>
                        <Link
                            href="/workspace"
                            className="relative group overflow-hidden bg-white text-black px-6 py-2.5 rounded-xl font-bold transition-all hover:pr-10"
                        >
                            <span className="relative z-10 text-[13px]">LAUNCH APP</span>
                            <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 glass rounded-xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:hidden absolute top-24 left-6 right-6 glass p-8 rounded-3xl flex flex-col gap-6 border border-white/10 shadow-3xl"
                >
                    <Link href="#features" className="text-xl font-bold text-white border-b border-white/5 pb-4" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                    <Link href="#how-it-works" className="text-xl font-bold text-white border-b border-white/5 pb-4" onClick={() => setIsMobileMenuOpen(false)}>Process</Link>
                    <Link href="/blogs" className="text-xl font-bold text-white border-b border-white/5 pb-4" onClick={() => setIsMobileMenuOpen(false)}>Insights</Link>
                    <Link
                        href="/workspace"
                        className="bg-emerald-500 text-white p-5 rounded-2xl text-center font-black"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        GO TO WORKSPACE
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}

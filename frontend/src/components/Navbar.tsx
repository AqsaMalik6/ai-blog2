'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                isScrolled ? 'glass py-3' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-emerald p-2 rounded-xl group-hover:rotate-12 transition-transform">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-white text-clip [-webkit-text-fill-color:transparent] bg-gradient-to-r from-emerald-400 to-blue-400">
                        BlogAgent AI
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-emerald-400 transition-colors">How it Works</Link>
                    <Link href="/blogs" className="hover:text-emerald-400 transition-colors">Our Blogs</Link>
                    <Link
                        href="/workspace"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full transition-all pulse-emerald"
                    >
                        Go to Workspace
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 glass mt-2 p-6 flex flex-col gap-4 border-t border-white/10"
                >
                    <Link href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                    <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
                    <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)}>Our Blogs</Link>
                    <Link
                        href="/workspace"
                        className="bg-emerald-500 text-white px-5 py-3 rounded-xl text-center"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Go to Workspace
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}

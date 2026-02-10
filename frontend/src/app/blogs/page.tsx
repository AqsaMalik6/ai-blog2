'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogApi, Blog } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Filter, LayoutGrid, List as ListIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await blogApi.getAll();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || blog.topic.includes(activeCategory); // Dummy filter logic
        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-[#020617]">
            <Navbar />

            {/* Search & Header Section */}
            <section className="pt-40 pb-20 border-b border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[120px]" />

                <div className="container max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-white/10 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6"
                            >
                                <Sparkles size={12} /> The Intelligence Feed
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
                                Autonomous <br /> <span className="text-gradient">Insights.</span>
                            </h1>
                        </div>

                        <div className="w-full lg:max-w-md">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[28px] blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                <div className="relative bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden flex items-center px-6 py-2 transition-all group-focus-within:border-emerald-500/50">
                                    <Search className="text-slate-500" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search query archives..."
                                        className="w-full bg-transparent border-none focus:ring-0 py-4 px-4 text-white font-medium placeholder:text-slate-600"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sub Navigation / Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        {['All', 'AI Research', 'Design', 'Development', 'Case Studies'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all",
                                    activeCategory === cat ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 scale-105" : "glass text-slate-400 hover:text-white hover:border-white/20"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="flex-1" />
                        <div className="flex gap-2 p-1 glass rounded-2xl">
                            <button className="p-2 text-white bg-white/10 rounded-xl"><LayoutGrid size={18} /></button>
                            <button className="p-2 text-slate-500 hover:text-white transition-colors"><ListIcon size={18} /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-20">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {loading ? (
                                [1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-[500px] rounded-[40px] bg-white/5 animate-pulse border border-white/5" />
                                ))
                            ) : filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, idx) => (
                                    <motion.div
                                        key={blog.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group"
                                    >
                                        <Link href={`/blogs/${blog.id}`} className="block">
                                            <div className="relative glass rounded-[40px] overflow-hidden border-white/5 group-hover:border-emerald-500/30 transition-all duration-700 bg-white/[0.02]">
                                                {/* High-end Mock Cover */}
                                                <div className="relative h-[300px] overflow-hidden bg-[#0f172a]">
                                                    {/* Decorative Elements */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] group-hover:scale-110 transition-transform duration-[2s]">
                                                        <Sparkles size={200} className="text-white" />
                                                    </div>
                                                    <div className="absolute bottom-6 left-6 flex gap-2">
                                                        <div className="px-3 py-1 glass border-white/20 rounded-lg text-[10px] font-black text-white uppercase tracking-wider">AI Generated</div>
                                                        <div className="px-3 py-1 glass border-white/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-wider">V3.2 Engine</div>
                                                    </div>
                                                </div>

                                                <div className="p-10">
                                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 font-mono">
                                                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-emerald-500" /> {formatDate(blog.timestamp)}</span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                        <span className="flex items-center gap-1.5"><User size={12} className="text-emerald-500" /> SYSTEM-X</span>
                                                    </div>

                                                    <h3 className="text-2xl font-black text-white mb-6 line-clamp-2 leading-tight tracking-tight group-hover:text-emerald-400 transition-colors">
                                                        {blog.topic}
                                                    </h3>

                                                    <p className="text-slate-500 font-medium line-clamp-2 mb-10 text-[15px] leading-relaxed">
                                                        {blog.content.replace(/[#*]/g, '').substring(0, 120)}...
                                                    </p>

                                                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                                        <span className="text-[11px] font-black uppercase tracking-widest text-white group-hover:text-emerald-400 flex items-center gap-2">
                                                            RESEARCH LOG <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                        <div className="h-2 w-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-400 transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-40 text-center">
                                    <h4 className="text-white font-black text-2xl mb-4">No data streams found.</h4>
                                    <p className="text-slate-500 font-medium">Your search query returned zero results from our archives.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

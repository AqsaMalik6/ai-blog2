'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogApi, Blog } from '@/lib/api';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, User, Clock, Share2, ArrowLeft, Bookmark, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogs = await blogApi.getAll();
                const found = blogs.find(b => b.id.toString() === resolvedParams.id);
                setBlog(found || null);
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [resolvedParams.id]);

    if (loading) {
        return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-black tracking-widest uppercase">STREAMING_CONTENT...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white gap-8 p-6 text-center">
                <h1 className="text-6xl font-black tracking-tighter">DATA UNAVAILABLE.</h1>
                <p className="text-slate-500 font-medium max-w-sm">The requested blog index does not exist in our current knowledge graph.</p>
                <Link href="/blogs" className="glass px-8 py-4 rounded-2xl text-emerald-400 font-black flex items-center gap-2 hover:bg-white/5 transition-all">
                    <ArrowLeft size={18} /> RETURN TO FEED
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#020617] selection:bg-emerald-500 selection:text-white">
            <Navbar />

            {/* Scroll Progress Bar */}
            <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 z-[60] origin-left" style={{ scaleX }} />

            <div className="pt-40 pb-20">
                <div className="container max-w-4xl mx-auto px-6">
                    <Link href="/blogs" className="inline-flex items-center gap-3 text-slate-500 hover:text-emerald-400 font-black text-[11px] uppercase tracking-[0.2em] mb-12 group transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO INTELLIGENCE FEED
                    </Link>

                    {/* Article Header */}
                    <header className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="px-3 py-1 glass border-white/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase tracking-wider">AI RESEARCH PAPER</div>
                                <div className="h-px w-8 bg-white/10" />
                                <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-wider"><Globe size={12} /> PUBLIC DOMAIN</div>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                                {blog.topic}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 text-slate-500 border-y border-white/5 py-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-[20px] bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-sm uppercase tracking-widest">AGENTX CORE</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">VERIFIED ANALYSIS</p>
                                    </div>
                                </div>

                                <div className="hidden md:block h-10 w-px bg-white/10" />

                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">PUBLISH_DATE</span>
                                    <span className="flex items-center gap-2 text-sm text-slate-300 font-bold"><Calendar size={14} className="text-emerald-500" /> {formatDate(blog.timestamp)}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">EST_READ_TIME</span>
                                    <span className="flex items-center gap-2 text-sm text-slate-300 font-bold"><Clock size={14} className="text-emerald-500" /> {Math.ceil(blog.content.length / 800)} MINS</span>
                                </div>

                                <div className="flex-1" />

                                <div className="flex gap-3">
                                    <button className="w-12 h-12 glass flex items-center justify-center rounded-2xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Share2 size={18} /></button>
                                    <button className="w-12 h-12 glass flex items-center justify-center rounded-2xl text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all"><Bookmark size={18} /></button>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* Featured Visual */}
                    <div className="relative w-full h-[500px] mb-20 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-[48px] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative w-full h-full bg-[#0f172a] rounded-[48px] border border-white/10 overflow-hidden flex items-center justify-center ai-scan-line">
                            <Sparkles className="text-white/[0.03] absolute" size={400} />
                            <div className="relative z-10 text-center">
                                <p className="text-emerald-400/40 font-black text-8xl md:text-[140px] tracking-tighter leading-none select-none uppercase">ANALYSIS</p>
                            </div>
                        </div>
                    </div>

                    {/* Article Content */}
                    <article className="relative">
                        <div className="prose prose-invert prose-emerald max-w-none">
                            <div className="text-slate-300 leading-[1.8] text-xl md:text-2xl space-y-10 font-medium tracking-tight">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ node, ...props }) => <h2 className="text-4xl font-black text-white mt-20 mb-10 tracking-tighter border-l-4 border-emerald-500 pl-8" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-2xl font-black text-white mt-12 mb-6 tracking-tight" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-8" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="space-y-4 my-10 list-none" {...props} />,
                                        li: ({ node, ...props }) => (
                                            <li className="flex gap-4 items-start" {...props}>
                                                <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                                <span>{props.children}</span>
                                            </li>
                                        ),
                                        blockquote: ({ node, ...props }) => <blockquote className="glass border-l-4 border-emerald-500 p-10 rounded-3xl my-16 text-white italic font-bold" {...props} />
                                    }}
                                >
                                    {blog.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </article>

                    {/* Related Posts Bottom Section */}
                    <section className="mt-40 pt-20 border-t border-white/5">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-4xl font-black text-white tracking-tighter">Next for you.</h3>
                            <Link href="/blogs" className="text-emerald-400 font-black text-[11px] uppercase tracking-widest hover:underline">See all insights</Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: 'The Algorithm of Ethics in Modern LLM Deployments', category: 'RESEARCH' },
                                { title: 'Scaling Autonomous Content via Agentic Workflows', category: 'CASE STUDY' }
                            ].map((item, i) => (
                                <div key={i} className="group p-10 glass rounded-[40px] border-white/5 hover:border-emerald-500/20 transition-all cursor-pointer">
                                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">{item.category}</span>
                                    <h4 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors tracking-tight leading-tight mb-8">{item.title}</h4>
                                    <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                        READ_LOG <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}

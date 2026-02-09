'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogApi, Blog } from '@/lib/api';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

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
        return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">Loading...</div>;
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-white gap-4">
                <h1 className="text-4xl font-bold">Blog not found</h1>
                <Link href="/blogs" className="text-emerald-400 hover:underline flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Feed
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-bg-dark">
            <Navbar />

            <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to feed
                </Link>

                {/* Article Header */}
                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight"
                    >
                        {blog.topic}
                    </motion.h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 border-y border-white/5 py-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">AI Blog Agent</p>
                                <p className="text-xs">Expert Insights</p>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10 hidden md:block" />
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar size={18} className="text-emerald-500" />
                            {formatDate(blog.timestamp)}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Clock size={18} className="text-emerald-500" />
                            {Math.ceil(blog.content.length / 1000)} min read
                        </div>
                        <div className="flex-1" />
                        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors text-sm font-bold text-white">
                            <Share2 size={18} /> Share
                        </button>
                    </div>
                </header>

                {/* Featured Image (Mocked or real if available) */}
                <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-[40px] mb-12 flex items-center justify-center border border-white/5">
                    <span className="text-white/20 font-black text-8xl md:text-[120px] select-none uppercase tracking-tighter">FEATURED</span>
                </div>

                {/* Content */}
                <article className="prose prose-invert prose-emerald max-w-none">
                    <div className="text-slate-300 leading-loose text-lg space-y-6">
                        <ReactMarkdown>
                            {blog.content}
                        </ReactMarkdown>
                    </div>
                </article>

                {/* Related Posts Section (Dynamic) */}
                <section className="mt-32 pt-20 border-t border-white/10">
                    <h3 className="text-3xl font-bold text-white mb-12">Recommended for you</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 glass rounded-3xl border-white/5">
                            <span className="text-emerald-400 font-bold text-xs uppercase mb-4 block">Next Read</span>
                            <h4 className="text-xl font-bold text-white mb-4">Leveraging LLMs for Rapid Content Deployment</h4>
                            <Link href="/blogs" className="text-sm font-bold text-emerald-400 hover:underline">Explore more →</Link>
                        </div>
                        <div className="p-8 glass rounded-3xl border-white/5">
                            <span className="text-blue-400 font-bold text-xs uppercase mb-4 block">Case Study</span>
                            <h4 className="text-xl font-bold text-white mb-4">How AI Increased SEO Traffic by 400%</h4>
                            <Link href="/blogs" className="text-sm font-bold text-emerald-400 hover:underline">Read Now →</Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}

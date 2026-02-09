'use client';

import { useState, useEffect } from 'react';
import WorkspaceSidebar from '@/components/workspace/Sidebar';
import { blogApi, chatApi, Message } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Save, Share, Edit3, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast, { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function WorkspacePage() {
    const [selectedChatId, setSelectedChatId] = useState<number | undefined>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Advanced options (Optional UX enrichment)
    const [tone, setTone] = useState('Professional');
    const [wordCount, setWordCount] = useState('1000');

    useEffect(() => {
        if (selectedChatId && selectedChatId !== -1) {
            loadMessages(selectedChatId);
        } else {
            setMessages([]);
        }
    }, [selectedChatId]);

    const loadMessages = async (chatId: number) => {
        try {
            const data = await chatApi.getMessages(chatId);
            setMessages(data);
        } catch (error) {
            toast.error('Failed to load messages');
        }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error('Please enter a topic');
            return;
        }

        setIsGenerating(true);
        const loadingToast = toast.loading('Agent is researching and writing your blog...');

        try {
            const result = await blogApi.generate(
                `${topic} (Tone: ${tone}, Approx ${wordCount} words)`,
                selectedChatId === -1 ? undefined : selectedChatId
            );

            if (result.success) {
                toast.dismiss(loadingToast);
                toast.success('Blog generated successfully!');
                setSelectedChatId(result.chat_id);

                // Refresh messages
                loadMessages(result.chat_id);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Generation failed. Please try again.');
        } finally {
            setIsGenerating(false);
            setTopic('');
        }
    };

    return (
        <div className="flex h-screen bg-bg-dark text-white overflow-hidden">
            <Toaster position="top-right" />
            <WorkspaceSidebar
                onSelectChat={(id) => setSelectedChatId(id)}
                selectedChatId={selectedChatId}
            />

            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="p-6 border-b border-white/5 flex items-center justify-between glass z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold">AI Workspace</h1>
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Powered by Gemini 2.0</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white" title="Save Draft">
                            <Save size={20} />
                        </button>
                        <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-white" title="Publish">
                            <Share size={20} />
                        </button>
                    </div>
                </header>

                {/* Workspace Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {!selectedChatId || selectedChatId === -1 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
                            >
                                <div className="w-24 h-24 bg-emerald-500/10 rounded-[32px] flex items-center justify-center text-emerald-400 mb-8 border border-emerald-500/20">
                                    <Edit3 size={40} />
                                </div>
                                <h2 className="text-4xl font-black mb-4">What are we <span className="text-gradient">creating today?</span></h2>
                                <p className="text-slate-400 mb-12">
                                    Enter a topic below to start generating high-quality blogs, articles, or case studies. Our AI will research the web and provide references.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    {['Latest AI Trends', 'Modern Web Design', 'Future of Energy', 'Remote Work Hacks'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTopic(t)}
                                            className="p-6 glass rounded-3xl border-white/5 hover:border-emerald-500/30 text-left transition-all group"
                                        >
                                            <p className="text-xs text-slate-500 font-bold uppercase mb-2">Suggestion</p>
                                            <p className="font-bold group-hover:text-emerald-400 transition-colors">{t}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="max-w-4xl mx-auto space-y-12 pb-32"
                            >
                                {messages.map((msg, idx) => (
                                    <div key={msg.id} className={cn(
                                        "flex flex-col gap-4",
                                        msg.role === 'user' ? "items-end" : "items-start"
                                    )}>
                                        <div className={cn(
                                            "max-w-[90%] p-6 rounded-3xl shadow-2xl",
                                            msg.role === 'user'
                                                ? "bg-emerald-500 text-white rounded-tr-none"
                                                : "glass border-white/5 rounded-tl-none"
                                        )}>
                                            <div className="prose prose-invert prose-emerald text-sm md:text-base leading-relaxed">
                                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                                            </div>

                                            {msg.image_url && (
                                                <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 group relative">
                                                    <img
                                                        src={msg.image_url}
                                                        alt="AI Generated"
                                                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                                    />
                                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <a href={msg.image_url} download className="bg-black/60 backdrop-blur-md p-2 rounded-xl text-white">
                                                            <ImageIcon size={16} />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">{msg.role} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                ))}

                                {isGenerating && (
                                    <div className="flex flex-col gap-4 items-start">
                                        <div className="glass p-8 rounded-3xl rounded-tl-none border-white/5 w-full flex flex-col items-center justify-center gap-4">
                                            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                                            <p className="text-slate-400 font-medium animate-pulse">Agent is thinking...</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Bar */}
                <div className="p-6 md:px-12 md:pb-12 absolute bottom-0 left-0 right-0 z-30">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />

                        <div className="relative glass border-white/5 group-focus-within:border-emerald-500/30 p-2 rounded-[32px] flex flex-col gap-2">
                            <div className="flex items-center gap-3 px-6 pt-4 overflow-x-auto pb-2 scrollbar-hide">
                                <select
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase py-1.5 px-3 focus:outline-none focus:border-emerald-500/50"
                                >
                                    <option>Professional</option>
                                    <option>Casual</option>
                                    <option>Formal</option>
                                    <option>Witty</option>
                                </select>
                                <select
                                    value={wordCount}
                                    onChange={(e) => setWordCount(e.target.value)}
                                    className="bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase py-1.5 px-3 focus:outline-none focus:border-emerald-500/50"
                                >
                                    <option value="500">Short (500)</option>
                                    <option value="1000">Standard (1k)</option>
                                    <option value="2000">Deep-Dive (2k)</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <textarea
                                    rows={1}
                                    placeholder="Enter your blog topic..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleGenerate())}
                                    className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-white text-lg placeholder:text-slate-600 resize-none max-h-40"
                                />
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !topic.trim()}
                                    className={cn(
                                        "mr-2 p-4 rounded-3xl transition-all shadow-xl",
                                        isGenerating || !topic.trim() ? "bg-white/5 text-slate-600" : "bg-emerald-500 text-white hover:bg-emerald-600 animate-pulse-emerald"
                                    )}
                                >
                                    <Send size={24} className={isGenerating ? "animate-bounce" : ""} />
                                </button>
                            </div>
                        </div>
                        <p className="text-center text-[10px] text-slate-600 mt-4 uppercase tracking-[0.2em]">Verified AI Agent Core v3.2 • Secure Connection</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

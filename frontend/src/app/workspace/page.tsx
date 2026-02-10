'use client';

import { useState, useEffect, useRef } from 'react';
import WorkspaceSidebar from '@/components/workspace/Sidebar';
import { blogApi, chatApi, Message } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Save, Share, Image as ImageIcon, Zap, Target, Key, Hash, FileText, ChevronDown, Terminal } from 'lucide-react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import toast, { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function WorkspacePage() {
    const [selectedChatId, setSelectedChatId] = useState<number | undefined>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Advanced Settings State
    const [tone, setTone] = useState('Professional');
    const [audience, setAudience] = useState('General');
    const [keywords, setKeywords] = useState('');
    const [wordCount, setWordCount] = useState('1000');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedChatId && selectedChatId !== -1) { loadMessages(selectedChatId); }
        else { setMessages([]); }
    }, [selectedChatId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isGenerating]);

    const loadMessages = async (chatId: number) => {
        try {
            const data = await chatApi.getMessages(chatId);
            setMessages(data);
        } catch (_error) { toast.error('Failed to load buffer.'); }
    };

    const handleGenerate = async () => {
        if (!topic.trim()) { toast.error('PROTOCOL_ERROR: TOPIC_REQUIRED'); return; }

        setIsGenerating(true);
        const loadingToast = toast.loading('Initializing AgentX Research Protocols...');

        try {
            const prompt = `Topic: ${topic}\nTone: ${tone}\nAudience: ${audience}\nKeywords: ${keywords}\nLength: ${wordCount} words`;
            const result = await blogApi.generate(prompt, selectedChatId === -1 ? undefined : selectedChatId);

            if (result.success) {
                toast.dismiss(loadingToast);
                toast.success('BLOG_SYNTHESIS_COMPLETE');
                setSelectedChatId(result.chat_id);
                loadMessages(result.chat_id);
            }
        } catch (_error) {
            toast.dismiss(loadingToast);
            toast.error('CONNECTION_INTERRUPTED');
        } finally {
            setIsGenerating(false);
            setTopic('');
        }
    };

    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans">
            <Toaster position="top-center" toastOptions={{ style: { background: '#0f172a', color: '#fff', border: '1px solid rgba(16,185,129,0.2)' } }} />
            <WorkspaceSidebar onSelectChat={(id) => setSelectedChatId(id)} selectedChatId={selectedChatId} />

            <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95">

                {/* Top Command Bar */}
                <header className="px-8 py-5 border-b border-white/5 flex items-center justify-between glass z-40">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg">
                            <Zap size={22} className="animate-pulse" />
                        </div>
                        <div>
                            <h1 className="font-black text-lg uppercase tracking-wider">COMMAND_CENTER</h1>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Live Research Data Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex gap-6 mr-6 items-center border-r border-white/10 pr-6">
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Latency</p>
                                <p className="text-xs font-mono text-emerald-400">22ms</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Engine</p>
                                <p className="text-xs font-mono text-blue-400">V3.2_PRO</p>
                            </div>
                        </div>
                        <button className="w-11 h-11 glass flex items-center justify-center rounded-xl text-slate-400 hover:text-white transition-all"><Save size={18} /></button>
                        <button className="w-11 h-11 glass flex items-center justify-center rounded-xl text-slate-400 hover:text-white transition-all"><Share size={18} /></button>
                    </div>
                </header>

                {/* Viewport */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-16 space-y-16 custom-scrollbar scroll-smooth">
                    <AnimatePresence mode="wait">
                        {!selectedChatId || selectedChatId === -1 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="h-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
                            >
                                <div className="w-32 h-32 bg-emerald-500/5 rounded-[48px] flex items-center justify-center text-emerald-400 mb-10 border border-emerald-500/10 relative ai-scan-line">
                                    <Terminal size={56} className="relative z-10" />
                                    <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Initialize <span className="text-gradient">Synthesis.</span></h2>
                                <p className="text-slate-500 text-lg mb-16 max-w-xl font-medium leading-relaxed">
                                    Enter your core parameters. Our agent will bridge the gap between abstract thought and ranking authority.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    {[
                                        { t: 'Future of Neural Architectures', desc: 'Detailed analysis of 2026 AI breakthroughs.' },
                                        { t: 'Brutalist Design in SaaS', desc: 'Visual identity guide for modern startups.' },
                                        { t: 'Zero-Knowledge Proofs 101', desc: 'Complexity reduction for crypto beginners.' },
                                        { t: 'Scaling Agentic Workflows', desc: 'Implementation guide for autonomous teams.' }
                                    ].map(item => (
                                        <button
                                            key={item.t}
                                            onClick={() => setTopic(item.t)}
                                            className="p-8 glass rounded-[32px] border-white/5 hover:border-emerald-500/30 text-left transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:scale-125 transition-transform"><Sparkles size={40} /></div>
                                            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-4">SUGGESTED_SEED</p>
                                            <p className="text-xl font-black mb-2 tracking-tight transition-colors group-hover:text-emerald-400">{item.t}</p>
                                            <p className="text-slate-600 text-xs font-bold leading-relaxed">{item.desc}</p>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16 pb-48">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={cn("flex flex-col gap-6", msg.role === 'user' ? "items-end" : "items-start")}>
                                        <div className={cn(
                                            "max-w-[92%] p-10 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border transition-all duration-500",
                                            msg.role === 'user'
                                                ? "bg-white text-black border-white rounded-tr-none hover:rotate-1"
                                                : "glass border-white/5 rounded-tl-none hover:-rotate-1"
                                        )}>
                                            <div className={cn(
                                                "prose prose-invert max-w-none leading-[1.7] text-lg font-medium",
                                                msg.role === 'user' ? "text-slate-900" : "text-slate-200"
                                            )}>
                                                <ReactMarkdown
                                                    components={{
                                                        h1: ({ ...props }) => <h1 className="text-3xl font-black mb-8 border-l-4 border-emerald-500 pl-4" {...props} />,
                                                        h2: ({ ...props }) => <h2 className="text-2xl font-black mb-6 mt-12" {...props} />,
                                                        p: ({ ...props }) => <p className="mb-6" {...props} />
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>

                                            {msg.image_url && (
                                                <div className="mt-12 rounded-[32px] overflow-hidden border border-white/10 group relative ai-scan-line">
                                                    <Image src={msg.image_url} alt="AI Synthesis" width={800} height={600} className="w-full h-auto object-cover transition-transform duration-[2s] group-hover:scale-110" />
                                                    <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="bg-white/10 backdrop-blur-3xl p-4 rounded-2xl text-white hover:bg-emerald-500 transition-colors"><ImageIcon size={20} /></button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 px-6">
                                            <div className={cn("w-1.5 h-1.5 rounded-full", msg.role === 'user' ? "bg-white" : "bg-emerald-500")} />
                                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-none">
                                                {msg.role} {'//'} {new Date(msg.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                {isGenerating && (
                                    <div className="flex flex-col gap-6 items-start">
                                        <div className="glass p-12 rounded-[40px] rounded-tl-none border-white/5 w-full flex flex-col items-center justify-center gap-8 relative overflow-hidden ai-scan-line">
                                            <Loader2 className="w-16 h-16 text-emerald-500 animate-spin" />
                                            <div className="text-center">
                                                <p className="text-white font-black uppercase text-xl tracking-tighter mb-2">Architecting Knowledge Grid...</p>
                                                <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Live Web Research in Progress</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Input Terminal */}
                <div className="p-6 md:px-12 md:pb-12 absolute bottom-0 left-0 right-0 z-40">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 via-blue-500/40 to-purple-500/40 rounded-[40px] blur-2xl opacity-0 group-focus-within:opacity-40 transition-opacity duration-700" />

                        <div className="relative glass border-white/10 group-focus-within:border-emerald-500/50 p-3 rounded-[40px] shadow-3xl flex flex-col gap-2">

                            {/* Controls Expandable */}
                            <AnimatePresence>
                                {showAdvanced && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden border-b border-white/5"
                                    >
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                                            <div className="space-y-3">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><Sparkles size={10} /> Tone</label>
                                                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-emerald-500/50">
                                                    {['Professional', 'Witty', 'Casual', 'Formal', 'Brutalist'].map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><Target size={10} /> Audience</label>
                                                <select value={audience} onChange={(e) => setAudience(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-emerald-500/50">
                                                    {['General', 'Technical', 'C-Suite', 'Beginners', 'Experts'].map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><Key size={10} /> Keywords</label>
                                                <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="comma, separated" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-emerald-500/50" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2"><FileText size={10} /> Size</label>
                                                <select value={wordCount} onChange={(e) => setWordCount(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-emerald-500/50">
                                                    {['500', '1000', '1500', '2500'].map(t => <option key={t} value={t}>{t} words</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className={cn(
                                        "ml-4 p-4 rounded-2xl transition-all",
                                        showAdvanced ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-500 hover:bg-white/10"
                                    )}
                                >
                                    <ChevronDown size={20} className={cn("transition-transform", showAdvanced && "rotate-180")} />
                                </button>

                                <textarea
                                    rows={1}
                                    placeholder="Enter seed topic..."
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleGenerate())}
                                    className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-6 text-white text-[17px] font-bold placeholder:text-slate-700 resize-none max-h-40"
                                />

                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !topic.trim()}
                                    className={cn(
                                        "m-2 p-5 rounded-[28px] transition-all shadow-2xl flex items-center justify-center min-w-[64px]",
                                        isGenerating || !topic.trim() ? "bg-white/5 text-slate-600" : "bg-white text-black hover:bg-emerald-500 hover:text-white"
                                    )}
                                >
                                    {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-6">
                            <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <div className="w-1 h-1 bg-emerald-500 animate-pulse" /> AI_RESEARCH_PROTOCOL_V2 Active
                            </p>
                            <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                <Hash size={10} /> SECTOR_4_AUTHORITY
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

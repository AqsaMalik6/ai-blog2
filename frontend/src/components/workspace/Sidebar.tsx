'use client';

import { useState, useEffect } from 'react';
import { chatApi, Chat } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Trash2, History, ChevronLeft, ChevronRight, Terminal, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface SidebarProps {
    onSelectChat: (id: number) => void;
    selectedChatId?: number;
}

export default function WorkspaceSidebar({ onSelectChat, selectedChatId }: SidebarProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => { loadChats(); }, []);

    const loadChats = async () => {
        try {
            const data = await chatApi.getAll();
            setChats(data);
        } catch (error) { console.error('Error loading chats:', error); }
    };

    const handleDeleteChat = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await chatApi.delete(id);
            setChats(chats.filter(c => c.id !== id));
            toast.success('DELETED_LOG_SUCCESS');
        } catch (error) { toast.error('ACTION_FAILED'); }
    };

    return (
        <aside
            className={cn(
                "h-screen bg-[#020617] border-r border-white/5 transition-all duration-500 flex flex-col relative z-50",
                isCollapsed ? "w-24" : "w-80"
            )}
        >
            {/* Collapse Handle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 text-black border border-white/10 z-[60] hover:scale-110 transition-transform"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="p-6 flex flex-col h-full">
                {/* Brand/New Button */}
                <div className="mb-10">
                    <button
                        onClick={() => onSelectChat(-1)}
                        className={cn(
                            "w-full flex items-center gap-3 bg-white text-black p-4 rounded-2xl hover:bg-emerald-500 transition-all font-black uppercase text-[11px] tracking-widest group shadow-2xl",
                            isCollapsed && "justify-center px-0 h-14"
                        )}
                    >
                        <Plus size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                        {!isCollapsed && <span>New Session</span>}
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-2">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 pl-2">
                            <History size={12} className="text-emerald-500" /> HISTORY_NODES
                        </div>
                    )}

                    <AnimatePresence>
                        {chats.map((chat) => (
                            <motion.div
                                key={chat.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => onSelectChat(chat.id)}
                                className={cn(
                                    "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border border-transparent",
                                    selectedChatId === chat.id ? "bg-white/5 border-emerald-500/30 text-emerald-400" : "hover:bg-white/5 text-slate-400",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                <div className="flex items-center gap-4 truncate">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        selectedChatId === chat.id ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "bg-slate-800"
                                    )} />
                                    {!isCollapsed && <span className="truncate text-[13px] font-bold tracking-tight">{chat.title}</span>}
                                </div>

                                {!isCollapsed && (
                                    <button
                                        onClick={(e) => handleDeleteChat(e, chat.id)}
                                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Footer Info */}
                <div className="pt-6 border-t border-white/5 mt-6">
                    <div className={cn("flex flex-col gap-4", isCollapsed && "items-center")}>
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                            <ShieldCheck size={14} className="text-emerald-500" /> {!isCollapsed && "Secure Pipeline"}
                        </div>
                        {!isCollapsed && (
                            <div className="p-4 glass rounded-[20px] bg-white/5 border-white/5 text-center">
                                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">Status</p>
                                <p className="text-white text-xs font-bold font-mono">CORE_ONLINE_V3.2</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { chatApi, Chat } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Trash2, History, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface SidebarProps {
    onSelectChat: (id: number) => void;
    selectedChatId?: number;
}

export default function WorkspaceSidebar({ onSelectChat, selectedChatId }: SidebarProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            const data = await chatApi.getAll();
            setChats(data);
        } catch (error) {
            console.error('Error loading chats:', error);
        }
    };

    const handleDeleteChat = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await chatApi.delete(id);
            setChats(chats.filter(c => c.id !== id));
            toast.success('Chat deleted');
        } catch (error) {
            toast.error('Failed to delete chat');
        }
    };

    return (
        <aside
            className={cn(
                "h-screen bg-card-dark border-r border-white/5 transition-all duration-300 flex flex-col relative",
                isCollapsed ? "w-20" : "w-80"
            )}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-emerald-500 rounded-full p-1 text-white border-2 border-bg-dark z-50 hover:bg-emerald-600 transition-colors"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="p-4 flex flex-col h-full">
                <button
                    onClick={() => onSelectChat(-1)} // New chat
                    className={cn(
                        "flex items-center gap-2 bg-emerald-500/10 text-emerald-400 p-4 rounded-2xl hover:bg-emerald-500/20 transition-all font-bold mb-8 group",
                        isCollapsed && "justify-center p-0 h-12 w-12 mx-auto"
                    )}
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    {!isCollapsed && <span>New Project</span>}
                </button>

                <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
                    {!isCollapsed && (
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest px-2 mb-4">
                            <History size={14} /> Recent Work
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
                                    "group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all",
                                    selectedChatId === chat.id ? "bg-emerald-500/20 text-emerald-400" : "hover:bg-white/5 text-slate-400",
                                    isCollapsed && "justify-center"
                                )}
                            >
                                <div className="flex items-center gap-3 truncate">
                                    <MessageSquare size={18} className={cn(selectedChatId === chat.id ? "text-emerald-400" : "text-slate-500")} />
                                    {!isCollapsed && <span className="truncate text-sm font-medium">{chat.title}</span>}
                                </div>

                                {!isCollapsed && (
                                    <button
                                        onClick={(e) => handleDeleteChat(e, chat.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4">
                    {!isCollapsed ? (
                        <div className="p-4 glass rounded-[20px] bg-emerald-500/5 border-emerald-500/10">
                            <p className="text-[10px] text-emerald-400 font-black uppercase mb-1">Pro Plan</p>
                            <p className="text-white text-xs font-bold mb-3">Unlimited AI Tokens</p>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-emerald-500" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 mx-auto animate-pulse" />
                    )}
                </div>
            </div>
        </aside>
    );
}

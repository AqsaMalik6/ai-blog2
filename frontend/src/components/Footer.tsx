import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 bg-bg-dark border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-emerald-500 p-2 rounded-xl">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">BlogAgent AI</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            The world's most advanced AI blog generation platform. Built with Next.js and Gemini 2.0.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Twitter size={18} /></Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Linkedin size={18} /></Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Github size={18} /></Link>
                            <Link href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Mail size={18} /></Link>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Product</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#features" className="hover:text-emerald-400 transition-colors">Features</Link></li>
                            <li><Link href="/workspace" className="hover:text-emerald-400 transition-colors">Workspace</Link></li>
                            <li><Link href="/blogs" className="hover:text-emerald-400 transition-colors">Blog Feed</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Company</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-white font-bold mb-6">Support</h5>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">Community</Link></li>
                            <li><Link href="#" className="hover:text-emerald-400 transition-colors">API Reference</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs text-center md:text-left">
                        © 2026 BlogAgent AI. All rights reserved. Designed with ❤️ by Aqsa Malik.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">SEO Friendly</span>
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Lighthouse 100</span>
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">AEO Optimized</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

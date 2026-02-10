'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Showcase from '@/components/Showcase';
import TechStack from '@/components/TechStack';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CircuitBoard, Sparkles, ArrowRight, Share2, Zap, ShieldAlert, Cpu, Globe, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black overflow-hidden select-none">
      <Navbar />
      <Hero />
      <About />
      <Showcase />

      <div className="relative z-10 bg-black">
        <TechStack />

        {/* Workflow Section - High Fidelity Dark Mode */}
        <section id="how-it-works" className="py-60 relative border-t border-white/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 grid-background opacity-20" />

          <div className="container max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-12"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-blue-500 font-black uppercase tracking-[0.6em] text-[10px]">Neural Workflow</span>
                </motion.div>
                <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-16 tracking-tighter uppercase">
                  Intelligence <br /> to <span className="text-blue-500">Market</span> <br />
                  <span className="opacity-40">Dominance.</span>
                </h3>

                <div className="space-y-16">
                  {[
                    { title: 'Neural Research', text: 'Our agents perform deep-web context synthesis, building a multi-perspective knowledge graph.', icon: CircuitBoard, color: 'text-blue-400' },
                    { title: 'GEO Synthesis', text: 'Content is structured for LLM citation. Increase your authority in ChatGPT and Gemini.', icon: Zap, color: 'text-purple-400' },
                    { title: 'Automated Branding', text: 'AI-driven metadata and structural SEO are baked into every single neural deployment.', icon: Sparkles, color: 'text-emerald-400' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-10 group"
                    >
                      <div className={cn("w-20 h-20 shrink-0 rounded-[28px] bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-blue-600/20 group-hover:border-blue-500/50", item.color)}>
                        <item.icon size={32} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white mb-4 tracking-tight uppercase group-hover:text-blue-400 transition-colors">{item.title}</h4>
                        <p className="text-slate-500 font-bold leading-relaxed text-[17px] max-w-md">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                {/* Visual Representation of Agent Output */}
                <div className="absolute -inset-20 bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="relative glass-card p-10 rounded-[64px] border-white/10 shadow-3xl bg-white/[0.02]">
                  <div className="bg-[#0d1117] rounded-[48px] overflow-hidden border border-white/5 aspect-[4/5] relative ai-scan-line">
                    <div className="p-12 space-y-10">
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-1/4 bg-white/5 rounded-full" />
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-400/50" />
                          <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                          <div className="w-2 h-2 rounded-full bg-green-400/50" />
                        </div>
                      </div>
                      <div className="h-16 w-full bg-gradient-to-r from-blue-500/20 via-blue-500/5 to-transparent rounded-2xl border border-white/5" />
                      <div className="space-y-5">
                        <div className="h-3 w-full bg-white/5 rounded-full" />
                        <div className="h-3 w-5/6 bg-white/5 rounded-full" />
                        <div className="h-3 w-full bg-white/5 rounded-full" />
                        <div className="h-3 w-4/6 bg-white/5 rounded-full" />
                      </div>
                      <div className="h-[280px] w-full bg-white/[0.03] rounded-[40px] border border-white/5 relative flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
                        <div className="relative z-10 flex flex-col items-center gap-6">
                          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                            <Share2 size={32} className="text-white" />
                          </div>
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Node Deploying...</span>
                        </div>
                        {/* Scanning beam */}
                        <motion.div
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-x-0 h-[2px] bg-blue-500/50 blur-sm shadow-[0_0_15px_#3b82f6]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Floating Performance Score */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100"
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Zap size={16} />
                      </div>
                      <p className="text-blue-600 font-black text-5xl tracking-tighter">99.8</p>
                    </div>
                    <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.3em] pl-1">Neural Relevance V4</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section - High Impact Purist */}
        <section className="py-60 relative overflow-hidden text-center bg-black">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px]" />
          <div className="container max-w-5xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-14">
                <span className="w-12 h-[1px] bg-blue-500" />
                <span className="text-blue-500 font-black uppercase tracking-[0.8em] text-[11px]">Deploy Your First Node</span>
                <span className="w-12 h-[1px] bg-blue-500" />
              </div>

              <h3 className="text-6xl md:text-9xl font-black text-white mb-16 tracking-tighter leading-[0.9] uppercase">
                Ready to <br /> <span className="text-blue-500">Initialize?</span>
              </h3>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                <Link href="/old-workspace.html" className="btn-primary flex items-center justify-center gap-6 py-8 px-20 text-[16px]">
                  WORKSPACE PAGE <ArrowUpRight size={24} />
                </Link>
                <Link href="#" className="flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-all">
                    <Globe size={20} className="text-white" />
                  </div>
                  <span className="text-white font-black uppercase text-[12px] tracking-widest">Global Network</span>
                </Link>
              </div>

              <p className="mt-20 text-slate-700 font-black uppercase text-[10px] tracking-[0.5em]">
                Enterprise Ready  //  Unlimited Scalability  //  AI Centric Design
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

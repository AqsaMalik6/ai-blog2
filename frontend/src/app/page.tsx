import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { ArrowDownRight, CircuitBoard, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AgentX | Premium AI Blog Engine & Research Lab',
  description: 'Deploy autonomous agents to dominate search results. Research-backed content and AI-synthesized imagery at scale.',
  keywords: ['AI Agent', 'Autonomous Blogging', 'Gemini 2.0', 'SEO Optimization', 'AEO', 'GEO'],
  openGraph: {
    title: 'AgentX | The Alpha of AI Content',
    description: 'Autonomous research and high-ranking content deployment.',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <Navbar />
      <Hero />

      <div className="relative z-10">
        <Features />

        {/* Process Section - High End Brutalist */}
        <section id="how-it-works" className="py-32 bg-white/5 relative border-y border-white/5">
          <div className="container max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[11px] mb-6 block">Intelligence Workflow</span>
                <h3 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-10 tracking-tighter">
                  From Raw Concept <br /> to <span className="text-emerald-500 italic">Market Authority.</span>
                </h3>

                <div className="space-y-12">
                  {[
                    { title: 'Multi-Perspective Research', text: 'Our agent doesnt just pull data; it creates a knowledge graph of competing viewpoints to ensure balanced, authoritative results.', icon: CircuitBoard, color: 'text-blue-400' },
                    { title: 'Generative Synthesis', text: 'Proprietary prompting protocols generate 2,000+ words of structured, high-conversion copy optimized for AI search engines (AEO).', icon: Wand2, color: 'text-purple-400' },
                    { title: 'Automated Branding', text: 'Every deployment includes custom metadata, OG tags, and AI-generated featured images tuned to your brand aesthetic.', icon: Sparkles, color: 'text-emerald-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-colors`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="relative glass p-4 rounded-[40px] border-white/10 shadow-3xl">
                  <div className="bg-[#0f172a] rounded-[32px] overflow-hidden border border-white/5 aspect-square md:aspect-auto md:h-[600px] relative ai-scan-line">
                    <div className="p-8 space-y-6">
                      <div className="h-4 w-1/3 bg-white/5 rounded-full" />
                      <div className="h-10 w-2/3 bg-emerald-500/20 rounded-xl" />
                      <div className="h-4 w-full bg-white/5 rounded-full" />
                      <div className="h-4 w-5/6 bg-white/5 rounded-full" />
                      <div className="h-[200px] w-full bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-white/5" />
                      <div className="h-4 w-full bg-white/5 rounded-full" />
                      <div className="h-4 w-4/6 bg-white/5 rounded-full" />
                      <div className="h-4 w-full bg-white/5 rounded-full" />
                    </div>
                  </div>
                  {/* Floating Stats */}
                  <div className="absolute -bottom-10 -right-10 glass p-6 rounded-3xl border-emerald-500/20 shadow-2xl animate-float">
                    <p className="text-emerald-400 font-black text-2xl mb-1">98/100</p>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Lighthouse SEO Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-40">
          <div className="container max-w-5xl mx-auto px-6">
            <div className="relative overflow-hidden bg-emerald-500 p-12 md:p-24 rounded-[60px] text-center border-4 border-white/10 group">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-white/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000" />

              <div className="relative z-10">
                <h3 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
                  Stop Writing. <br /> Start <span className="text-[#020617]">Commanding.</span>
                </h3>
                <p className="text-emerald-50/70 text-lg md:text-xl mb-14 max-w-xl mx-auto font-medium">
                  The first 100 users get lifetime priority agent access. Join the research preview today.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <Link href="/workspace" className="bg-[#020617] text-white px-12 py-6 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                    ENTER WORKSPACE <ArrowDownRight size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

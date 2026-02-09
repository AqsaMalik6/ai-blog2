import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BlogAgent AI | Professional AI Blog & Content Generation',
  description: 'Generate SEO-optimized blogs with AI images and deep web research. The ultimate AI-powered workspace for modern content creators.',
  keywords: ['AI Blog Generator', 'SEO Content AI', 'Automated Blogging', 'Gemini AI Blog', 'AI Content Strategy'],
  openGraph: {
    title: 'BlogAgent AI | High-End Content Generation',
    description: 'Transform your content strategy with Gemini-powered blog generation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogAgent AI',
    description: 'The world\'s most advanced AI blog generation platform.',
  }
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg-dark">
      <Navbar />
      <Hero />

      {/* Scrollable Content */}
      <div className="relative z-10">
        <Features />

        {/* How It Works (Inline for simplicity or create component) */}
        <section id="how-it-works" className="py-24 bg-bg-dark/50 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-emerald-400 font-bold mb-4 tracking-widest uppercase text-sm">Workflow</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white">How it works</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">1</div>
                <h4 className="text-xl font-bold text-white mb-3">Input Topic</h4>
                <p className="text-slate-400">Tell the agent what you want to write about. Be as specific as you like.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">2</div>
                <h4 className="text-xl font-bold text-white mb-3">AI Research</h4>
                <p className="text-slate-400">Our agent scans the live web to find the latest trends, facts, and sources.</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black text-purple-400 border border-purple-500/20 group-hover:scale-110 transition-transform">3</div>
                <h4 className="text-xl font-bold text-white mb-3">Generation</h4>
                <p className="text-slate-400">Get a polished, SEO-optimized blog with a stunning AI-generated featured image.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="glass-emerald p-12 md:p-20 rounded-[40px] text-center border-emerald-500/30">
              <h3 className="text-3xl md:text-6xl font-black text-white mb-8">Ready to supercharge <br /> your <span className="text-gradient">content?</span></h3>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of creators using BlogAgent AI to scale their distribution.
              </p>
              <div className="flex justify-center">
                <a href="/workspace" className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-emerald-500/20">
                  Get Started for Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

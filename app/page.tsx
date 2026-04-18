import { Navbar } from "@/app/components/Navbar";
import { LandingHero } from "@/app/components/LandingHero";
import { Features } from "@/app/components/Features";
import { Footer } from "@/app/components/Footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <LandingHero />
        <Features />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-[#FBFBFD] dark:bg-[#1D1D1F]">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                  From raw data to <br /> deep insights in 3 steps
                </h2>
                <div className="space-y-8">
                  <Step 
                    number="01" 
                    title="Upload your data" 
                    description="Drag and drop your files. We support CSV, JSON, and Excel." 
                  />
                  <Step 
                    number="02" 
                    title="Ask any question" 
                    description="Use plain English to query your data. No SQL knowledge required." 
                  />
                  <Step 
                    number="03" 
                    title="Visualize & Share" 
                    description="Generate beautiful charts and share reports with your team instantly." 
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="rounded-3xl bg-gradient-to-br from-apple-blue to-apple-blue-bright p-[1px]">
                  <div className="rounded-[23px] bg-white dark:bg-zinc-900 overflow-hidden shadow-elevated aspect-square flex items-center justify-center p-12">
                     <div className="relative w-full h-full border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-950 p-6 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="h-4 w-3/4 bg-apple-blue/20 rounded" />
                          <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                        </div>
                        <div className="h-1/2 w-full bg-apple-blue/10 rounded-lg flex items-center justify-center">
                           <div className="h-20 w-20 rounded-full border-4 border-apple-blue border-t-transparent animate-spin-slow" />
                        </div>
                        <div className="h-10 w-full bg-apple-blue rounded-md" />
                     </div>
                  </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 h-64 w-64 bg-apple-blue/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-apple-blue text-white overflow-hidden relative">
           <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                Ready to unlock the power of your data?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Join thousands of analysts who are saving hours every week with AI-powered intelligence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-4 bg-white text-apple-blue font-bold rounded-xl hover:bg-zinc-100 transition-colors shadow-lg scale-100 hover:scale-105 active:scale-95 duration-200">
                  Get Started for Free
                </button>
                <button className="px-8 py-4 bg-apple-blue-bright/20 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
           </div>
           {/* Background decorative circles */}
           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full border border-white/10" />
           <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-64 w-64 rounded-full border border-white/10" />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-6">
      <span className="text-3xl font-bold text-apple-blue opacity-50">{number}</span>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-text-secondary">{description}</p>
      </div>
    </div>
  );
}

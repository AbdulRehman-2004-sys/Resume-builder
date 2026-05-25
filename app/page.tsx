import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Layout, Palette, Code, Check, UserCircle, LogOut, LayoutDashboard } from "lucide-react";
import { createClient } from "@/app/lib/supabase-server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-gray-200">
      {/* Navbar */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 text-black">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            ResumeAI
          </Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <div className="relative group">
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
                  <UserCircle className="w-7 h-7 text-gray-700" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <form action="/auth/signout" method="post">
                      <button type="submit" className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-left">
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors shadow-sm">
                Log in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-balance">
          Create a Professional Resume That <span className="italic font-serif text-gray-700">Gets You Hired</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl text-balance">
          Leverage the power of industry-leading AI to transform your career history into a high-performance narrative. Tailored, polished, and ready in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Link href={user ? "/dashboard" : "/login"} className="inline-flex justify-center items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 hover:scale-105">
            Build Your Resume <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#features" className="inline-flex justify-center items-center px-8 py-4 rounded-full font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-all">
            View Features
          </Link>
        </div>

        {/* Hero Image / Mockup */}
        <div className="mt-20 relative w-full max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-indigo-50 to-orange-50 blur-3xl opacity-50 -z-10 rounded-full" />
          <div className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100/50 backdrop-blur-sm relative z-10 overflow-hidden group">
            {/* Fake Browser window */}
            <div className="w-full h-6 bg-gray-100 rounded-t-xl mb-4 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="aspect-[16/10] bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-700 ease-out flex items-center justify-center">
               <div className="w-3/4 h-5/6 bg-white shadow-sm border border-gray-200 flex flex-col p-8">
                  <div className="w-1/3 h-8 bg-gray-200 rounded mb-4" />
                  <div className="w-full h-px bg-gray-100 mb-4" />
                  <div className="w-full h-4 bg-gray-100 rounded mb-2" />
                  <div className="w-5/6 h-4 bg-gray-100 rounded mb-8" />
                  
                  <div className="w-1/4 h-6 bg-gray-200 rounded mb-4" />
                  <div className="w-full h-4 bg-gray-100 rounded mb-2" />
                  <div className="w-full h-4 bg-gray-100 rounded mb-2" />
                  <div className="w-3/4 h-4 bg-gray-100 rounded" />
               </div>
            </div>
            
            <div className="absolute -left-4 top-1/4 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100 animate-bounce">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-sm">ATS Optimized</span>
            </div>
            <div className="absolute -right-4 top-1/2 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3 border border-gray-100 animate-bounce" style={{ animationDelay: '1s' }}>
              <Sparkles className="w-6 h-6 text-purple-500" />
              <span className="font-semibold text-sm">AI Scoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Engineered for Job Success</h2>
            <p className="text-3xl font-bold">Everything you need to bypass recruiting algorithms.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">ATS-Friendly Layouts</h3>
              <p className="text-gray-600 leading-relaxed">Our templates are built precisely to parse perfectly through Applicant Tracking Systems.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI ATS Scoring</h3>
              <p className="text-gray-600 leading-relaxed">Score your resume instantly with our AI model to find weak points and get actionable improvements.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Themes</h3>
              <p className="text-gray-600 leading-relaxed">Choose from Classic, Modern, or Minimal themes to match your industry's expectations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">Stop guessing. Know your resume score.</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-3xl blur-xl opacity-50" />
              <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-xl relative z-10 w-72 text-center opacity-75 grayscale hover:grayscale-0 transition-all">
                <div className="text-red-500 font-bold mb-4 uppercase text-sm tracking-wide">Standard Resume</div>
                <div className="text-6xl font-extrabold text-red-500 mb-2">42%</div>
                <p className="text-gray-500 text-sm">Missing keywords, poor parsing structure</p>
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center text-gray-400">
              <ArrowRight className="w-8 h-8" />
            </div>

            <div className="relative scale-110">
              <div className="absolute inset-0 bg-green-100 rounded-3xl blur-xl opacity-50" />
              <div className="bg-white p-8 rounded-3xl border border-green-200 shadow-2xl relative z-10 w-72 text-center">
                <div className="text-green-500 font-bold mb-4 uppercase text-sm tracking-wide">ResumeAI ATS Built</div>
                <div className="text-7xl font-extrabold text-green-500 mb-2">98%</div>
                <p className="text-gray-600 text-sm font-medium">Perfect keyword alignment, flawless structure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">The 3-Step Advantage</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-start text-center">
             <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold mb-6">1</div>
                <h3 className="text-xl font-bold mb-3">Pick a Template</h3>
                <p className="text-gray-500 text-balance">Choose from our curated collection of ATS-optimized designs.</p>
             </div>
             <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold mb-6">2</div>
                <h3 className="text-xl font-bold mb-3">Add Information</h3>
                <p className="text-gray-500 text-balance">Fill in your experience quickly with our dynamic builder.</p>
             </div>
             <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold mb-6">3</div>
                <h3 className="text-xl font-bold mb-3">Check AI & Apply</h3>
                <p className="text-gray-500 text-balance">Get your ATS score, improve weak points, and download PDF.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="font-bold text-xl text-white flex items-center gap-2">
            <FileText className="w-5 h-5" /> ResumeAI
          </div>
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

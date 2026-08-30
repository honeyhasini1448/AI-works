import React from 'react';
import { Button } from './UI';
import { ShieldCheck, Scan, FileText, Activity } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center px-4 py-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-slate-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            System Operational
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Precision Forensic <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
              Fingerprint Analysis
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Professional-grade ridge extraction and biometric tracing for digital forensics. Secure, fast, and client-side processed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
            <Button onClick={onRegister} className="h-14 px-10 text-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/20 transform hover:-translate-y-1 transition-all duration-200">
              Initialize Analysis
            </Button>
            <Button variant="outline" onClick={onLogin} className="h-14 px-10 text-lg border-slate-300 hover:border-slate-400 hover:bg-white bg-white/50 backdrop-blur-sm">
              Analyst Login
            </Button>
          </div>
        </div>
      </section>

      {/* Stats/Trust Strip */}
      <div className="border-y border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-slate-900">99.8%</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Extraction Accuracy</div>
          </div>
          <div>
             <div className="text-3xl font-bold text-slate-900">< 2s</div>
             <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Processing Time</div>
          </div>
          <div>
             <div className="text-3xl font-bold text-slate-900">100%</div>
             <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Local Privacy</div>
          </div>
           <div>
             <div className="text-3xl font-bold text-slate-900">PDF</div>
             <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Instant Reports</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-500 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <Scan className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Adaptive Thresholding</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced computer vision algorithms adapt to lighting conditions to isolate ridge details from uneven surfaces and shadows.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-500 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Forensic Reports</h3>
              <p className="text-slate-600 leading-relaxed">
                Automatically generate standard-compliant PDF dossiers containing chain of custody metadata and side-by-side evidence comparison.
              </p>
            </div>
            
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-500 hover:shadow-lg">
              <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900">Zero-Trust Privacy</h3>
              <p className="text-slate-600 leading-relaxed">
                No data transmission. All image processing occurs within the browser's sandbox using WebAssembly-speed canvas operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400 text-center border-t border-slate-900">
        <div className="flex items-center justify-center mb-4 text-slate-200 font-bold text-xl tracking-tight">
          <Activity className="w-6 h-6 mr-2 text-blue-500" /> ForensicTrace
        </div>
        <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} ForensicTrace Systems. Engineered for Hackathon Excellence.</p>
      </footer>
    </div>
  );
};

export default Landing;
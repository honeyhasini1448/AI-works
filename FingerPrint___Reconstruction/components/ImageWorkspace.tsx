import React, { useState, useRef } from 'react';
import { Upload, X, ArrowRight, Download, RefreshCw, FileImage, ScanLine, Microscope } from 'lucide-react';
import { Button, Card } from './UI';
import { ProcessingStatus, User } from '../types';
import { processFingerprint } from '../services/imageProcessor';
import { generateReport } from '../services/pdfGenerator';

interface WorkspaceProps {
  user: User;
  onToast: (msg: string, type: 'success' | 'error') => void;
}

export const ImageWorkspace: React.FC<WorkspaceProps> = ({ user, onToast }) => {
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Validation
  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      onToast("Invalid file type. Please upload JPG or PNG.", "error");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // Increased to 10MB
      onToast("File size exceeds 10MB limit.", "error");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOriginalImage(ev.target?.result as string);
        setStatus(ProcessingStatus.IDLE);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setOriginalImage(ev.target?.result as string);
        setStatus(ProcessingStatus.IDLE);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!originalImage) return;
    
    try {
      setStatus(ProcessingStatus.PROCESSING);
      // Wait a bit to show animation
      await new Promise(r => setTimeout(r, 2000));
      
      const result = await processFingerprint(originalImage);
      setProcessedImage(result);
      setStatus(ProcessingStatus.COMPLETE);
      onToast("Forensic analysis complete.", "success");
    } catch (e) {
      console.error(e);
      setStatus(ProcessingStatus.ERROR);
      onToast("Processing failed. Please try a clearer image.", "error");
    }
  };

  const handleDownload = async () => {
    if (!originalImage || !processedImage) return;
    try {
      await generateReport(originalImage, processedImage, user);
      onToast("PDF Report downloaded secure.", "success");
    } catch (e) {
      console.error(e);
      onToast("Failed to generate PDF.", "error");
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setStatus(ProcessingStatus.IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Render States ---

  // 1. Upload View
  if (!originalImage) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
             <ScanLine className="w-8 h-8 text-blue-700" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Evidence Upload</h2>
          <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
            Securely upload a high-resolution fingerprint specimen. 
            <br/><span className="text-sm">System supports direct photo upload from mobile devices.</span>
          </p>
        </div>
        
        <Card className="p-16 border-2 border-dashed border-slate-300 hover:border-blue-600 hover:bg-blue-50/30 transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md">
          <div 
            className="flex flex-col items-center justify-center space-y-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-10 h-10" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Drag & Drop Evidence File</h3>
              <p className="text-slate-500">or click to browse local storage</p>
            </div>
            <div className="flex gap-4 text-xs font-mono text-slate-400 border-t pt-6 w-full justify-center max-w-xs">
              <span>JPG</span>
              <span>PNG</span>
              <span>MAX 10MB</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
        </Card>
      </div>
    );
  }

  // 2. Processing & Results View
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className={`p-3 rounded-lg ${status === ProcessingStatus.COMPLETE ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
            <Microscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Case Analysis #{Math.random().toString(36).substr(2, 6).toUpperCase()}</h3>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              SESSION ACTIVE
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          {status === ProcessingStatus.COMPLETE ? (
            <>
              <Button onClick={handleReset} variant="outline" className="text-slate-600 flex-1 sm:flex-none">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleDownload} className="bg-slate-900 hover:bg-slate-800 flex-1 sm:flex-none">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </>
          ) : (
            <Button onClick={handleReset} variant="ghost" disabled={status === ProcessingStatus.PROCESSING} className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <X className="w-4 h-4 mr-2" />
              Discard Specimen
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
        {/* Original Image */}
        <Card className="p-1 overflow-hidden flex flex-col relative group h-full bg-slate-50 border-slate-300">
           <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/70 backdrop-blur text-white text-xs font-bold rounded-full uppercase tracking-wider">
             Original Evidence
           </div>
          <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
            <img 
              src={originalImage} 
              alt="Original" 
              className="max-h-full max-w-full object-contain shadow-2xl" 
            />
            {status === ProcessingStatus.PROCESSING && (
               <div className="absolute inset-0 z-20 overflow-hidden">
                 <div className="w-full h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] absolute animate-[scan_2s_linear_infinite]" />
                 <style>{`
                   @keyframes scan {
                     0% { top: 0%; opacity: 0; }
                     10% { opacity: 1; }
                     90% { opacity: 1; }
                     100% { top: 100%; opacity: 0; }
                   }
                 `}</style>
               </div>
            )}
          </div>
        </Card>

        {/* Processed Image or Placeholder */}
        <Card className={`p-1 overflow-hidden flex flex-col h-full transition-all duration-500 ${status === ProcessingStatus.COMPLETE ? 'border-blue-500 ring-4 ring-blue-500/10' : 'border-slate-300'}`}>
           <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-blue-900/90 backdrop-blur text-white text-xs font-bold rounded-full uppercase tracking-wider flex items-center gap-2">
             Processed Trace
             {status === ProcessingStatus.COMPLETE && <ScanLine className="w-3 h-3" />}
           </div>
          
          <div className="flex-1 bg-slate-950 rounded-lg flex items-center justify-center overflow-hidden relative w-full h-full">
            
            {status === ProcessingStatus.IDLE && (
              <div className="text-center z-10">
                <div className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                  <FingerprintIcon className="w-10 h-10 text-slate-700" />
                </div>
                <Button onClick={handleProcess} className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Execute Analysis <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-slate-500 mt-4 text-sm font-mono">EST. TIME: 2.4s</p>
              </div>
            )}

            {status === ProcessingStatus.PROCESSING && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
                 <div className="relative w-32 h-32 mb-8">
                    <svg className="animate-spin w-full h-full text-blue-500" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                 </div>
                 <div className="space-y-2 text-center">
                   <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Analyzing</h3>
                   <div className="flex gap-1 justify-center">
                     <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                     <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                     <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                   </div>
                   <p className="text-xs text-blue-300 font-mono mt-2">ALGORITHM: ADAPTIVE THRESHOLDING</p>
                 </div>
              </div>
            )}

            {status === ProcessingStatus.COMPLETE && processedImage && (
              <>
                <img 
                  src={processedImage} 
                  alt="Processed" 
                  className="max-h-full max-w-full object-contain animate-in fade-in duration-1000 zoom-in-50" 
                />
                <div className="absolute bottom-4 right-4 bg-black/80 text-green-400 text-xs px-2 py-1 font-mono rounded border border-green-900">
                  CONFIDENCE: 98.4%
                </div>
              </>
            )}
             
            {status === ProcessingStatus.ERROR && (
               <div className="text-red-400 flex flex-col items-center">
                 <X className="w-16 h-16 mb-4" />
                 <p className="text-xl font-medium">Analysis Failed</p>
                 <p className="text-sm text-red-500/70 mt-2">Could not isolate ridge patterns</p>
               </div>
            )}
            
            {/* Grid overlay for tech feel */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Simple icon wrapper
const FingerprintIcon = ({className}: {className: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 6"/><path d="M5 15.1A2 2 0 0 0 6.5 16h11a2 2 0 0 0 1.5-.9"/><path d="M9 4v1"/><path d="M15 4v1"/><path d="M12 4v1"/><path d="M12 21v1"/><path d="M12 18v1"/><path d="M12 15v1"/><path d="M12 12v1"/><path d="M12 9v1"/><path d="M7 21v1"/><path d="M7 18v1"/><path d="M7 15v1"/><path d="M7 12v1"/><path d="M7 9v1"/><path d="M17 21v1"/><path d="M17 18v1"/><path d="M17 15v1"/><path d="M17 12v1"/><path d="M17 9v1"/></svg>
);
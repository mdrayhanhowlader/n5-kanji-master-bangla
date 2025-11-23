import React, { useEffect } from 'react';
import { Kanji } from '../types';
import { X, BookOpen, PenTool, Hash, ArrowRight, Volume2 } from 'lucide-react';

interface KanjiModalProps {
  kanji: Kanji | null;
  onClose: () => void;
}

export const KanjiModal: React.FC<KanjiModalProps> = ({ kanji, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!kanji) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full md:hidden z-10"
        >
          <X className="w-6 h-6 text-slate-600" />
        </button>

        {/* Left Side: Big Kanji Display */}
        <div className="w-full md:w-5/12 bg-indigo-50 p-8 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-indigo-100">
           {/* Stroke Count Badge */}
           <div className="absolute top-6 left-6 flex items-center space-x-2 text-indigo-400">
              <PenTool className="w-4 h-4" />
              <span className="font-mono font-bold text-sm">{kanji.strokes} Strokes</span>
           </div>

           <div className="text-[10rem] md:text-[12rem] leading-none text-indigo-900 font-medium drop-shadow-sm select-none">
             {kanji.kanji}
           </div>
           
           <div className="mt-6 space-y-1">
             <h2 className="text-3xl font-bold font-bengali text-indigo-950">{kanji.meaning_bn}</h2>
             <p className="text-lg text-indigo-700 font-medium">{kanji.meaning_en}</p>
           </div>
        </div>

        {/* Right Side: Details */}
        <div className="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-500" />
              <span>Study Details</span>
            </h3>
            <button 
              onClick={onClose}
              className="hidden md:block p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Readings Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Onyomi (Chinese)</div>
                <div className="text-xl font-bold text-indigo-600">{kanji.onyomi || '-'}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs font-bold uppercase text-slate-400 mb-2 tracking-wider">Kunyomi (Japanese)</div>
                <div className="text-xl font-bold text-emerald-600">{kanji.kunyomi || '-'}</div>
              </div>
            </div>

            {/* Examples Section */}
            <div>
              <div className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Common Words & Examples
              </div>
              <div className="space-y-3">
                {kanji.examples.map((ex, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors group">
                    <div className="w-1 h-8 bg-slate-200 rounded-full mr-4 group-hover:bg-indigo-500 transition-colors"></div>
                    <span className="text-lg font-medium text-slate-700">{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Section */}
            {kanji.related && kanji.related.length > 0 && (
              <div>
                <div className="text-sm font-bold uppercase text-slate-400 mb-3 tracking-wider flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Related Kanji
                </div>
                <div className="flex flex-wrap gap-2">
                  {kanji.related.map((rel, idx) => (
                    <span key={idx} className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-700 rounded-lg font-bold text-lg border border-indigo-100">
                      {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
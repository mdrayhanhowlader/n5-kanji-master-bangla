import React from 'react';
import { Kanji } from '../types';

interface KanjiCardProps {
  data: Kanji;
  onClick: (kanji: Kanji) => void;
}

export const KanjiCard: React.FC<KanjiCardProps> = ({ data, onClick }) => {
  return (
    <div 
      onClick={() => onClick(data)}
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-slate-100 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-2 opacity-50 text-xs font-mono text-slate-400">
        {data.strokes} st
      </div>
      
      <div className="p-6 flex flex-col items-center justify-center">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-50 group-hover:bg-red-100 transition-colors duration-300 mb-4">
          <span className="text-6xl font-medium text-slate-800 font-sans">{data.kanji}</span>
        </div>
        
        <div className="text-center w-full">
          <h3 className="text-xl font-bold text-slate-800 mb-1 font-bengali">{data.meaning_bn}</h3>
          <p className="text-sm text-slate-500 font-medium">{data.meaning_en}</p>
        </div>
        
        <div className="mt-4 w-full pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
           <span className="truncate mr-2 text-indigo-600 font-bold">{data.onyomi.split('、')[0]}</span>
           <span className="truncate text-emerald-600 font-bold">{data.kunyomi.split('、')[0]}</span>
        </div>
      </div>
    </div>
  );
};
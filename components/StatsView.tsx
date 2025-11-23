import React from 'react';
import { Kanji } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CATEGORIES } from '../constants';

interface StatsViewProps {
  data: Kanji[];
}

export const StatsView: React.FC<StatsViewProps> = ({ data }) => {
  // Process data for the chart
  const chartData = CATEGORIES
    .filter(cat => cat.id !== 'all')
    .map(cat => ({
      name: cat.name_jp,
      english: cat.name.split(' ')[0], // simple display name
      count: data.filter(k => k.category === cat.id).length,
      color: '#6366f1' // indigo-500
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 font-bengali">Category Distribution</h2>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#6366f1' : '#818cf8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-indigo-600">{data.length}</div>
            <div className="text-xs text-indigo-400 uppercase font-bold tracking-wider mt-1">Total Kanji</div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-emerald-600">N5</div>
            <div className="text-xs text-emerald-400 uppercase font-bold tracking-wider mt-1">JLPT Level</div>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-amber-600">{chartData.length}</div>
            <div className="text-xs text-amber-400 uppercase font-bold tracking-wider mt-1">Categories</div>
        </div>
         <div className="bg-rose-50 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-rose-600">100%</div>
            <div className="text-xs text-rose-400 uppercase font-bold tracking-wider mt-1">Free</div>
        </div>
      </div>
    </div>
  );
};
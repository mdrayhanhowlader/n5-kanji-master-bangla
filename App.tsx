import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, BarChart2, Github } from 'lucide-react';
import { KANJI_DATA, CATEGORIES } from './constants';
import { Kanji, ViewMode } from './types';
import { KanjiCard } from './components/KanjiCard';
import { KanjiModal } from './components/KanjiModal';
import { StatsView } from './components/StatsView';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedKanji, setSelectedKanji] = useState<Kanji | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);

  // Filter Logic
  const filteredData = useMemo(() => {
    return KANJI_DATA.filter(item => {
      const matchesSearch = 
        item.kanji.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.meaning_bn.includes(searchTerm) ||
        item.onyomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kunyomi.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header Section */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between py-4 space-y-4 md:space-y-0">
            
            {/* Logo / Title */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">N5 Kanji Master</h1>
                <p className="text-xs text-slate-500 font-bengali">সহজে জাপানি শিখুন</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:max-w-md mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 sm:text-sm"
                placeholder="Search (English, Bangla, or Kanji)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* View Toggles */}
            <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
              <button 
                onClick={() => setViewMode(ViewMode.GRID)}
                className={`p-2 rounded-lg transition-colors ${viewMode === ViewMode.GRID ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Grid View"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode(ViewMode.STATS)}
                className={`p-2 rounded-lg transition-colors ${viewMode === ViewMode.STATS ? 'bg-indigo-100 text-indigo-700' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Statistics"
              >
                <BarChart2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Scroller */}
          <div className="py-2 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-bengali
                    ${selectedCategory === cat.id 
                      ? 'bg-slate-800 text-white shadow-md transform scale-105' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'}
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {viewMode === ViewMode.STATS ? (
          <StatsView data={KANJI_DATA} />
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-end">
              <h2 className="text-lg font-semibold text-slate-700">
                Found <span className="text-indigo-600">{filteredData.length}</span> Kanji
              </h2>
            </div>

            {/* Grid */}
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredData.map((item, index) => (
                  <KanjiCard 
                    key={`${item.kanji}-${index}`} 
                    data={item} 
                    onClick={setSelectedKanji} 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Search className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">No Kanji found matching your criteria.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}
                  className="mt-4 text-indigo-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 N5 Kanji Master. Made for Bengali Learners.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-800 transition-colors">Study Tips</a>
             <a href="#" className="hover:text-slate-800 transition-colors">About</a>
             <Github className="w-5 h-5 hover:text-slate-800 cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* Modal */}
      <KanjiModal 
        kanji={selectedKanji} 
        onClose={() => setSelectedKanji(null)} 
      />
    </div>
  );
};

export default App;
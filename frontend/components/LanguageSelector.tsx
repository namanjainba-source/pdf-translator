import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Check, Loader2 } from 'lucide-react';

interface Language { 
    label: string; 
    code: string; 
    region: string; 
}

interface LanguageSelectorProps { 
    selectedCode: string; 
    onChange: (code: string) => void; 
    disabled?: boolean; 
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedCode, onChange, disabled }) => {
  const [data, setData] = useState<Record<string, Language[]>>({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // In a real app, you might import this directly if it's small, 
    // or fetch it from an API/public folder if it's large.
    fetch('/languages.json')
      .then(res => {
          if (!res.ok) throw new Error("Failed to load languages");
          return res.json();
      })
      .then(d => { 
          setData(d); 
          setLoading(false); 
      })
      .catch((err) => {
          console.error("Error loading languages:", err);
          setLoading(false);
      });
  }, []);

  const regions = Object.keys(data);
  
  const selectedLabel = useMemo(() => {
    if (loading) return "Loading...";
    for (const r of regions) {
      const found = data[r].find(l => l.code === selectedCode);
      if (found) return found.label;
    }
    return "Select Language";
  }, [selectedCode, data, regions, loading]);

  // Close dropdown when clicking outside (simple implementation)
  useEffect(() => {
    const close = () => setIsOpen(false);
    if (isOpen) window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [isOpen]);

  const toggleOpen = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && !loading) setIsOpen(!isOpen);
  };

  const handleSelect = (code: string) => {
      onChange(code);
      setIsOpen(false);
      setQuery(''); 
  };

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 ml-1">
        Target Language
      </label>
      
      <button 
        type="button" 
        onClick={toggleOpen} 
        disabled={disabled || loading} 
        className={`w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl transition-all
            ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : 'hover:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-500'}
        `}
      >
        <span className="font-medium truncate mr-2">
            {loading ? (
                <span className="flex items-center gap-2 text-slate-400">
                    <Loader2 size={16} className="animate-spin" /> Loading languages...
                </span>
            ) : selectedLabel}
        </span>
        <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-80 overflow-hidden flex flex-col animate-fade-in-up origin-top">
          {/* Search Input */}
          <div className="p-3 border-b border-slate-100 bg-slate-50 sticky top-0">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search language..." 
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                />
             </div>
          </div>
          
          {/* Language List */}
          <div className="overflow-y-auto flex-1 p-2">
            {regions.map(region => {
                const filteredLangs = data[region].filter(l => 
                    l.label.toLowerCase().includes(query.toLowerCase())
                );
                
                if (!filteredLangs.length) return null;
                
                return (
                    <div key={region} className="mb-2 last:mb-0">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 mt-1">
                            {region}
                        </div>
                        {filteredLangs.map(lang => (
                            <button 
                                key={lang.code} 
                                onClick={() => handleSelect(lang.code)} 
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between group transition-colors
                                    ${selectedCode === lang.code 
                                        ? 'bg-blue-50 text-blue-700 font-medium' 
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }
                                `}
                            >
                                {lang.label}
                                {selectedCode === lang.code && <Check size={16} className="text-blue-600" />}
                            </button>
                        ))}
                    </div>
                );
            })}
            
            {/* Empty State */}
            {regions.every(r => !data[r].filter(l => l.label.toLowerCase().includes(query.toLowerCase())).length) && (
                <div className="p-8 text-center text-slate-400 text-sm">
                    No languages found.
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

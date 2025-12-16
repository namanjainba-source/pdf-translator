import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Check, Loader2 } from 'lucide-react';

interface Language { label: string; code: string; region: string; }
interface Props { selectedCode: string; onChange: (c: string) => void; disabled?: boolean; }

const LanguageSelector: React.FC<Props> = ({ selectedCode, onChange, disabled }) => {
  const [data, setData] = useState<Record<string, Language[]>>({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/languages.json').then(r => r.json()).then(d => { setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const regions = Object.keys(data);
  const label = useMemo(() => {
    for (const r of regions) {
      const f = data[r].find(l => l.code === selectedCode);
      if (f) return f.label;
    }
    return "Select Language";
  }, [selectedCode, data]);

  return (
    <div className="relative w-full">
      <button type="button" onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled || loading} className="w-full flex justify-between px-4 py-3 border rounded-lg">
        <span>{loading ? "Loading..." : label}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border rounded-xl shadow-xl max-h-96 overflow-hidden flex flex-col">
          <div className="p-3 border-b"><input type="text" placeholder="Search..." className="w-full p-2 border rounded" value={query} onChange={e => setQuery(e.target.value)} /></div>
          <div className="overflow-y-auto p-2">
            {regions.map(r => {
                const langs = data[r].filter(l => l.label.toLowerCase().includes(query.toLowerCase()));
                if (!langs.length) return null;
                return (
                    <div key={r}>
                        <div className="text-xs font-bold text-slate-500 uppercase px-2 py-1">{r}</div>
                        {langs.map(l => (
                            <button key={l.code} onClick={() => { onChange(l.code); setIsOpen(false); }} className={`w-full text-left px-3 py-2 rounded hover:bg-slate-100 ${selectedCode === l.code ? 'bg-blue-50 text-blue-700' : ''}`}>
                                {l.label}
                            </button>
                        ))}
                    </div>
                )
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;

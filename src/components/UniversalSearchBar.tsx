import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Landmark, Compass, X, Loader2 } from 'lucide-react';
import { SearchSuggestionItem } from '../types';
import { api } from '../services/api';

interface UniversalSearchBarProps {
  onSelectQuery: (query: string) => void;
  className?: string;
}

export function UniversalSearchBar({ onSelectQuery, className = '' }: UniversalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestionItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch instant search suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.getSearchSuggestions(query);
        setSuggestions(res.suggestions);
      } catch (err) {
        console.error('Failed to fetch search suggestions:', err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      } else if (query.trim()) {
        onSelectQuery(query.trim());
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (sug: SearchSuggestionItem) => {
    setQuery(sug.queryToRun);
    setIsOpen(false);
    onSelectQuery(sug.queryToRun);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSelectQuery(query.trim());
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type: SearchSuggestionItem['type']) => {
    switch (type) {
      case 'pincode':
        return <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />;
      case 'place':
        return <Landmark className="w-4 h-4 text-primary" aria-hidden="true" />;
      case 'city':
        return <Compass className="w-4 h-4 text-primary" aria-hidden="true" />;
      case 'state':
        return <Compass className="w-4 h-4 text-primary-dark" aria-hidden="true" />;
      default:
        return <Search className="w-4 h-4 text-foreground/50" aria-hidden="true" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="universal-search-input" className="sr-only">
          Search places, cities, districts, states or PIN codes
        </label>
        
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-primary">
          <Search className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
        </div>

        <input
          id="universal-search-input"
          type="text"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search places, cities, districts, states, or 6-digit PIN codes (e.g. 282001, Taj Mahal, Kerala)..."
          className="w-full pl-12 sm:pl-14 pr-24 py-3.5 sm:py-4 bg-surface border-2 border-primary/30 hover:border-primary/60 focus:border-primary rounded-2xl sm:rounded-3xl text-foreground placeholder:text-foreground/50 text-xs sm:text-sm font-semibold shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
        />

        <div className="absolute inset-y-0 right-1.5 flex items-center gap-1.5 pr-2">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1.5 rounded-full text-foreground/40 hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          <button
            type="submit"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-primary text-surface font-heading font-bold text-xs sm:text-sm hover:bg-primary-dark transition-all duration-200 shadow-sm flex items-center gap-1.5"
          >
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* Dropdown Suggestions Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-surface rounded-2xl shadow-2xl border border-border overflow-hidden animate-fadeIn max-h-[380px] overflow-y-auto">
          {loading && suggestions.length === 0 && (
            <div className="p-4 text-center text-xs text-foreground/60 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" aria-hidden="true" />
              <span>Searching Indian geocoding atlas...</span>
            </div>
          )}

          {!loading && suggestions.length === 0 && query && (
            <div className="p-4 text-center text-xs text-foreground/70">
              No direct matches for "{query}". Press <kbd className="px-1.5 py-0.5 rounded bg-background border font-mono">Enter</kbd> to run spatial geocoding search.
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="p-2 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/50 flex items-center justify-between">
                <span>Location Matches:</span>
                <span className="text-[9px]">Select or press Enter</span>
              </div>

              {suggestions.map((sug, idx) => {
                const isHighlighted = idx === highlightedIndex;
                return (
                  <div
                    key={sug.id}
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                      isHighlighted
                        ? 'bg-primary text-surface'
                        : 'hover:bg-background text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isHighlighted
                            ? 'bg-surface/20 text-surface'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {getTypeIcon(sug.type)}
                      </div>
                      <div>
                        <div
                          className={`font-heading font-bold text-xs sm:text-sm ${
                            isHighlighted ? 'text-surface' : 'text-foreground'
                          }`}
                        >
                          {sug.title}
                        </div>
                        <div
                          className={`text-[11px] line-clamp-1 ${
                            isHighlighted ? 'text-surface/80' : 'text-foreground/60'
                          }`}
                        >
                          {sug.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {sug.pincode && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-bold ${
                            isHighlighted
                              ? 'bg-surface/20 text-surface'
                              : 'bg-accent/15 text-accent'
                          }`}
                        >
                          {sug.pincode}
                        </span>
                      )}
                      <span
                        className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          isHighlighted
                            ? 'bg-surface/20 text-surface'
                            : 'bg-background border border-border text-foreground/60'
                        }`}
                      >
                        {sug.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Filter Queries Footer */}
          <div className="p-3 bg-background border-t border-border flex flex-wrap items-center justify-between gap-2 text-[11px] text-foreground/70">
            <span>💡 Try queries like: <strong>282001</strong>, <strong>Hotels near Taj Mahal</strong>, <strong>Jaipur District</strong>, <strong>Kerala</strong></span>
          </div>
        </div>
      )}
    </div>
  );
}

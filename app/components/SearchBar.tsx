import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router';
import {useConfig} from '~/utils/themeContext';
import {LoadingSpinner} from './LoadingSpinner';
import {useAside} from './Aside';

interface SearchSuggestion {
  id: string;
  title: string;
  handle: string;
  type: 'product' | 'collection' | 'page';
  image?: string;
  price?: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  className = '',
  placeholder = 'Rechercher des produits...',
  autoFocus = false,
  onSearch,
}: SearchBarProps) {
  const config = useConfig();
  const navigate = useNavigate();
  const {close} = useAside();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Auto focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Fetch real search suggestions from Shopify API
  const fetchSuggestions = async (
    searchQuery: string,
  ): Promise<SearchSuggestion[]> => {
    try {
      const response = await fetch(
        `/api/predictive-search?q=${encodeURIComponent(searchQuery)}`,
      );
      const data = await response.json();

      if (data.success && data.suggestions) {
        return data.suggestions;
      }
      return [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  // Handle search input changes
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      setIsLoading(true);
      setShowSuggestions(true);
      try {
        const results = await fetchSuggestions(value);
        setSuggestions(results);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      }
      setIsLoading(false);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    const path =
      suggestion.type === 'product'
        ? `/products/${suggestion.handle}`
        : suggestion.type === 'collection'
          ? `/collections/${suggestion.handle}`
          : `/pages/${suggestion.handle}`;

    navigate(path);
    setQuery('');
    setShowSuggestions(false);
    close(); // Close aside if search is in mobile menu
  };

  // Handle search submission
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onSearch?.(query);
      setShowSuggestions(false);
      close(); // Close aside if search is in mobile menu
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full backdrop-blur-sm border border-white/30 rounded-lg py-2 pl-3 pr-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
            style={{backgroundColor: '#f2c47f'}}
            aria-label="Rechercher des produits"
            autoComplete="off"
          />

          {/* Search Icon */}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Rechercher"
          >
            {isLoading ? (
              <LoadingSpinner size="sm" color="primary" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-black/95 backdrop-blur-sm border border-primary/30 rounded-sm shadow-lg shadow-black/50 max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionSelect(suggestion)}
              className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-primary/10 transition-colors ${
                index === selectedIndex ? 'bg-primary/20' : ''
              }`}
            >
              {/* Suggestion Image */}
              {suggestion.image && (
                <div className="w-8 h-8 bg-gray-700 rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={suggestion.image}
                    alt={suggestion.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Suggestion Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium truncate">
                    {suggestion.title}
                  </span>
                  {suggestion.price && (
                    <span className="text-primary text-sm ml-2">
                      {suggestion.price}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-gray-400">
                  <span className="capitalize">{suggestion.type}</span>
                </div>
              </div>

              {/* Arrow Icon */}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {showSuggestions &&
        !isLoading &&
        suggestions.length === 0 &&
        query.trim().length > 1 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-black/95 backdrop-blur-sm border border-primary/30 rounded-sm p-4 text-center">
            <p className="text-gray-400">Aucun résultat trouvé pour "{query}"</p>
          </div>
        )}
    </div>
  );
}

// Mobile search overlay
export function SearchOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const config = useConfig();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary/30">
          <h2 className="text-lg font-bold text-white">
            Search {config.brandName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <SearchBar
            autoFocus
            onSearch={onClose}
            placeholder={`Search ${config.brandName} products...`}
          />
        </div>

        {/* Popular Searches */}
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Boxing Gloves', 'Training Gear', 'Apparel', 'Accessories'].map(
              (term) => (
                <button
                  key={term}
                  className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full hover:bg-primary/30 transition-colors"
                  onClick={() => {
                    // Handle popular search selection
                    onClose();
                  }}
                >
                  {term}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

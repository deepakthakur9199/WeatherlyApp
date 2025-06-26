import React, { useState, KeyboardEvent } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const quickSearchCities = ['London', 'Paris', 'Tokyo', 'New York'];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-14 py-4 text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:bg-gray-400/20 disabled:cursor-not-allowed p-2 rounded-xl transition-all duration-200 group"
          >
            <Search className={`w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200 ${isLoading ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      </form>

      {/* Quick Search Buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {quickSearchCities.map((city) => (
          <button
            key={city}
            onClick={() => !isLoading && onSearch(city)}
            disabled={isLoading}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-gray-400/10 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 rounded-full text-white text-sm transition-all duration-200 hover:scale-105"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const coordQuery = `${latitude},${longitude}`;
          setQuery(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
          onSearch(coordQuery);
        } catch (error) {
          console.error('Error getting location:', error);
          alert('Unable to get weather for your location. Please try searching manually.');
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to access your location. Please enable location services or search manually.');
        setLocationLoading(false);
      }
    );
  };

  const popularCities = [
    'London', 'Paris', 'Tokyo', 'New York', 
    'Sydney', 'Dubai', 'Mumbai', 'Berlin'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any city worldwide..."
            className="w-full pl-12 pr-24 py-4 text-lg bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={isLoading || locationLoading}
              className="bg-white/20 hover:bg-white/30 disabled:bg-gray-400/20 disabled:cursor-not-allowed p-2 rounded-xl transition-all duration-200 group"
              title="Use current location"
            >
              <Navigation className={`w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200 ${locationLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-white/20 hover:bg-white/30 disabled:bg-gray-400/20 disabled:cursor-not-allowed p-2 rounded-xl transition-all duration-200 group"
            >
              <Search className={`w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200 ${isLoading ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {popularCities.map((city) => (
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
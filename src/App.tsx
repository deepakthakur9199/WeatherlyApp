import React, { useState } from 'react';
import { WeatherData } from './types/weather';
import { fetchWeatherData } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    setLastSearchedCity(city);

    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
              Weatherly
            </h1>
            <p className="text-white/80 text-lg lg:text-xl">
              Beautiful weather forecasts at your fingertips
            </p>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
            
            <div className="mt-8">
              {loading && <LoadingSpinner />}
              
              {error && !loading && (
                <ErrorMessage message={error} onRetry={handleRetry} />
              )}
              
              {weather && !loading && !error && (
                <WeatherCard weather={weather} />
              )}
              
              {!weather && !loading && !error && (
                <WelcomeMessage />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 px-4 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <p className="text-white/60 text-sm mb-2">
                <strong>Demo Mode:</strong> Using sample data for demonstration. 
              </p>
              <p className="text-white/60 text-xs">
                To use real weather data, get a free API key from OpenWeatherMap and replace the demo key in the code.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
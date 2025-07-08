import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeMessage from './components/WelcomeMessage';
import ApiKeyTester from './components/ApiKeyTester';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [showApiKeyTester, setShowApiKeyTester] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setLastSearchedCity(city);

    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
      setShowApiKeyTester(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(errorMessage);
      setWeather(null);
      
      if (errorMessage.includes('Invalid API key') || errorMessage.includes('API key')) {
        setShowApiKeyTester(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  const handleApiKeyValid = (validApiKey) => {
    console.log('Valid API key received:', validApiKey);
    setShowApiKeyTester(false);
    setError(null);
    
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  // Auto-load weather for user's location on first visit
  useEffect(() => {
    const hasAutoLoaded = localStorage.getItem('weatherly-auto-loaded');
    if (!hasAutoLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const coordQuery = `${latitude},${longitude}`;
            handleSearch(coordQuery);
            localStorage.setItem('weatherly-auto-loaded', 'true');
          } catch (error) {
            console.log('Auto-location failed, user can search manually');
          }
        },
        () => {
          console.log('Geolocation denied, user can search manually');
        }
      );
    }
  }, []);

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
              Real-time weather data powered by WeatherAPI
            </p>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            {!showApiKeyTester && (
              <SearchBar onSearch={handleSearch} isLoading={loading} />
            )}
            
            <div className="mt-8">
              {showApiKeyTester && (
                <ApiKeyTester onApiKeyValid={handleApiKeyValid} />
              )}
              
              {!showApiKeyTester && loading && <LoadingSpinner />}
              
              {!showApiKeyTester && error && !loading && (
                <ErrorMessage message={error} onRetry={handleRetry} />
              )}
              
              {!showApiKeyTester && weather && !loading && !error && (
                <WeatherCard weather={weather} />
              )}
              
              {!showApiKeyTester && !weather && !loading && !error && (
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
                <strong>Live Weather Data:</strong> Powered by WeatherAPI.com
              </p>
              <p className="text-white/60 text-xs">
                Get current weather conditions, air quality, and detailed forecasts for any location worldwide
              </p>
              {!showApiKeyTester && (
                <button
                  onClick={() => setShowApiKeyTester(true)}
                  className="mt-2 text-blue-300 hover:text-blue-200 text-xs underline"
                >
                  Test/Change API Key
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { AlertCircle, RefreshCw, MapPin, Key } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  const isApiKeyError = message.includes('API key') || message.includes('WeatherAPI');
  const isCityNotFound = message.includes("couldn't find") || message.includes('not found');
  
  const getErrorIcon = () => {
    if (isApiKeyError) return <Key className="w-16 h-16 text-yellow-400 mx-auto mb-4" />;
    if (isCityNotFound) return <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />;
    return <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />;
  };

  const getErrorTitle = () => {
    if (isApiKeyError) return 'API Key Issue';
    if (isCityNotFound) return 'City Not Found';
    return 'Oops!';
  };

  const getErrorSuggestions = () => {
    if (isApiKeyError) {
      return (
        <div className="text-white/70 text-sm mb-6 space-y-2">
          <p>To use this weather app, you need a valid WeatherAPI key:</p>
          <ol className="list-decimal list-inside space-y-1 text-left">
            <li>Visit <a href="https://www.weatherapi.com/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">WeatherAPI.com</a></li>
            <li>Sign up for a free account</li>
            <li>Get your API key from the dashboard</li>
            <li>Use the API key tester below to verify it works</li>
          </ol>
        </div>
      );
    }
    
    if (isCityNotFound) {
      return (
        <div className="text-white/70 text-sm mb-6 space-y-2">
          <p>Try these suggestions:</p>
          <ul className="list-disc list-inside space-y-1 text-left">
            <li>Check the spelling of the city name</li>
            <li>Try including the country (e.g., "Paris, France")</li>
            <li>Use a major city nearby</li>
            <li>Try using your current location button</li>
          </ul>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={`backdrop-blur-sm border rounded-2xl p-8 text-center max-w-lg mx-auto ${
      isApiKeyError 
        ? 'bg-yellow-500/10 border-yellow-500/20' 
        : isCityNotFound 
        ? 'bg-blue-500/10 border-blue-500/20'
        : 'bg-red-500/10 border-red-500/20'
    }`}>
      {getErrorIcon()}
      <h3 className="text-xl font-semibold text-white mb-2">{getErrorTitle()}</h3>
      <p className="text-white/80 mb-4">{message}</p>
      {getErrorSuggestions()}
      {onRetry && !isApiKeyError && (
        <button
          onClick={onRetry}
          className={`inline-flex items-center gap-2 px-6 py-3 border rounded-xl text-white transition-all duration-200 hover:scale-105 ${
            isCityNotFound
              ? 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30'
              : 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
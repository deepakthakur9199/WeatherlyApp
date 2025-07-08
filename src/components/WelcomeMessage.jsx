import React from 'react';
import { CloudSun, Search } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="text-center py-12 max-w-2xl mx-auto">
      <CloudSun className="w-24 h-24 text-white/80 mx-auto mb-6" />
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
        Welcome to Weatherly
      </h2>
      <p className="text-white/80 text-lg mb-8 leading-relaxed">
        Get real-time weather information for any city around the world. 
        Simply search for a location to see current conditions, temperature, 
        humidity, and more detailed weather data.
      </p>
      <div className="flex items-center justify-center gap-2 text-white/60">
        <Search className="w-5 h-5" />
        <span>Start by searching for a city above</span>
      </div>
    </div>
  );
};

export default WelcomeMessage;
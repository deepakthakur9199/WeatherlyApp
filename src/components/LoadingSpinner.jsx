import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
      <p className="text-white/80 text-lg">Fetching weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
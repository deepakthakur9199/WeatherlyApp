import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherIcon = (iconCode: string, description: string) => {
    const code = iconCode?.substring(0, 2) || '01';
    const iconProps = { className: "w-16 h-16 text-white drop-shadow-lg" };
    
    switch (code) {
      case '01': return <Sun {...iconProps} />;
      case '02':
      case '03':
      case '04': return <Cloud {...iconProps} />;
      case '09':
      case '10': return <CloudRain {...iconProps} />;
      case '11': return <Zap {...iconProps} />;
      case '13': return <CloudSnow {...iconProps} />;
      default: return <Sun {...iconProps} />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-400';
    if (temp >= 20) return 'text-orange-400';
    if (temp >= 10) return 'text-yellow-400';
    if (temp >= 0) return 'text-blue-400';
    return 'text-cyan-400';
  };

  const formatCityName = (name: string, country: string) => {
    return `${name}, ${country}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Weather Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section - Location and Temperature */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              {formatCityName(weather.name, weather.country)}
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              {getWeatherIcon(weather.icon, weather.description)}
              <div>
                <div className={`text-6xl lg:text-7xl font-bold ${getTemperatureColor(weather.temperature)}`}>
                  {weather.temperature}°
                </div>
                <div className="text-white/80 text-lg capitalize">
                  {weather.description}
                </div>
              </div>
            </div>
            <div className="text-white/70 text-lg">
              Feels like {weather.feelsLike}°C
            </div>
          </div>

          {/* Right Section - Quick Stats */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
              <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
              <div className="text-white/70 text-sm">Humidity</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
              <Wind className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.windSpeed}</div>
              <div className="text-white/70 text-sm">km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Thermometer className="w-6 h-6 text-red-400" />
            <span className="text-white font-semibold">Feels Like</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.feelsLike}°C</div>
          <div className="text-white/70 text-sm">Human perception</div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Gauge className="w-6 h-6 text-purple-400" />
            <span className="text-white font-semibold">Pressure</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.pressure}</div>
          <div className="text-white/70 text-sm">hPa</div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-semibold">Visibility</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.visibility}</div>
          <div className="text-white/70 text-sm">km</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
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
  Zap,
  MapPin,
  Clock,
  Compass,
  Shield
} from 'lucide-react';

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (iconUrl, description, isDay) => {
    // Use the actual icon from WeatherAPI or fallback to Lucide icons
    if (iconUrl) {
      return (
        <img 
          src={`https:${iconUrl}`} 
          alt={description}
          className="w-16 h-16 drop-shadow-lg"
        />
      );
    }
    
    // Fallback to Lucide icons
    const iconProps = { className: "w-16 h-16 text-white drop-shadow-lg" };
    const desc = description.toLowerCase();
    
    if (desc.includes('sunny') || desc.includes('clear')) {
      return isDay ? <Sun {...iconProps} /> : <Sun {...iconProps} className="w-16 h-16 text-yellow-300 drop-shadow-lg" />;
    } else if (desc.includes('cloud')) {
      return <Cloud {...iconProps} />;
    } else if (desc.includes('rain') || desc.includes('drizzle')) {
      return <CloudRain {...iconProps} />;
    } else if (desc.includes('snow')) {
      return <CloudSnow {...iconProps} />;
    } else if (desc.includes('thunder') || desc.includes('storm')) {
      return <Zap {...iconProps} />;
    }
    
    return <Sun {...iconProps} />;
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 35) return 'text-red-500';
    if (temp >= 25) return 'text-orange-400';
    if (temp >= 15) return 'text-yellow-400';
    if (temp >= 5) return 'text-green-400';
    if (temp >= -5) return 'text-blue-400';
    return 'text-cyan-400';
  };

  const formatLocation = (name, region, country) => {
    if (region && region !== name) {
      return `${name}, ${region}, ${country}`;
    }
    return `${name}, ${country}`;
  };

  const getAirQualityLevel = (usEpaIndex) => {
    if (!usEpaIndex) return { level: 'Unknown', color: 'text-gray-400' };
    
    switch (usEpaIndex) {
      case 1: return { level: 'Good', color: 'text-green-400' };
      case 2: return { level: 'Moderate', color: 'text-yellow-400' };
      case 3: return { level: 'Unhealthy for Sensitive', color: 'text-orange-400' };
      case 4: return { level: 'Unhealthy', color: 'text-red-400' };
      case 5: return { level: 'Very Unhealthy', color: 'text-purple-400' };
      case 6: return { level: 'Hazardous', color: 'text-red-600' };
      default: return { level: 'Unknown', color: 'text-gray-400' };
    }
  };

  const airQuality = weather.airQuality ? getAirQualityLevel(weather.airQuality.usEpaIndex) : null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Weather Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 mb-6 shadow-2xl hover:shadow-3xl transition-all duration-300">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Section - Location and Temperature */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-white/70" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                {formatLocation(weather.name, weather.region, weather.country)}
              </h2>
            </div>
            <div className="text-white/60 text-sm mb-4 flex items-center justify-center lg:justify-start gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {weather.localTime}
              </span>
              <span>Lat: {weather.coordinates.lat.toFixed(2)}, Lon: {weather.coordinates.lon.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              {getWeatherIcon(weather.icon, weather.description, weather.isDay)}
              <div>
                <div className={`text-6xl lg:text-7xl font-bold ${getTemperatureColor(weather.temperature)}`}>
                  {weather.temperature}°C
                </div>
                <div className="text-white/80 text-lg capitalize">
                  {weather.description}
                </div>
              </div>
            </div>
            <div className="text-white/70 text-lg">
              Feels like {weather.feelsLike}°C
            </div>
            <div className="text-white/60 text-sm mt-2">
              Last updated: {weather.lastUpdated}
            </div>
          </div>

          {/* Right Section - Quick Stats */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-200">
              <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.humidity}%</div>
              <div className="text-white/70 text-sm">Humidity</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-200">
              <Wind className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{weather.windSpeed}</div>
              <div className="text-white/70 text-sm">km/h</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
          <div className="text-white/70 text-sm">mb</div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-6 h-6 text-cyan-400" />
            <span className="text-white font-semibold">Visibility</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.visibility}</div>
          <div className="text-white/70 text-sm">km</div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Sun className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-semibold">UV Index</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.uvIndex}</div>
          <div className="text-white/70 text-sm">UV radiation</div>
        </div>
      </div>

      {/* Wind and Air Quality */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:from-green-500/20 hover:to-blue-500/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-6 h-6 text-green-400" />
            <span className="text-white font-semibold">Wind</span>
          </div>
          <div className="text-2xl font-bold text-white">{weather.windSpeed} km/h</div>
          <div className="text-white/70 text-sm">Direction: {weather.windDirection}</div>
        </div>

        {airQuality && (
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Air Quality</span>
            </div>
            <div className={`text-2xl font-bold ${airQuality.color}`}>{airQuality.level}</div>
            <div className="text-white/70 text-sm">US EPA Index: {weather.airQuality.usEpaIndex}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
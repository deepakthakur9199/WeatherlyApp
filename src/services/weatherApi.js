// Weather API service using WeatherAPI.com
const API_KEY = 'e0025b4cd7da44fd9d554504250607';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

export const fetchWeatherData = async (city) => {
  if (!city.trim()) {
    throw new Error('Please enter a city name');
  }

  // Handle coordinate-based searches (lat,lon format)
  let query = city;
  if (city.includes(',') && !isNaN(parseFloat(city.split(',')[0]))) {
    const [lat, lon] = city.split(',').map(coord => parseFloat(coord.trim()));
    query = `${lat},${lon}`;
  }
  
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&aqi=yes`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      if (data.error) {
        const errorCode = data.error.code;
        const errorMessage = data.error.message;
        
        if (errorCode === 1006) {
          throw new Error(`Sorry, we couldn't find "${city}". Please check the spelling or try a different city name.`);
        } else if (errorCode === 2006) {
          throw new Error(`Invalid API key. Please get a valid API key from WeatherAPI.com and update it in the app.`);
        } else if (errorCode === 2007) {
          throw new Error('API key quota exceeded. Please check your WeatherAPI.com account limits.');
        } else if (errorCode === 9999) {
          throw new Error('WeatherAPI service is temporarily unavailable. Please try again later.');
        } else {
          throw new Error(`API Error (${errorCode}): ${errorMessage}`);
        }
      } else {
        throw new Error(`HTTP Error ${response.status}: Unable to fetch weather data.`);
      }
    }
    
    return transformWeatherData(data);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your internet connection and try again.');
  }
};

const transformWeatherData = (data) => {
  const current = data.current;
  const location = data.location;
  
  const localTime = new Date(location.localtime);
  
  return {
    name: location.name,
    country: location.country,
    region: location.region,
    temperature: Math.round(current.temp_c),
    description: current.condition.text,
    humidity: current.humidity,
    windSpeed: Math.round(current.wind_kph),
    windDirection: current.wind_dir,
    feelsLike: Math.round(current.feelslike_c),
    pressure: Math.round(current.pressure_mb),
    visibility: Math.round(current.vis_km),
    uvIndex: current.uv,
    icon: current.condition.icon,
    isDay: current.is_day === 1,
    localTime: localTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }),
    lastUpdated: new Date(current.last_updated).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }),
    coordinates: {
      lat: location.lat,
      lon: location.lon
    },
    airQuality: data.current.air_quality ? {
      co: data.current.air_quality.co?.toFixed(1),
      no2: data.current.air_quality.no2?.toFixed(1),
      o3: data.current.air_quality.o3?.toFixed(1),
      pm2_5: data.current.air_quality.pm2_5?.toFixed(1),
      pm10: data.current.air_quality.pm10?.toFixed(1),
      usEpaIndex: data.current.air_quality['us-epa-index']
    } : null
  };
};

// Test function for API key validation
export const testApiKey = async (apiKey = API_KEY) => {
  try {
    const response = await fetch(`${BASE_URL}?key=${apiKey}&q=London&aqi=no`);
    const data = await response.json();
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
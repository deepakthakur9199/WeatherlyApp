import { WeatherResponse, WeatherData, ApiError } from '../types/weather';

const API_KEY = 'demo'; // Users will need to replace with their actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  if (!city.trim()) {
    throw new Error('Please enter a city name');
  }

  // For demo purposes, return mock data when using demo API key
  if (API_KEY === 'demo') {
    return getMockWeatherData(city);
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      const error = data as ApiError;
      throw new Error(error.message || `City "${city}" not found`);
    }
    
    return transformWeatherData(data as WeatherResponse);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};

const transformWeatherData = (data: WeatherResponse): WeatherData => {
  return {
    name: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // Convert to km
    icon: data.weather[0].icon,
  };
};

// Mock data for demo purposes
const getMockWeatherData = (city: string): WeatherData => {
  const mockCities: Record<string, Partial<WeatherData>> = {
    'london': {
      name: 'London',
      country: 'GB',
      temperature: 18,
      description: 'partly cloudy',
      humidity: 65,
      windSpeed: 12,
      feelsLike: 16,
      pressure: 1013,
      visibility: 10,
      icon: '02d'
    },
    'paris': {
      name: 'Paris',
      country: 'FR',
      temperature: 22,
      description: 'clear sky',
      humidity: 45,
      windSpeed: 8,
      feelsLike: 24,
      pressure: 1018,
      visibility: 15,
      icon: '01d'
    },
    'tokyo': {
      name: 'Tokyo',
      country: 'JP',
      temperature: 26,
      description: 'light rain',
      humidity: 78,
      windSpeed: 15,
      feelsLike: 28,
      pressure: 1008,
      visibility: 8,
      icon: '10d'
    },
    'new york': {
      name: 'New York',
      country: 'US',
      temperature: 24,
      description: 'scattered clouds',
      humidity: 58,
      windSpeed: 18,
      feelsLike: 26,
      pressure: 1015,
      visibility: 12,
      icon: '03d'
    }
  };

  const cityKey = city.toLowerCase();
  const mockData = mockCities[cityKey] || {
    name: city,
    country: 'XX',
    temperature: 20,
    description: 'clear sky',
    humidity: 50,
    windSpeed: 10,
    feelsLike: 22,
    pressure: 1013,
    visibility: 10,
    icon: '01d'
  };

  return mockData as WeatherData;
};
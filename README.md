# Weatherly 🌤️

A beautiful, responsive weather application that provides real-time weather data for any location worldwide.

## Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Detailed Information**: Temperature, humidity, wind speed, air quality, UV index, and more
- **Location Support**: Search by city name or use your current location
- **Air Quality**: Monitor air pollution levels with EPA index
- **Mobile Friendly**: Fully responsive design that works on all devices

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:5173`

## API Key Setup

This app uses WeatherAPI.com for weather data. To use it:

1. Sign up for a free account at [WeatherAPI.com](https://www.weatherapi.com/)
2. Get your API key from the dashboard
3. Replace the API key in `src/services/weatherApi.js`

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- Lucide React (for icons)
- WeatherAPI.com

## Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT License - feel free to use this project for your own purposes.
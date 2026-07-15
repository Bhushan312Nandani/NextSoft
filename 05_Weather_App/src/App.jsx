import { useState, useEffect } from 'react';
import { Search, Loader2, MapPin, Wind, Droplets, Cloud, CloudRain, Sun, CloudLightning, Snowflake } from 'lucide-react';
import './App.css';

const getWeatherDetails = (code) => {
  if (code === 0) return { label: 'Clear sky', icon: <Sun className="weather-icon sun" size={80} /> };
  if ([1, 2, 3].includes(code)) return { label: 'Partly cloudy', icon: <Cloud className="weather-icon cloud" size={80} /> };
  if ([45, 48].includes(code)) return { label: 'Fog', icon: <Cloud className="weather-icon cloud" size={80} /> };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: <CloudRain className="weather-icon rain" size={80} /> };
  if ([61, 63, 65, 66, 67].includes(code)) return { label: 'Rain', icon: <CloudRain className="weather-icon rain" size={80} /> };
  if ([71, 73, 75, 77].includes(code)) return { label: 'Snow', icon: <Snowflake className="weather-icon snow" size={80} /> };
  if ([80, 81, 82].includes(code)) return { label: 'Rain showers', icon: <CloudRain className="weather-icon rain" size={80} /> };
  if ([85, 86].includes(code)) return { label: 'Snow showers', icon: <Snowflake className="weather-icon snow" size={80} /> };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: <CloudLightning className="weather-icon thunder" size={80} /> };
  
  return { label: 'Unknown', icon: <Cloud className="weather-icon" size={80} /> };
};

function App() {
  const [city, setCity] = useState('New York');
  const [searchInput, setSearchInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Get coordinates for city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
      if (!geoRes.ok) throw new Error('Network error');
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const location = geoData.results[0];
      
      // 2. Get weather for coordinates
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`);
      if (!weatherRes.ok) throw new Error('Network error fetching weather');
      const weatherJson = await weatherRes.json();
      
      setWeatherData({
        city: location.name,
        country: location.country,
        ...weatherJson.current
      });
      setCity(location.name);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search for a city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            <Search size={20} />
          </button>
        </form>

        {loading && (
          <div className="loading-state">
            <Loader2 className="spinner" size={40} />
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && weatherData && (
          <div className="weather-content fade-in">
            <div className="location-header">
              <MapPin size={24} className="location-icon" />
              <h2>{weatherData.city}{weatherData.country ? `, ${weatherData.country}` : ''}</h2>
            </div>
            
            <div className="weather-main">
              <div className="weather-icon-container">
                {getWeatherDetails(weatherData.weather_code).icon}
              </div>
              <div className="temperature-container">
                <h1 className="temperature">
                  {Math.round(weatherData.temperature_2m)}°<span className="unit">C</span>
                </h1>
                <p className="weather-description">
                  {getWeatherDetails(weatherData.weather_code).label}
                </p>
                <p className="feels-like">
                  Feels like {Math.round(weatherData.apparent_temperature)}°C
                </p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-card">
                <Wind className="detail-icon" size={24} />
                <div className="detail-info">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{weatherData.wind_speed_10m} km/h</span>
                </div>
              </div>
              <div className="detail-card">
                <Droplets className="detail-icon" size={24} />
                <div className="detail-info">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weatherData.relative_humidity_2m}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

'use client';

import { useState } from 'react';
import cities from '../data/cities';
import { fetchCurrentWeather, fetch5DayForecast } from '../utils/fetchWeather';
import WeatherCard from './WeatherCard';
import HourlyChart from './HourlyChart';
import DailyChart from './DailyChart';
import { useAuth } from '../context/AuthContext';
import { saveCity } from '../utils/firestoreUtils';
import toast from 'react-hot-toast';

export default function CitySearchBar() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleInput = (e) => {
    const value = e.target.value;
    setCity(value);
    setWeatherData(null);
    setForecastData(null);

    if (value.length > 1) {
      const filtered = cities
        .filter((c) => c.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = async (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    setLoading(true);

    try {
      const current = await fetchCurrentWeather(selectedCity);
      const forecast = await fetch5DayForecast(selectedCity);
      setWeatherData(current);
      setForecastData(forecast);
    } catch {
      toast.error('City not found');
      setWeatherData(null);
      setForecastData(null);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setCity('');
    setWeatherData(null);
    setForecastData(null);
    setSuggestions([]);
  };

  const handleSave = async () => {
    if (!user?.uid || !weatherData?.city) {
      toast.error('Missing user or city');
      return;
    }

    try {
      await saveCity(user.uid, weatherData.city);
      toast.success('City saved!');
    } catch (err) {
      toast.error(err.message || 'Could not save city');
    }
  };

  return (
    <div className="autocomplete-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (city && !weatherData) handleSelect(city);
        }}
        className="search-form"
      >
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={handleInput}
            className="search-input"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li key={item} onClick={() => handleSelect(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {!weatherData ? (
          <button type="submit" className="search-button">
            {loading ? 'Loading...' : 'Go'}
          </button>
        ) : (
          <button type="button" onClick={handleClear} className="search-button">
            Clear
          </button>
        )}
      </form>

      {weatherData && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <WeatherCard {...weatherData} />

          {user && (
            <button
              onClick={handleSave}
              className="login-btn"
              style={{ marginTop: '20px' }}
            >
              Save City
            </button>
          )}
        </div>
      )}

      {forecastData && (
        <>
          <HourlyChart forecastData={forecastData} />
          <DailyChart forecastData={forecastData} />
        </>
      )}
    </div>
  );
}

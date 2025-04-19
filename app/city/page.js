'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetch5DayForecast } from '../../../utils/fetchWeather';
import ForecastChart from '../../../components/ForecastChart';
import WeatherCard from '../../../components/WeatherCard';

export default function CityForecastPage() {
  const { city } = useParams();
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getForecast() {
      try {
        const data = await fetch5DayForecast(city);
        setForecast(data);
      } catch (err) {
        setError('Failed to load forecast.');
      }
    }
    getForecast();
  }, [city]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>5-Day Forecast for {city}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {forecast && (
        <>
          <WeatherCard
            city={forecast.city.name}
            temperature={`${forecast.list[0].main.temp}°C`}
            description={forecast.list[0].weather[0].description}
            icon={forecast.list[0].weather[0].icon}
          />
          <ForecastChart data={forecast.list} />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '40px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
};
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetch5DayForecast } from '../../../utils/fetchWeather';
import WeatherCard from '../../../components/WeatherCard';

export default function CityForecastPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city || '');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    const getForecast = async () => {
      setLoading(true);
      try {
        const data = await fetch5DayForecast(city);
        setForecast(data);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load forecast.');
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    getForecast();
  }, [city]);

  const current = forecast?.list?.[0];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Weather Forecast for {city}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p className="text-gray-400">Loading forecast...</p>}

      {forecast?.city && current && (
        <>
          <WeatherCard
            city={forecast.city.name}
            temperature={Math.round(current.main.temp)}
            feelsLike={Math.round(current.main.feels_like)}
            humidity={current.main.humidity}
            windSpeed={Math.round(current.wind.speed * 3.6)}
            tempMin={Math.round(current.main.temp_min)}
            tempMax={Math.round(current.main.temp_max)}
            pressure={current.main.pressure}
            visibility={Math.round((current.visibility ?? 10000) / 1000)}
            description={current.weather[0].description}
            icon={current.weather[0].icon}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '4px 2px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
    color: '#00ffff',
  },
};
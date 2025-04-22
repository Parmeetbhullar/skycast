const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'City not found');
  }

  const data = await res.json();

  return {
    city: data.name,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    pressure: data.main.pressure,
    visibility: Math.round(data.visibility / 1000),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

export async function fetch5DayForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Forecast not found');
  }

  const data = await res.json();

  if (process.env.NODE_ENV === 'development') {
    console.log('[5-Day Forecast]', data);
  }

  return data;
}
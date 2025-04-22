const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchCurrentWeather(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    throw new Error('City not found');
  }

  return res.json();
}

export async function fetch5DayForecast(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    throw new Error('Forecast not found');
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[5-Day Forecast]', city, await res.clone().json());
  }

  return res.json();
}
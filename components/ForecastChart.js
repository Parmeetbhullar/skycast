'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * ForecastChart component to display 5-day temperature data.
 * @param {Object} forecastData - Data from OpenWeatherMap forecast API.
 */
export default function ForecastChart({ forecastData }) {
  // ✅ Defensive check for valid forecast data with more than 1 data point
  if (!forecastData?.list || forecastData.list.length < 2) {
    return (
      <p style={{ textAlign: 'center', color: '#aaa' }}>
        Forecast chart requires multiple data points.
      </p>
    );
  }

  // ✅ Convert first 8 time slots (~24 hours) to chart-friendly format
  const chartData = forecastData.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    }),
    temp: item.main.temp,
  }));

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Next 24 Hours</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={['auto', 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#00ffff"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: '30px',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 0 12px rgba(0, 255, 255, 0.05)',
  },
  heading: {
    marginBottom: '16px',
    fontSize: '1.2rem',
    color: '#00ffff',
  },
};

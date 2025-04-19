'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function ForecastChart({ forecastData }) {
  const chartData = forecastData.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    }),
    temp: item.main.temp,
    icon: item.weather[0].icon,
    desc: item.weather[0].description,
  }));

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <image
        href={`https://openweathermap.org/img/wn/${payload.icon}.png`}
        x={cx - 15}
        y={cy - 50}
        width={30}
        height={30}
      />
    );
  };

  return (
    <div className="glass" style={{ marginTop: '40px', padding: '20px' }}>
      <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>
        24h Hourly Forecast
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff',
            }}
            formatter={(value, name, props) =>
              name === 'temp' ? [`${value}°C`, 'Temperature'] : value
            }
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#00ffff"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

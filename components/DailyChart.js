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

export default function DailyChart({ forecastData }) {
  const daily = forecastData.list
    .filter((_, i) => i % 8 === 0)
    .map(item => ({
      date: new Date(item.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short'
      }),
      temp: item.main.temp,
    }));

  return (
    <div className="glass" style={{ marginTop: '30px', padding: '20px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>5-Day Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={daily}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#111',
              border: '1px solid #00ffff',
              borderRadius: '8px',
              color: '#00ffff',
            }}
            labelFormatter={(label) => `Day: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#00ffff"
            strokeWidth={3}
            dot={{ r: 5, fill: '#00ffff' }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
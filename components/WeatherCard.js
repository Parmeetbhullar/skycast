export default function WeatherCard({
  city,
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  tempMin,
  tempMax,
  pressure,
  visibility,
  description,
  icon,
}) {
  return (
    <div style={styles.card} className="glass">
      <h2 style={styles.city}>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={styles.icon}
      />
      <p style={styles.description}>{description}</p>
      <p style={styles.temp}>{temperature}°C</p>

      <div style={styles.details}>
        <Detail label="Feels Like" value={`${feelsLike}°C`} />
        <Detail label="Humidity" value={`${humidity}%`} />
        <Detail label="Wind" value={`${windSpeed} km/h`} />
        <Detail label="Min / Max" value={`${tempMin}° / ${tempMax}°`} />
        <Detail label="Pressure" value={`${pressure} hPa`} />
        <Detail label="Visibility" value={`${visibility} km`} />
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div style={styles.detailRow}>
      <span style={styles.label}>{label}:</span>
      <span>{value}</span>
    </div>
  );
}

const styles = {
  card: {
    width: '300px',
    margin: '0 auto',
    padding: '30px 20px',
    textAlign: 'center',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(0, 255, 255, 0.08)',
    transition: 'transform 0.3s ease',
  },
  city: {
    fontSize: '1.6rem',
    fontWeight: 600,
    marginBottom: '10px',
    color: '#00ffff',
  },
  icon: {
    width: '90px',
    marginBottom: '10px',
  },
  description: {
    textTransform: 'capitalize',
    fontSize: '1.1rem',
    color: '#ccc',
  },
  temp: {
    fontSize: '2.3rem',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#00ffff',
  },
  details: {
    marginTop: '16px',
    paddingTop: '12px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.95rem',
    color: '#ccc',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    color: '#aaa',
  },
};
export default function WeatherCard({ city, temperature, description, icon }) {
  return (
    <div style={styles.card} className="glass">
      <h2 style={styles.city}>{city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        style={styles.icon}
      />
      <p style={styles.description}>{description}</p>
      <p style={styles.temp}>{temperature}</p>
    </div>
  );
}

const styles = {
  card: {
    width: '280px',
    margin: '0 auto',
    padding: '30px 20px',
    textAlign: 'center',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#ffffff',
    boxShadow: '0 8px 24px rgba(0, 255, 255, 0.05)',
    transition: 'transform 0.3s ease',
  },
  city: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '10px',
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
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#00ffff',
  },
};
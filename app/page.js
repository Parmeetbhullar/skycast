'use client';

import CitySearchBar from '../components/CitySearchBar';

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1 className="neon-title">Welcome to <span className="skycast-glow">SkyCast</span></h1>
      <p className="glow-subtext">Search for any city to see current weather conditions.</p>

      <CitySearchBar />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2px 16px 40px',
    textAlign: 'center',
    zIndex: 1,
  },
};
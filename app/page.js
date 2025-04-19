'use client';

import CitySearchBar from '../components/CitySearchBar';

export default function HomePage() {
  return (
    <div style={styles.container}>
      <h1>Welcome to SkyCast</h1>
      <p>Search for any city to see current weather conditions.</p>

      <CitySearchBar />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px 16px 40px',
    textAlign: 'center',
  },
};

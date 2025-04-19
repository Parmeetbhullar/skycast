'use client';

import Link from 'next/link';

export default function SavedCityItem({ city, onDelete }) {
  return (
    <div style={styles.card} className="glass">
      <Link href={`/city/${city.toLowerCase()}`} style={styles.name}>
        <h3>{city}</h3>
      </Link>
      <button onClick={() => onDelete(city)} style={styles.btn}>Remove</button>
    </div>
  );
}

const styles = {
  card: {
    width: '100%',
    padding: '20px',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#fff',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 4px 20px rgba(0,255,255,0.06)',
    transition: 'transform 0.3s ease',
  },
  name: {
    textDecoration: 'none',
    color: '#00ffff',
    fontWeight: 600,
    fontSize: '1.2rem',
  },
  btn: {
    marginTop: '12px',
    background: '#e74c3c',
    border: 'none',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background 0.2s ease',
  },
};
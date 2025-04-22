'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SavedCityItem from '../../components/SavedCityItem';
import { getSavedCities, deleteCity } from '../../utils/firestoreUtils';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchCities = async () => {
      const saved = await getSavedCities(user.uid);
      setCities(saved);
    };

    fetchCities();
  }, [user, router]);

  const handleDelete = async (cityId) => {
    await deleteCity(user.uid, cityId);
    setCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Saved Cities</h1>
      <div style={styles.grid}>
        {cities.map((city) => (
          <SavedCityItem
            key={city.id}
            city={city.name}
            onDelete={() => handleDelete(city.id)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
  },
};
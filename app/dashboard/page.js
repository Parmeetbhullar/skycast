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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchCities = async () => {
      const saved = await getSavedCities(user.uid);
      setCities(saved);
      setLoading(false);
    };

    fetchCities();
  }, [user, router]);

  const handleDelete = async (cityId) => {
    await deleteCity(user.uid, cityId);
    setCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 sm:px-6 lg:px-8 fade-section">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold clean-title skycast-glow mb-4">
          My Saved Cities
        </h1>
        <p className="glow-subtext mb-10">
          Manage your favorite weather spots below.
        </p>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading your saved cities...</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {cities.map((city) => (
              <SavedCityItem
                key={city.id}
                city={city.name}
                onDelete={() => handleDelete(city.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

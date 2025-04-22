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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Saved Cities</h1>

        {loading ? (
          <p className="text-gray-500">Loading your saved cities...</p>
        ) : cities.length === 0 ? (
          <p className="text-gray-500">No cities saved yet. Go explore and save some!</p>
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

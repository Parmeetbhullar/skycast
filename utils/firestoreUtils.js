import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export async function saveCity(userId, cityName) {
  const citiesRef = collection(db, 'users', userId, 'cities');
  
  const q = query(citiesRef, where('name', '==', cityName));
  const existing = await getDocs(q);
  if (!existing.empty) {
    throw new Error('City already saved');
  }

  await addDoc(citiesRef, { name: cityName });
}

export async function getSavedCities(userId) {
  const citiesRef = collection(db, 'users', userId, 'cities');
  const snapshot = await getDocs(citiesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function deleteCity(userId, docId) {
  const cityRef = doc(db, 'users', userId, 'cities', docId);
  await deleteDoc(cityRef);
}
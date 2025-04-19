'use client';

import { useAuth } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/firebase';

export default function AuthButton() {
  const { user, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      {!user && <button onClick={handleLogin}>Sign in with Google</button>}
      {user && <button onClick={logout}>Logout</button>}
    </>
  );
}
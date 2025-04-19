'use client';

import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, provider } from '../../firebase/firebase';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card glass">
        <h1>Sign in to SkyCast</h1>
        <p className="subtitle">Personalize your weather dashboard</p>
        <button
          onClick={handleLogin}
          className="login-btn"
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}
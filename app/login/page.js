'use client';

import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { auth, provider } from '../../firebase/firebase';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      setErrorMsg('Connection failed');
      setTimeout(() => setErrorMsg(''), 1000);
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
          {loading
            ? 'Connecting...'
            : errorMsg
            ? errorMsg
            : 'Continue with Google'}
        </button>
      </div>

      <button className="back-home-btn" onClick={() => router.push('/')}>
        ← Back to Home
      </button>
    </div>
  );
}

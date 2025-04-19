'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // 🔥 Hide nav bar on /login page
  if (pathname === '/login') return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/">SkyCast</Link>
      </div>
      <div style={styles.links}>
        <Link href="/">Home</Link>
        {user && <Link href="/dashboard">Dashboard</Link>}
        {!user && <Link href="/login">Login</Link>}
        {user && (
          <button onClick={logout} style={styles.logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '60px',
    background: 'rgba(20, 20, 20, 0.9)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 30px',
    zIndex: 1000,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    color: '#ffffff',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    color: '#ffffff',
  },
  logout: {
    background: '#e74c3c',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
  },
};
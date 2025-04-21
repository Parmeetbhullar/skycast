'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <nav className="navbar">
      <Link href="/" className="logo">SkyCast</Link>

      <div className="nav-links">
        <Link href="/" className="nav-link">Home</Link>
        {user && <Link href="/dashboard" className="nav-link">Dashboard</Link>}
        {!user && <Link href="/login" className="nav-link">Login</Link>}
        {user && (
          <button onClick={logout} className="nav-link logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
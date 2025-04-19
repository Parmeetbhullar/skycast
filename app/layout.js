import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'SkyCast',
  description: 'Next-gen weather platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="dark">
        <AuthProvider>
          <NavBar />
           <Toaster position="top-center" />
             <main className="page-container">
              {children}
              </main>
          </AuthProvider>
      </body>
    </html>
  );
}
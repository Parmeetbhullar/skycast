import '../styles/globals.css';
import AuthProvider from '../context/AuthContext';
import NavBar from '../components/NavBar';
import { Toaster } from 'react-hot-toast';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: 'SkyCast',
  description: 'weather platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="dark">
        <AuthProvider>
          <NavBar />
          <Toaster position="top-center" />
          <main className="page-container">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
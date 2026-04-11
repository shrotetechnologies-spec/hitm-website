import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: 'HITM Ranchi – Holistic Institute of Technology & Management | Admissions Open 2026',
  description: 'HITM Ranchi — Premier institution in Jharkhand for Engineering, Management & Technology. NAAC Accredited. Apply for 2026 admissions.',
  keywords: 'HITM Ranchi, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

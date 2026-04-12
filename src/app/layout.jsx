import './globals.css';

export const metadata = {
  title: 'Al Haider College of Technology | Admissions Open 2026 - AHCT',
  description: 'Al Haider College of Technology (AHCT) — Premier institution in Jharkhand for Engineering, Management & Technology. NAAC Accredited. Apply for 2026 admissions.',
  keywords: 'AHCT Ranchi, Al Haider College of Technology, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
  icons: {
    icon: 'https://ahctranchi.com/wp-content/uploads/2025/06/cropped-Haidar-1-32x32.jpg',
    apple: 'https://ahctranchi.com/wp-content/uploads/2025/06/cropped-Haidar-1-180x180.jpg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

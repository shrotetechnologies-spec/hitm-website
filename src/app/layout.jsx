import './globals.css';

export const metadata = {
  title: 'HITM Ranchi – Holistic Institute of Technology & Management | Admissions Open 2026',
  description: 'HITM Ranchi — Premier institution in Jharkhand for Engineering, Management & Technology. NAAC Accredited. Apply for 2026 admissions.',
  keywords: 'HITM Ranchi, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

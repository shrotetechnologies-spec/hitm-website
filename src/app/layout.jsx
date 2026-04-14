import './globals.css';
import FloatingApply from '@/components/FloatingApply';

export const metadata = {
  title: 'Haidar Institute of Technology and Management | Admissions Open 2026 - HITM',
  description: 'Haidar Institute of Technology and Management (HITM) — Premier institution in Jharkhand for Engineering, Management & Technology. Apply for 2026 admissions.',
  keywords: 'HITM Ranchi, Haidar Institute of Technology and Management, engineering college Jharkhand, management institute Ranchi, BCA BTech MBA admissions 2026',
  icons: {
    icon: '/images/logo/ahct-logo.jpg',
    apple: '/images/logo/ahct-logo.jpg',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
        <FloatingApply />
      </body>
    </html>
  );
}

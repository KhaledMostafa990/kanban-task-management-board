import './globals.scss';
import { Plus_Jakarta_Sans } from 'next/font/google';

import Header from '@/features/Header';
import Sidebar from '@/features/Sidebar';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-family-primary',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} dark-theme  scroll-smooth font-primary`}>
        <div className="h-screen min-h-screen overflow-hidden">
          <Header />

          <div className="relative flex min-h-full w-full transition-all">
            <Sidebar />

            <main className="w-full bg-background-secondary py-12">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: 'Kanban Task Management Board',
    template: '%s | Board ',
  },
  description:
    'I’m a junior front-end developer looking for a new role in an exciting company. I focus on writing accessible HTML, using modern CSS practices and writing clean JavaScript.',
  creator: 'Khaled Farghly',

  icons: {
    icon: '/images/favicon-32x32.png',
    shortcut: '/images/favicon-32x32.png',
    apple: '/images/favicon-32x32.png',
    other: {
      rel: '/images/favicon-32x32.png',
      url: '/images/favicon-32x32.png',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    siteName: 'Minimalist Portfolio',
    title: 'Minimalist Portfolio',
    description:
      'Designo is over 10 years in the industry, we are experienced in creating fully responsive websites, app design, and engaging brand experiences.',
    url: 'https://Alex-Minimalist-Portoflio.vercel.app/',
    locale: 'en_IE',
    images: [],
  },
};

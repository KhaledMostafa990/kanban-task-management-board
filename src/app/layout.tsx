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
      <body className={`${plusJakartaSans.variable} scroll-smooth font-primary`}>
        <div className="flex bg-base">
          <div className="realtive ml-[-300px] flex flex-1 flex-col transition-all duration-300">
            <Header className="w-screen bg-base py-12" />
            <main className="h-full w-screen flex-1 bg-muted py-12">{children}</main>
          </div>

          <Sidebar className="realtive h-screen min-w-[300px] flex-1 translate-x-[-100%] transform  bg-base py-10 transition-transform" />
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

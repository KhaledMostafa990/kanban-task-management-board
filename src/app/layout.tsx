import './globals.scss';
import { Plus_Jakarta_Sans } from 'next/font/google';

import Header from '@/features/Header';
import Sidebar from '@/features/Sidebar';
import Modal from '@/features/Modal';
import ReduxProvider from './store/ReduxProvider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-family-primary',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} scroll-smooth font-primary`}>
        <ReduxProvider>
          <div className="dark-theme h-screen min-h-screen overflow-hidden">
            <Header />

            <div className="relative flex min-h-full w-full transition-all">
              <Sidebar />
              <main className="w-full bg-background-secondary py-12">{children}</main>
            </div>

            <Modal />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: 'Kanban Task Management Board',
    template: '%s | Board ',
  },
  description: 'kanban board for task management, built with React, Redux, and Tailwind CSS',
  creator: 'Khaled Farghly',

  icons: {
    icon: '/assets/favicon-32x32.png',
    shortcut: '/assets/favicon-32x32.png',
    apple: '/assets/favicon-32x32.png',
    other: {
      rel: '/assets/favicon-32x32.png',
      url: '/assets/favicon-32x32.png',
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
    siteName: 'Kanban Task Management Board',
    title: 'Kanban Task Management Board',
    description: 'kanban board for task management, built with React, Redux, and Tailwind CSS',
    url: 'https://kanban-task-management-board.vercel.app/',
    locale: 'en_IE',
    images: [],
  },
};

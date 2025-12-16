import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocTranslate - Instant Document Translation',
  description: 'Translate PDF, DOCX, and PPTX documents instantly while preserving layout and formatting.',
  metadataBase: new URL('https://pdftranslator.info'), // Update with your actual domain
  openGraph: {
    title: 'DocTranslate',
    description: 'Instant Document Translation preserving layout.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

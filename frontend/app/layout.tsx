import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });
export const viewport: Viewport = { themeColor: '#2563eb', width: 'device-width', initialScale: 1 };
export const metadata: Metadata = {
  title: 'Document Translator',
  description: 'Secure AI Document Translation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <div className="flex-1">{children}</div>
        <footer className="py-8 bg-slate-50 border-t border-slate-200 text-center">
            <div className="flex justify-center gap-6 text-sm text-slate-500">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
            </div>
        </footer>
      </body>
    </html>
  );
}

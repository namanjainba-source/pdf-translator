import "./globals.css";

export const metadata = {
  title: "PDF Translator – Translate Documents Instantly",
  description: "Translate PDF and documents online in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 font-semibold text-lg">
            PDFTranslator
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-16">
          {children}
        </main>

        <footer className="border-t bg-white mt-20">
          <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} PDFTranslator. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

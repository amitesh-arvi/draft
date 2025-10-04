import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Draft - Your Writing Companion',
  description: 'A simple, powerful text editor for your thoughts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

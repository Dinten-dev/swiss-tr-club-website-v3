import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Swiss TR-Club | British Roadsters seit 1973',
  description: 'Der Schweizer Club für Triumph TR-Sportwagen, gemeinsame Ausfahrten und technische Leidenschaft.',
  openGraph: {
    title: 'Swiss TR-Club',
    description: 'British roadsters. Swiss roads.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swiss TR-Club',
    description: 'British roadsters. Swiss roads.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body>{children}</body></html>;
}

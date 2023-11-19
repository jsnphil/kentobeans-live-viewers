import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import '../styles/globals.css';
import Navbar from '../components/Navigation';

export const metadata: Metadata = {
  title: 'Kentobeans Live',
  description: 'Home for Kentobeans7 Drum Streams'
};

import { Maven_Pro } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const mavenProFont = Maven_Pro({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={mavenProFont.className}>
      <body>
        <Navbar />
        <main>
          <Container>
            <div className='pt-5'>{children}</div>
          </Container>
        </main>
      </body>
    </html>
  );
}

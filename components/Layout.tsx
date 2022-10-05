import Footer from './Footer';
import Navbar from './Navigation';

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

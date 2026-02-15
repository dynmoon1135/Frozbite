import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import ChatBot from '@/components/ChatBot';
import OrderHistoryDrawer from '@/components/OrderHistoryDrawer';
import AuthProvider from '@/components/AuthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'FrozBite Solutions | Frozen Food Berkualitas',
  description: 'Solusi praktis, higienis, dan terjangkau. Siap kirim kapan saja.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      {/* Jangan taruh overflow-hidden di body, biarkan standar saja */}
      <body className={`${poppins.className} bg-slate-50 text-slate-800 antialiased`}>
        <AuthProvider>
          <CartProvider>
            
            {/* INI KUNCI UTAMANYA: Bungkusan Anti-Bocor Kanan Kiri */}
            <div className="relative w-full max-w-full overflow-x-hidden min-h-screen flex flex-col">
              <Navbar />
              <CartDrawer /> 
              <OrderHistoryDrawer />
              <ChatBot />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
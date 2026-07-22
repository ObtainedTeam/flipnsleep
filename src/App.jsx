import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ExitPopup from './components/ExitPopup';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from './currency';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';
import WhyChooseUs from './pages/WhyChooseUs';

export function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
      <CurrencyProvider>
        <ScrollToTop />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Poppins', sans-serif; background: #F9F8F3; color: #201B5D; overflow-x: hidden; }
          a { color: inherit; }
          img { max-width: 100%; }
          summary::-webkit-details-marker { display: none; }
        `}</style>
        <Nav onCartOpen={() => setCartOpen(true)} />
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <ExitPopup />
        <NewsletterPopup />
        <main>
          <Routes>
            <Route path="/" element={<Home onCartOpen={() => setCartOpen(true)} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<Product onCartOpen={() => setCartOpen(true)} />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/why-flipnsleep" element={<WhyChooseUs />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/returns" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="*" element={<Home onCartOpen={() => setCartOpen(true)} />} />
          </Routes>
        </main>
        <Footer />
      </CurrencyProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

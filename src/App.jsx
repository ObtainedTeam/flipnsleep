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
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Pets from './pages/Pets';
import Accessories from './pages/Accessories';
import Reviews from './pages/Reviews';
import Legal from './pages/Legal';
import Activity from './pages/Activity';
import WhyChooseUs from './pages/WhyChooseUs';
import { activities } from './data/activities';

export function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
      <CurrencyProvider>
        <ScrollToTop />
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"/>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Archivo', sans-serif; background: #F7F9F8; overflow-x: hidden; }
          a { color: inherit; }
          img { max-width: 100%; }
        `}</style>
        <Nav onCartOpen={() => setCartOpen(true)} />
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <ExitPopup />
        <NewsletterPopup />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<Product onCartOpen={() => setCartOpen(true)} />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            {/* Activiteitenpagina's — inhoud staat in src/data/activities.js.
                Eén component, vier routes. Nieuwe activiteit = blok in dat bestand. */}
            {activities.map(a => (
              <Route key={a.slug} path={`/${a.slug}`}
                element={<Activity onCartOpen={() => setCartOpen(true)} />} />
            ))}
            <Route path="/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/returns" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="*" element={<Home />} />
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

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import ProductsView from './components/ProductsView';
import IndustriesView from './components/IndustriesView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import { ActivePage } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [productSubRoute, setProductSubRoute] = useState<string | undefined>(undefined);
  const [serviceSubRoute, setServiceSubRoute] = useState<string | undefined>(undefined);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('madhyam_theme');
    if (stored) return stored === 'dark';
    return true; // Default to dark mode
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  // ─── Dark mode class sync ───
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('madhyam_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('madhyam_theme', 'light');
    }
  }, [darkMode]);

  // ─── Hash-based routing (supports products/vault or services/tab style sub-routes) ───
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages: ActivePage[] = ['home', 'services', 'products', 'industries', 'about', 'contact'];
      // Check for sub-routes like products/vault or services/work-anywhere
      if (hash.startsWith('products/')) {
        const sub = hash.split('/')[1];
        setActivePage('products');
        setProductSubRoute(sub);
        setServiceSubRoute(undefined);
        window.scrollTo({ top: 0 });
      } else if (hash.startsWith('services/')) {
        const sub = hash.split('/')[1];
        setActivePage('services');
        setServiceSubRoute(sub);
        setProductSubRoute(undefined);
        window.scrollTo({ top: 0 });
      } else if (validPages.includes(hash as ActivePage)) {
        setActivePage(hash as ActivePage);
        if (hash !== 'products') setProductSubRoute(undefined);
        if (hash !== 'services') setServiceSubRoute(undefined);
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ─── Scroll progress tracking ───
  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? Math.min(window.scrollY / totalHeight, 1) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Navigation handler (supports sub-routes like products/vault or services/work-anywhere) ───
  const changePageWithScroll = (page: ActivePage, subRoute?: string) => {
    setActivePage(page);
    if (page === 'products' && subRoute) {
      setProductSubRoute(subRoute);
      setServiceSubRoute(undefined);
      window.location.hash = `products/${subRoute}`;
    } else if (page === 'services' && subRoute) {
      setServiceSubRoute(subRoute);
      setProductSubRoute(undefined);
      window.location.hash = `services/${subRoute}`;
    } else {
      if (page !== 'products') setProductSubRoute(undefined);
      if (page !== 'services') setServiceSubRoute(undefined);
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Active view renderer ───
  const renderActiveView = () => {
    switch (activePage) {
      case 'home': return <HomeView setActivePage={changePageWithScroll} />;
      case 'services': return <ServicesView setActivePage={changePageWithScroll} initialSolution={serviceSubRoute} />;
      case 'products': return <ProductsView setActivePage={changePageWithScroll} initialProduct={productSubRoute} />;
      case 'industries': return <IndustriesView setActivePage={changePageWithScroll} />;
      case 'about': return <AboutView setActivePage={changePageWithScroll} />;
      case 'contact': return <ContactView />;
      default: return <HomeView setActivePage={changePageWithScroll} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#051c14] text-gray-800 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300">

      {/* ─── Scroll Progress Bar ─── */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left pointer-events-none"
        style={{
          transform: `scaleX(${scrollProgress})`,
          background: 'linear-gradient(90deg, #b5e245, #e29cc3)',
          opacity: scrollProgress > 0.01 ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* ─── Background Decoration ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-20 dark:opacity-30" />
        <div className="absolute top-[-20%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#b5e245] opacity-[0.025] dark:opacity-[0.015] blur-[200px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-[#e29cc3] opacity-[0.025] dark:opacity-[0.015] blur-[200px] animate-pulse-slow" />
      </div>

      {/* ─── Navigation ─── */}
      <Navbar
        activePage={activePage}
        setActivePage={changePageWithScroll}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* ─── Main Content ─── */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ─── Footer ─── */}
      <Footer setActivePage={changePageWithScroll} />
    </div>
  );
}

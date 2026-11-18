import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Sun, Moon, ChevronDown, ArrowRight,
  Globe, Shield, Eye, RefreshCw, Zap, TrendingUp,
  Lock, EyeOff, MapPin, Monitor, Brain,
  Factory, HeartPulse, GraduationCap, ShoppingBag, Landmark, HardHat, Scale, UtensilsCrossed,
  Building2, Users, Briefcase, Mail, Calculator, HelpCircle,
  Award, Handshake, Heart,
} from 'lucide-react';
import { ActivePage } from '../types';
import logoImg from './logo.png';

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage, subRoute?: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

interface MegaMenuItem {
  icon: any;
  title: string;
  description: string;
  page?: ActivePage;
  subRoute?: string;
}

interface MegaMenuConfig {
  heading: string;
  subheading: string;
  items: MegaMenuItem[];
  featured?: {
    heading: string;
    description: string;
    cta: string;
    page: ActivePage;
  };
  columns?: number;
}

interface NavItemDef {
  id: string;
  label: string;
  page?: ActivePage;
  hasMenu?: boolean;
}

/* ═══════════════════════════════════════════════════════════
   NAV CONFIGURATION
   ═══════════════════════════════════════════════════════════ */

const NAV_ITEMS: NavItemDef[] = [
  { id: 'home', label: 'Home', page: 'home' },
  { id: 'solutions', label: 'Business Solutions', page: 'services', hasMenu: true },
  { id: 'products', label: 'Products', page: 'products', hasMenu: true },
  { id: 'industries', label: 'Industries', page: 'industries', hasMenu: true },
  { id: 'about', label: 'About Us', page: 'about', hasMenu: true },
];

/* ═══════════════════════════════════════════════════════════
   MEGA MENU DATA
   ═══════════════════════════════════════════════════════════ */

const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  solutions: {
    heading: 'Business Solutions',
    subheading: 'Technology built around the way your business operates',
    items: [
      { icon: Globe, title: 'Work From Anywhere', description: 'Enable your team to securely access business applications from any device, anywhere.', page: 'services', subRoute: 'work-anywhere' },
      { icon: Shield, title: 'Stay In Complete Control', description: 'Complete visibility and control over who accesses what, when and from where.', page: 'services', subRoute: 'stay-in-control' },
      { icon: Lock, title: 'Protect Your Business', description: 'Multi-layered defense against data leaks, insider threats and cyber attacks.', page: 'services', subRoute: 'protect' },
      { icon: TrendingUp, title: 'Grow Without Limits', description: 'Add users, locations and applications without worrying about infrastructure.', page: 'services', subRoute: 'grow' },
      { icon: RefreshCw, title: 'Business Continuity', description: 'Automated backups and disaster recovery ensure your business never stops.', page: 'services', subRoute: 'continuity' },
      { icon: Brain, title: 'AI For Business', description: 'AI-powered productivity tools that work inside your secure workspace.', page: 'services', subRoute: 'ai' },
    ],
    featured: {
      heading: 'Not sure which solution fits?',
      description: 'Take our 2-minute assessment and get a personalized recommendation for your business.',
      cta: 'Find Your Solution',
      page: 'services',
    },
  },
  products: {
    heading: 'Products',
    subheading: 'The Madhyam ecosystem — enterprise products for every business need',
    items: [
      { icon: Lock, title: 'Madhyam Vault', description: 'Protect your most critical business data with military-grade encryption and granular access controls.', page: 'products', subRoute: 'vault' },
      { icon: EyeOff, title: 'Madhyam Stealth', description: 'Invisible infrastructure with zero digital footprint. Hackers cannot attack what they cannot find.', page: 'products', subRoute: 'stealth' },
      { icon: Monitor, title: 'Madhyam DeviceLESS Workspace', description: 'Access your secure business workspace from any device, anywhere. Leave nothing behind.', page: 'products', subRoute: 'deviceless' },
      { icon: MapPin, title: 'Madhyam GeoBind 2.0', description: 'AI-powered intelligent access verification based on identity, device, behavior, and location.', page: 'products', subRoute: 'geobind' },
      { icon: RefreshCw, title: 'Madhyam DRP', description: 'Instantly hide or restore business-critical information. Your data time machine.', page: 'products', subRoute: 'drp' },
      { icon: Brain, title: 'Madhyam AI Suite', description: 'Private AI assistants for every department. All intelligence stays inside your infrastructure.', page: 'products', subRoute: 'ai-suite' },
    ],
    featured: {
      heading: 'The Madhyam Ecosystem',
      description: 'Six products working together as a unified platform — or independently as standalone solutions.',
      cta: 'Explore All Products',
      page: 'products',
    },
  },
  industries: {
    heading: 'Industries',
    subheading: 'Tailored digital workspaces for every sector',
    columns: 4,
    items: [
      { icon: HeartPulse, title: 'Healthcare', description: 'Compliant workspaces protecting patient data.', page: 'industries' },
      { icon: Factory, title: 'Manufacturing', description: 'Secure ERP across production floors.', page: 'industries' },
      { icon: ShoppingBag, title: 'Retail', description: 'Centralized inventory and POS security.', page: 'industries' },
      { icon: GraduationCap, title: 'Education', description: 'Connected classrooms and secure admin.', page: 'industries' },
      { icon: Landmark, title: 'Finance', description: 'Bank-grade security for financial systems.', page: 'industries' },
      { icon: Scale, title: 'Legal', description: 'Confidential document management.', page: 'industries' },
      { icon: UtensilsCrossed, title: 'Hospitality', description: 'Multi-property centralized control.', page: 'industries' },
      { icon: HardHat, title: 'Construction', description: 'Field-to-office project connectivity.', page: 'industries' },
      { icon: Calculator, title: 'CA Firms', description: 'Multi-client isolation with Tally access.', page: 'industries' },
      { icon: Building2, title: 'SMEs', description: 'Cost-effective enterprise workspace.', page: 'industries' },
      { icon: Users, title: 'Enterprise', description: 'Dedicated infrastructure at scale.', page: 'industries' },
    ],
  },
  about: {
    heading: 'About Us',
    subheading: 'The people and philosophy behind Madhyam Connects',
    items: [
      { icon: Heart, title: 'About Madhyam', description: 'Our philosophy, process and what makes us different.', page: 'about' },
      { icon: Handshake, title: 'Partners & Certifications', description: 'Technology partnerships and compliance certifications.', page: 'about' },
      { icon: Briefcase, title: 'Careers', description: 'Join us in building secure digital workspaces.', page: 'about' },
      { icon: HelpCircle, title: 'FAQs', description: 'Searchable knowledge centre for all your questions.', page: 'about' },
      { icon: Calculator, title: 'Infrastructure Calculator', description: 'Find the right infrastructure for your business.', page: 'about' },
    ],
    featured: {
      heading: 'Get in Touch',
      description: 'Our team is ready to design the perfect digital workspace for your business.',
      cta: 'Schedule Consultation',
      page: 'contact',
    },
  },
};

function getActiveNav(activePage: ActivePage): string {
  switch (activePage) {
    case 'home': return 'home';
    case 'services': return 'solutions';
    case 'products': return 'products';
    case 'industries': return 'industries';
    case 'about': return 'about';
    case 'contact': return '';
    default: return 'home';
  }
}

/* ═══════════════════════════════════════════════════════════
   LOGO — SVG recreation of Madhyam Connects brand mark
   ═══════════════════════════════════════════════════════════ */

export function Logo({ className, showText = true, compact = false }: { className?: string; showText?: boolean; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className || ''}`}>
      <img
        src={logoImg}
        alt="Madhyam Connects Logo"
        className={`${compact ? 'h-8' : 'h-10 md:h-11'} w-auto`}
      />

      {/* Wordmark Typography */}
      {showText && (
        <span className={`font-display font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-300 ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`}>
          Madhyam
          <span className="font-light text-gray-400 dark:text-gray-500 ml-1.5 font-sans">Connects</span>
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MEGA MENU SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function MegaMenuCard({ item, navigate }: { item: MegaMenuItem; navigate: (page: ActivePage, subRoute?: string) => void }) {
  const Icon = item.icon;
  return (
    <div
      onClick={() => item.page && navigate(item.page, item.subRoute)}
      role={item.page ? 'button' : undefined}
      tabIndex={item.page ? 0 : undefined}
      className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${
        item.page ? 'hover:bg-gray-50 dark:hover:bg-[#0a3525]/40 cursor-pointer hover:shadow-sm hover:shadow-[#b5e245]/5' : 'cursor-default'
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#0a3525] flex items-center justify-center flex-shrink-0 group-hover:bg-[#b5e245]/10 dark:group-hover:bg-[#b5e245]/10 transition-colors duration-200">
        <Icon className="w-[18px] h-[18px] text-gray-400 dark:text-gray-500 group-hover:text-[#104f37] dark:group-hover:text-[#b5e245] transition-colors duration-200" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-display font-medium text-[13px] text-gray-900 dark:text-white group-hover:text-[#104f37] dark:group-hover:text-[#b5e245] transition-colors duration-200">
          {item.title}
        </h4>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
      {item.page && (
        <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-[#104f37] dark:group-hover:text-[#b5e245] group-hover:translate-x-0.5 transition-all duration-200 mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100" />
      )}
    </div>
  );
}

function FeaturedPanel({ featured, navigate }: { featured: NonNullable<MegaMenuConfig['featured']>; navigate: (page: ActivePage, subRoute?: string) => void }) {
  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-[#0a3525]/40 dark:to-[#051c14]/60 rounded-2xl p-6 flex flex-col justify-between border border-gray-100 dark:border-[#b5e245]/10">
      <div>
        <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white">{featured.heading}</h4>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-2.5 leading-relaxed">{featured.description}</p>
      </div>
      <button
        onClick={() => navigate(featured.page)}
        className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#104f37] dark:text-[#b5e245] hover:gap-2.5 transition-all duration-300 group"
      >
        <span>{featured.cta}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </button>
    </div>
  );
}

function MegaMenuContent({ config, navigate }: { config: MegaMenuConfig; navigate: (page: ActivePage, subRoute?: string) => void }) {
  const cols = config.columns || 2;
  return (
    <div className={`grid gap-8 ${config.featured ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
      <div className={config.featured ? 'lg:col-span-8' : 'col-span-1'}>
        <div className="mb-5">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">{config.heading}</h3>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1">{config.subheading}</p>
        </div>
        <div className={`grid gap-1 ${
          cols === 4 ? 'grid-cols-2 sm:grid-cols-4' :
          cols === 3 ? 'grid-cols-1 sm:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2'
        }`}>
          {config.items.map((item, i) => (
            <MegaMenuCard key={i} item={item} navigate={navigate} />
          ))}
        </div>
      </div>
      {config.featured && (
        <div className="lg:col-span-4">
          <FeaturedPanel featured={config.featured} navigate={navigate} />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Navbar({ activePage, setActivePage, darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega menu on scroll
  useEffect(() => {
    if (!activeMenu) return;
    const onScroll = () => setActiveMenu(null);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActiveMenu(null); setMobileOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setMobileSection(null);
  }, [activePage]);

  const navigate = useCallback((page: ActivePage, subRoute?: string) => {
    setActivePage(page, subRoute);
    setActiveMenu(null);
    setMobileOpen(false);
  }, [setActivePage]);

  const handleMenuEnter = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const activeNav = getActiveNav(activePage);

  return (
    <>
      {/* ─── HEADER BAR ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled || activeMenu
            ? 'bg-white/90 dark:bg-[#051c14]/90 backdrop-blur-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-none border-b border-gray-200/60 dark:border-[#b5e245]/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>

            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('home')}>
              <Logo compact={scrolled} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    if (closeTimeout.current) clearTimeout(closeTimeout.current);
                    setActiveMenu(item.hasMenu ? item.id : null);
                  }}
                  onMouseLeave={() => {
                    if (item.hasMenu) {
                      closeTimeout.current = setTimeout(() => setActiveMenu(null), 200);
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      if (item.page) navigate(item.page);
                      else if (item.hasMenu) setActiveMenu(activeMenu === item.id ? null : item.id);
                    }}
                    className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                      activeNav === item.id
                        ? 'text-[#104f37] dark:text-[#b5e245]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasMenu && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.id ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                </div>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-[#0a3525]/50 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
              <button
                onClick={() => navigate('contact')}
                className={`px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
                  activePage === 'contact'
                    ? 'text-[#104f37] dark:text-[#b5e245]'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => navigate('contact')}
                className="px-5 py-2 bg-gradient-to-r from-[#104f37] to-[#18714f] dark:from-[#b5e245] dark:to-[#cbf263] text-white dark:text-[#051c14] font-display font-semibold text-[13px] rounded-full hover:shadow-lg hover:shadow-[#104f37]/15 dark:hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px"
              >
                Get Consultation
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-gray-400 dark:text-gray-500" aria-label="Toggle theme">
                {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-lg text-gray-600 dark:text-gray-300" aria-label="Toggle menu">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ─── DESKTOP MEGA MENU PANEL ─── */}
        <AnimatePresence>
          {activeMenu && MEGA_MENUS[activeMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
              className="absolute left-0 right-0 top-full bg-white/[0.97] dark:bg-[#051c14]/[0.97] backdrop-blur-2xl border-b border-gray-100 dark:border-[#b5e245]/5 shadow-xl"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <MegaMenuContent config={MEGA_MENUS[activeMenu]} navigate={navigate} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── MEGA MENU OVERLAY ─── */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/[0.04] dark:bg-black/20"
            onClick={() => setActiveMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* ─── MOBILE MENU ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[45] bg-white dark:bg-[#051c14] overflow-y-auto no-scrollbar lg:hidden pt-20"
          >
            <div className="px-4 py-6 space-y-1">
              {/* Home */}
              <button
                onClick={() => navigate('home')}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl text-left text-[15px] font-medium transition-all ${
                  activePage === 'home'
                    ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/5'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#0a3525]/30'
                }`}
              >
                Home
              </button>

              {/* Accordion sections */}
              {NAV_ITEMS.filter(n => n.hasMenu).map(item => {
                const menu = MEGA_MENUS[item.id];
                if (!menu) return null;
                const isOpen = mobileSection === item.id;
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => setMobileSection(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-[15px] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#0a3525]/30 transition-all"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 py-2 space-y-0.5">
                            {menu.items.map((menuItem, i) => {
                              const Icon = menuItem.icon;
                              return (
                                <button
                                  key={i}
                                  onClick={() => menuItem.page && navigate(menuItem.page, menuItem.subRoute)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                                    menuItem.page
                                      ? 'text-gray-600 dark:text-gray-300 active:bg-gray-50 dark:active:bg-[#0a3525]/40'
                                      : 'text-gray-400 dark:text-gray-500'
                                  }`}
                                >
                                  <Icon className="w-4 h-4 flex-shrink-0" />
                                  <span className="text-sm">{menuItem.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-6 px-4 space-y-3">
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-3.5 bg-gradient-to-r from-[#104f37] to-[#18714f] dark:from-[#b5e245] dark:to-[#cbf263] text-white dark:text-[#051c14] font-display font-semibold text-sm rounded-xl transition-all hover:shadow-lg"
                >
                  Get Consultation
                </button>
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-3.5 bg-transparent border border-gray-200 dark:border-[#b5e245]/20 text-gray-700 dark:text-white font-display font-semibold text-sm rounded-xl transition-all"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

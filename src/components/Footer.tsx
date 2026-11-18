import { useState, FormEvent } from 'react';
import { Send, CheckCircle, Linkedin, Twitter, ArrowUp, Mail, MapPin } from 'lucide-react';
import { ActivePage } from '../types';
import { Logo } from './Navbar';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

/* ═══════════════════════════════════════════════════════════
   FOOTER LINK DATA
   ═══════════════════════════════════════════════════════════ */

const FOOTER_LINKS: Record<string, { label: string; page?: ActivePage }[]> = {
  Solutions: [
    { label: 'Work From Anywhere', page: 'services' },
    { label: 'Stay In Control', page: 'services' },
    { label: 'Protect Your Business', page: 'services' },
    { label: 'Grow Without Limits', page: 'services' },
    { label: 'Business Continuity', page: 'services' },
    { label: 'AI For Business', page: 'services' },
  ],
  Products: [
    { label: 'Madhyam Vault', page: 'products' },
    { label: 'Madhyam Stealth', page: 'products' },
    { label: 'Madhyam DRP', page: 'products' },
    { label: 'Madhyam Geo Binding', page: 'products' },
    { label: 'DeviceLESS Workspace', page: 'products' },
    { label: 'Madhyam AI Suite', page: 'products' },
  ],
  Industries: [
    { label: 'Healthcare', page: 'industries' },
    { label: 'Manufacturing', page: 'industries' },
    { label: 'Finance', page: 'industries' },
    { label: 'Education', page: 'industries' },
    { label: 'Retail', page: 'industries' },
    { label: 'Legal', page: 'industries' },
  ],
  Company: [
    { label: 'About Us', page: 'about' },
    { label: 'Partners', page: 'about' },
    { label: 'Careers', page: 'about' },
    { label: 'FAQs', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ],
};

/* ═══════════════════════════════════════════════════════════
   FOOTER COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Footer({ setActivePage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) setSubscribed(true);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative z-10 bg-gray-950 dark:bg-[#020d08] text-gray-400 pt-20 pb-8">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, #b5e245 35%, #e29cc3 65%, transparent 90%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Logo & Newsletter — spans 2 cols */}
          <div className="col-span-2 space-y-6">
            <div>
              <Logo className="mb-5" />
              <p className="text-sm leading-relaxed max-w-xs mb-4">
                Secure digital workspaces designed around the way your business operates.
              </p>
            </div>

            {/* Contact Details */}
            <div className="text-xs space-y-3 max-w-xs text-gray-500">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-3.5 h-3.5 text-[#b5e245] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  B16, no. 5, Bhagwan Das Nagar, East Punjabi Bagh, Punjabi Bagh, New Delhi, Delhi, 110026
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <Mail className="w-3.5 h-3.5 text-[#b5e245] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p>
                    <a href="mailto:team@madhyamconnects.com" className="hover:text-white transition-colors">
                      team@madhyamconnects.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {/* Newsletter */}
            {subscribed ? (
              <div className="flex items-center gap-2 text-[#b5e245] text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed successfully</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#b5e245]/30 transition-colors"
                />
                <button type="submit" className="px-3 py-2 bg-[#b5e245] text-[#051c14] rounded-lg hover:bg-[#cbf263] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <button
                      onClick={() => link.page && setActivePage(link.page)}
                      className={`text-[13px] hover:text-white transition-colors duration-200 text-left ${link.page ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-500">
            &copy; {new Date().getFullYear()} Madhyam Connects. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-[12px] text-gray-500 hover:text-white transition-colors">Privacy Policy</button>
            <button className="text-[12px] text-gray-500 hover:text-white transition-colors">Terms of Service</button>
            <div className="flex items-center gap-3 ml-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
            <button
              onClick={scrollToTop}
              className="ml-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

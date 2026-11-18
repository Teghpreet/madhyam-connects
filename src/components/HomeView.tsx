import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Users, Shield, Folder, Globe, Cloud, Activity,
  ArrowRight, ArrowUpRight, Check, X as XIcon,
  Eye, EyeOff, Zap, TrendingUp, Lock, RefreshCw,
  Database, Building2, MapPin, Clock, Monitor, Settings,
  Factory, HeartPulse, ShoppingBag, GraduationCap,
  Landmark, HardHat, Scale, UtensilsCrossed,
  Brain, Calendar, Code2, Handshake, Heart, Server,
  Headphones, Star, Quote, ChevronRight, ShieldCheck,
  CheckCircle2, Layers, Coins,
} from 'lucide-react';
import { ActivePage } from '../types';

/* ═══════════════════════════════════════════════════════════
   PROPS & TYPES
   ═══════════════════════════════════════════════════════════ */

interface HomeViewProps {
  setActivePage: (page: ActivePage, subRoute?: string) => void;
}

/* ═══════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════ */

const ease = [0.25, 0.1, 0.25, 1.0] as const;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerParent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

function AnimatedNumber({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 2200;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.floor(value * eased));
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════════════════════ */

const DASHBOARD_ITEMS = [
  { icon: Users, label: 'Active Users', value: '847', color: 'text-[#b5e245]' },
  { icon: Shield, label: 'Security Score', value: '98%', color: 'text-[#b5e245]' },
  { icon: Folder, label: 'Protected Files', value: '12.4K', color: 'text-[#e29cc3]' },
  { icon: Globe, label: 'Locations', value: '5 Cities', color: 'text-[#b5e245]' },
  { icon: Cloud, label: 'Backup Status', value: 'Current', color: 'text-[#b5e245]' },
  { icon: Activity, label: 'System Health', value: '99.99%', color: 'text-[#e29cc3]' },
];

function HeroDashboard() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0">
      {/* Main dashboard panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease }}
        className="bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-2xl shadow-black/[0.04] dark:shadow-black/20 p-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#b5e245] animate-pulse" />
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">Business Control Panel</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#b5e245]" />
          </div>
        </div>

        {/* Dashboard cards grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {DASHBOARD_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.4, ease }}
                className="bg-gray-50/80 dark:bg-[#051c14]/50 rounded-xl p-3.5 border border-gray-100/80 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-colors duration-300"
              >
                <Icon className={`w-4 h-4 ${item.color} mb-2`} />
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{item.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Activity bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-4 flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500"
        >
          <div className="flex -space-x-1.5">
            {[0, 1, 2, 3].map(j => (
              <div key={j} className="w-5 h-5 rounded-full border-2 border-white dark:border-[#0a3525] bg-gradient-to-br from-[#b5e245] to-[#e29cc3]" />
            ))}
          </div>
          <span>12 team members online now</span>
        </motion.div>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute -top-4 -right-2 md:-right-6"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-white dark:bg-[#0a3525] rounded-xl px-4 py-2.5 shadow-lg shadow-black/[0.06] dark:shadow-black/30 border border-gray-100 dark:border-[#b5e245]/10 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-[#b5e245]" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">All systems secure</span>
        </motion.div>
      </motion.div>

      {/* Floating policy card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute -bottom-3 -left-2 md:-left-8"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="bg-white dark:bg-[#0a3525] rounded-xl px-4 py-2.5 shadow-lg shadow-black/[0.06] dark:shadow-black/30 border border-gray-100 dark:border-[#b5e245]/10 flex items-center gap-2"
        >
          <Shield className="w-4 h-4 text-[#e29cc3]" />
          <span className="text-xs font-medium text-gray-700 dark:text-gray-200">8 policies active</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

function HeroSection({ navigate }: { navigate: (p: ActivePage) => void }) {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center pt-24 lg:pt-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-0 w-[50vw] h-[50vw] rounded-full bg-[#b5e245] opacity-[0.03] dark:opacity-[0.02] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-[#e29cc3] opacity-[0.03] dark:opacity-[0.015] blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245] animate-pulse" />
              <span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">India&apos;s First Private Cloud &middot; Since 2012</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-5xl md:text-6xl lg:text-[68px] font-display font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-white"
            >
              Your Business.
              <br />
              <span className="text-[#104f37] dark:text-[#b5e245]">Your Rules.</span>
              <br />
              Your Technology.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-7 text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              Madhyam Connects designs secure digital workspaces that are completely customized around
              the way your business operates. Your people work from anywhere while you remain in complete control.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="flex flex-wrap gap-3 mt-9"
            >
              <button
                onClick={() => navigate('contact')}
                className="px-7 py-3.5 bg-gradient-to-r from-[#104f37] to-[#18714f] dark:from-[#b5e245] dark:to-[#cbf263] text-white dark:text-[#051c14] font-display font-semibold text-sm rounded-full hover:shadow-xl hover:shadow-[#104f37]/15 dark:hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px flex items-center gap-2"
              >
                Get Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('services')}
                className="px-7 py-3.5 bg-gray-100 dark:bg-[#0a3525]/60 text-gray-700 dark:text-gray-200 font-display font-semibold text-sm rounded-full hover:bg-gray-200/80 dark:hover:bg-[#0a3525] border border-gray-200/80 dark:border-[#b5e245]/10 transition-all duration-300 hover:-translate-y-px"
              >
                Explore Solutions
              </button>
            </motion.div>
          </div>

          {/* Right — Dashboard */}
          <div className="hidden lg:block">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — TRUST
   ═══════════════════════════════════════════════════════════ */

const TRUST_STATS = [
  { value: 2012, label: 'Operating Since', prefix: '', suffix: '', display: 'Since 2012' },
  { value: 25000, label: 'Businesses Served', prefix: '', suffix: '+' },
  { value: 80000, label: 'Daily Users', prefix: '', suffix: '+' },
  { value: 17, label: 'Countries', prefix: '', suffix: '' },
];

function TrustSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#051c14]/50 dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main stat marquee */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {TRUST_STATS.map((stat, i) => (
            <motion.div key={i} variants={staggerChild} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white">
                {stat.display ? (
                  <span>{stat.display}</span>
                ) : (
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust badges */}
        <FadeUp delay={0.3} className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10">
          {[
            { icon: Shield, text: "India's First Private Cloud" },
            { icon: Headphones, text: '24×7 Expert Support' },
            { icon: Globe, text: 'Multi-Country Deployment' },
          ].map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                <Icon className="w-4 h-4 text-[#b5e245]" />
                <span>{badge.text}</span>
              </div>
            );
          })}
        </FadeUp>

        {/* Partnership Note */}
        <FadeUp delay={0.4} className="mt-8 text-center">
          <p className="text-[10px] md:text-[11px] tracking-wider uppercase text-gray-500 dark:text-gray-400 font-medium font-sans">
            Stats are verified, powered, and certified by <span className="text-[#104f37] dark:text-[#b5e245] font-semibold">Madhyam Connects</span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — PHILOSOPHY
   ═══════════════════════════════════════════════════════════ */

function PhilosophySection() {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[#b5e245] opacity-[0.02] blur-[200px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeUp>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-8">Our Philosophy</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-3xl md:text-5xl lg:text-[56px] font-display font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white">
            Technology shouldn&apos;t force your business to change.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-6 text-2xl md:text-3xl lg:text-4xl font-display font-medium text-gray-400 dark:text-gray-500 leading-tight">
            Your technology should work the way
            <br className="hidden md:block" />
            your business <span className="text-[#b5e245]">already works.</span>
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-10 text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Every business operates differently. That&apos;s why Madhyam Connects custom-builds
            secure digital infrastructure around each client&apos;s unique workflows, team structure
            and compliance requirements — never forcing them to adapt.
          </p>
        </FadeUp>

        {/* Industry visual — small icons showing different industries */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerParent}
          className="mt-16 flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {[
            { icon: Factory, label: 'Manufacturing' },
            { icon: HeartPulse, label: 'Healthcare' },
            { icon: Landmark, label: 'Finance' },
            { icon: GraduationCap, label: 'Education' },
            { icon: ShoppingBag, label: 'Retail' },
            { icon: Scale, label: 'Legal' },
          ].map((ind, i) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#0a3525]/30 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-colors duration-300"
              >
                <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                <span className="text-[11px] text-gray-500 dark:text-gray-400">{ind.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
        <FadeUp delay={0.4}>
          <p className="mt-6 text-xs text-gray-400 dark:text-gray-600 italic">
            Same platform — completely different deployments for each industry.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — WHAT WOULD YOU LIKE TO IMPROVE?
   ═══════════════════════════════════════════════════════════ */

const IMPROVE_CARDS = [
  { icon: Globe, title: 'Work From Anywhere', desc: 'Enable your team to securely access everything they need — from any device, any location.' },
  { icon: Shield, title: 'Protect My Business', desc: 'Multi-layered defence that stops threats before they reach your people or your data.' },
  { icon: Eye, title: 'Stay In Control', desc: 'Complete visibility over who accesses what, when and from where — in real time.' },
  { icon: Zap, title: 'Improve Productivity', desc: 'Remove IT bottlenecks so your team can focus on what actually matters.' },
  { icon: TrendingUp, title: 'Scale My Business', desc: 'Add users, locations and applications without worrying about infrastructure.' },
  { icon: Coins, title: 'Cut My Costs', desc: 'Consolidate multiple tools, eliminate server hardware maintenance, and slash software licensing fees. It’s a massive deal.' },
];

function ImproveSection({ navigate }: { navigate: (p: ActivePage) => void }) {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Tailored Solutions</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            What would you like to improve?
          </h2>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {IMPROVE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                onClick={() => navigate('services')}
                className="group cursor-pointer bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/30 dark:hover:border-[#b5e245]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#b5e245]/[0.04] dark:hover:shadow-[#b5e245]/[0.02] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#051c14]/60 flex items-center justify-center mb-5 group-hover:bg-[#b5e245]/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#b5e245] transition-colors duration-300" />
                </div>
                <h3 className="font-display font-semibold text-[15px] text-gray-900 dark:text-white mb-2 group-hover:text-[#104f37] dark:group-hover:text-[#b5e245] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {card.desc}
                </p>
                <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#b5e245] group-hover:translate-x-1 transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — STAY IN COMPLETE CONTROL
   ═══════════════════════════════════════════════════════════ */

const CONTROL_TABS = [
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'folders', label: 'Files', icon: Folder },
  { id: 'websites', label: 'Websites', icon: Globe },
  { id: 'geo', label: 'Location', icon: MapPin },
  { id: 'time', label: 'Time', icon: Clock },
  { id: 'devices', label: 'Devices', icon: Monitor },
  { id: 'apps', label: 'Apps', icon: Layers },
  { id: 'roles', label: 'Roles', icon: ShieldCheck },
];

interface ControlRow {
  name: string;
  detail: string;
  enabled: boolean;
}

const CONTROL_DATA: Record<string, { title: string; rows: ControlRow[] }> = {
  employees: {
    title: 'Employee Access Control',
    rows: [
      { name: 'Marketing Team', detail: 'Full workspace access', enabled: true },
      { name: 'Finance Team', detail: 'Restricted to finance apps', enabled: false },
      { name: 'Engineering', detail: 'Full workspace + dev tools', enabled: true },
      { name: 'HR Department', detail: 'HR systems only', enabled: false },
      { name: 'Sales Team', detail: 'CRM + email + docs', enabled: true },
    ],
  },
  folders: {
    title: 'File & Folder Permissions',
    rows: [
      { name: 'Financial Reports', detail: 'Finance team only', enabled: true },
      { name: 'Client Proposals', detail: 'Sales + Management', enabled: true },
      { name: 'HR Documents', detail: 'HR only — encrypted', enabled: false },
      { name: 'Design Assets', detail: 'Marketing team', enabled: true },
      { name: 'Board Minutes', detail: 'Directors only', enabled: false },
    ],
  },
  websites: {
    title: 'Website Access Rules',
    rows: [
      { name: 'Social Media', detail: 'Blocked for all except Marketing', enabled: false },
      { name: 'Cloud Storage', detail: 'Blocked — use Madhyam Vault', enabled: false },
      { name: 'Business Tools', detail: 'Allowed for all teams', enabled: true },
      { name: 'Streaming Sites', detail: 'Blocked during work hours', enabled: false },
      { name: 'Industry Portals', detail: 'Allowed for all teams', enabled: true },
    ],
  },
  geo: {
    title: 'Geographic Restrictions',
    rows: [
      { name: 'India', detail: 'All teams — full access', enabled: true },
      { name: 'United States', detail: 'Sales team only', enabled: true },
      { name: 'Europe', detail: 'Management only', enabled: false },
      { name: 'Southeast Asia', detail: 'Operations team', enabled: true },
      { name: 'All Other Regions', detail: 'Blocked by default', enabled: false },
    ],
  },
  time: {
    title: 'Time-Based Access',
    rows: [
      { name: 'Business Hours', detail: '9 AM – 7 PM IST', enabled: true },
      { name: 'After Hours', detail: 'Management only', enabled: false },
      { name: 'Weekends', detail: 'Emergency access only', enabled: false },
      { name: 'Holidays', detail: 'Blocked except critical', enabled: false },
      { name: 'Custom Windows', detail: 'Per-team schedules', enabled: true },
    ],
  },
  devices: {
    title: 'Device Control',
    rows: [
      { name: 'USB Drives', detail: 'Disabled across all machines', enabled: false },
      { name: 'Clipboard', detail: 'Copy disabled outside workspace', enabled: false },
      { name: 'Printing', detail: 'Allowed for managers only', enabled: false },
      { name: 'Screenshots', detail: 'Disabled for sensitive apps', enabled: false },
      { name: 'Downloads', detail: 'Approved folders only', enabled: true },
    ],
  },
  apps: {
    title: 'Application Permissions',
    rows: [
      { name: 'Tally / SAP', detail: 'Finance team only', enabled: true },
      { name: 'Adobe Suite', detail: 'Design + Marketing', enabled: true },
      { name: 'MS Office', detail: 'All teams', enabled: true },
      { name: 'Developer Tools', detail: 'Engineering only', enabled: false },
      { name: 'CRM Platform', detail: 'Sales + Management', enabled: true },
    ],
  },
  roles: {
    title: 'Role-Based Policies',
    rows: [
      { name: 'Owner / Director', detail: 'Unrestricted — full control', enabled: true },
      { name: 'Department Head', detail: 'Team management + reports', enabled: true },
      { name: 'Manager', detail: 'Team workspace + approvals', enabled: true },
      { name: 'Employee', detail: 'Assigned applications only', enabled: false },
      { name: 'Contractor', detail: 'Temporary limited access', enabled: false },
    ],
  },
};

function ControlSection() {
  const [activeTab, setActiveTab] = useState('employees');
  const [controlData, setControlData] = useState(CONTROL_DATA);
  const data = controlData[activeTab];

  const toggleRow = (index: number) => {
    setControlData(prev => {
      const currentCategory = prev[activeTab];
      const updatedRows = currentCategory.rows.map((row, i) => {
        if (i === index) {
          return { ...row, enabled: !row.enabled };
        }
        return row;
      });
      return {
        ...prev,
        [activeTab]: {
          ...currentCategory,
          rows: updatedRows
        }
      };
    });
  };

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-transparent dark:from-[#051c14]/80 dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Complete Visibility</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Stay in complete control.
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            You decide exactly who can access what, from where, and when.
            Your employees work freely. Your business stays protected.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-12 bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl shadow-black/[0.03] dark:shadow-none overflow-hidden">
            {/* Tabs */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-[#b5e245]/5">
              {CONTROL_TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 md:px-5 py-4 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                      isActive
                        ? 'border-[#b5e245] text-[#104f37] dark:text-[#b5e245]'
                        : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Panel content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 md:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-white">{data.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {data.rows.filter(r => r.enabled).length}/{data.rows.length} Active
                  </span>
                </div>
                <div className="space-y-2">
                  {data.rows.map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 md:p-3.5 rounded-xl bg-gray-50 dark:bg-[#051c14]/40 border border-gray-100/50 dark:border-[#b5e245]/[0.03]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                          row.enabled
                            ? 'bg-[#b5e245]/10 text-[#b5e245]'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                        }`}>
                          {row.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</p>
                          <p className="text-[11px] text-gray-400 dark:text-gray-500">{row.detail}</p>
                        </div>
                      </div>
                      <div
                        onClick={() => toggleRow(i)}
                        className={`w-9 h-5 rounded-full relative transition-colors duration-200 cursor-pointer flex-shrink-0 ${
                          row.enabled ? 'bg-[#b5e245]' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                          row.enabled ? 'left-[18px]' : 'left-0.5'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-8 text-center">
          <p className="text-[13px] text-gray-400 dark:text-gray-500 max-w-xl mx-auto">
            Every control is enforced at the infrastructure level through Madhyam&apos;s proprietary policy engine —
            no software installations, no endpoint agents, no workarounds.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 6 — PROTECTION THAT NEVER SLEEPS
   ═══════════════════════════════════════════════════════════ */

const PROTECTION_CARDS = [
  {
    icon: Database,
    title: 'Never Lose Data',
    desc: 'Automated multi-layer backups running continuously — your business data is always recoverable, always current.',
    accent: 'from-[#b5e245]/10 to-[#b5e245]/5',
  },
  {
    icon: RefreshCw,
    title: 'Recover Instantly',
    desc: 'If anything goes wrong, your entire workspace can be restored to any point in time — in minutes, not days.',
    accent: 'from-[#e29cc3]/10 to-[#e29cc3]/5',
  },
  {
    icon: Shield,
    title: 'Stop Threats Before They Arrive',
    desc: 'Intelligent monitoring identifies and neutralizes threats before they ever reach your people or your data.',
    accent: 'from-[#b5e245]/10 to-[#e29cc3]/5',
  },
  {
    icon: Building2,
    title: 'Business Continuity',
    desc: 'Even during outages, natural disasters or cyber incidents — your business keeps running without interruption.',
    accent: 'from-[#e29cc3]/10 to-[#b5e245]/5',
  },
];

function ProtectionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">Always On Guard</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Protection that never sleeps.
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Your business runs around the clock. So does our security. Multiple layers of
            protection work continuously to keep your operations safe and recoverable.
          </p>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {PROTECTION_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 md:p-8 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-[#104f37] dark:text-[#b5e245]" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">{card.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{card.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <FadeUp delay={0.3} className="mt-8 text-center">
          <p className="text-[13px] text-gray-400 dark:text-gray-500 max-w-xl mx-auto italic">
            Powered by geo-redundant infrastructure, real-time threat intelligence and automated
            recovery protocols across all deployment regions.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 7 — BUILT AROUND YOUR BUSINESS
   ═══════════════════════════════════════════════════════════ */

const INDUSTRIES = [
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory,
    apps: ['SAP', 'AutoCAD', 'Tally', 'ERP Suite'], policies: 'Shop floor restrictions active', security: 'USB ports disabled on production floor' },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse,
    apps: ['HMS', 'EMR', 'PACS', 'Pharmacy Mgmt'], policies: 'Patient data encryption enforced', security: 'Role-based access per department' },
  { id: 'retail', label: 'Retail', icon: ShoppingBag,
    apps: ['POS System', 'Inventory', 'Tally', 'E-Commerce'], policies: 'Multi-store access control', security: 'Geo-bound to store locations' },
  { id: 'education', label: 'Education', icon: GraduationCap,
    apps: ['LMS', 'Student Portal', 'Fee Mgmt', 'Library'], policies: 'Student vs staff access tiers', security: 'Content filtering active' },
  { id: 'finance', label: 'Finance', icon: Landmark,
    apps: ['Core Banking', 'Trading', 'Compliance', 'Audit'], policies: 'Regulatory compliance enforced', security: 'Zero-trust architecture' },
  { id: 'construction', label: 'Construction', icon: HardHat,
    apps: ['Project Mgmt', 'AutoCAD', 'Cost Estimation', 'Billing'], policies: 'Field-to-office access', security: 'Site-based geo restrictions' },
  { id: 'legal', label: 'Legal', icon: Scale,
    apps: ['Case Mgmt', 'Document Vault', 'Court Portal', 'Billing'], policies: 'Client confidentiality enforced', security: 'Full audit trail enabled' },
  { id: 'hospitality', label: 'Hospitality', icon: UtensilsCrossed,
    apps: ['PMS', 'Channel Mgr', 'POS', 'Reservation'], policies: 'Multi-property management', security: 'Guest vs staff network isolation' },
];

function IndustriesSection() {
  const [activeInd, setActiveInd] = useState(0);
  const ind = INDUSTRIES[activeInd];
  const Icon = ind.icon;

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:from-transparent dark:via-[#051c14]/50 dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Industry Expertise</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            One platform.
            <br />
            <span className="text-gray-400 dark:text-gray-500">Designed differently for every business.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Industry selector */}
            <div className="lg:col-span-4">
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible">
                {INDUSTRIES.map((item, i) => {
                  const IndIcon = item.icon;
                  const isActive = i === activeInd;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveInd(i)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                        isActive
                          ? 'bg-[#b5e245]/10 border border-[#b5e245]/20 text-[#104f37] dark:text-[#b5e245]'
                          : 'bg-transparent border border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a3525]/30'
                      }`}
                    >
                      <IndIcon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry dashboard preview */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeInd}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 p-6 md:p-8 shadow-lg shadow-black/[0.02] dark:shadow-none"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#b5e245]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#b5e245]" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white">{ind.label} Workspace</h3>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500">Customized deployment</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Applications */}
                    <div className="bg-gray-50 dark:bg-[#051c14]/40 rounded-xl p-4 border border-gray-100/60 dark:border-[#b5e245]/[0.03]">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Applications</p>
                      <div className="space-y-2">
                        {ind.apps.map((app, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-[#b5e245]" />
                            <span className="text-xs text-gray-600 dark:text-gray-300">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Policies */}
                    <div className="bg-gray-50 dark:bg-[#051c14]/40 rounded-xl p-4 border border-gray-100/60 dark:border-[#b5e245]/[0.03]">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Policies</p>
                      <div className="flex items-start gap-2">
                        <Shield className="w-3.5 h-3.5 text-[#e29cc3] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{ind.policies}</span>
                      </div>
                    </div>
                    {/* Security */}
                    <div className="bg-gray-50 dark:bg-[#051c14]/40 rounded-xl p-4 border border-gray-100/60 dark:border-[#b5e245]/[0.03]">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">Security</p>
                      <div className="flex items-start gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#b5e245] mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{ind.security}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 8 — OUR PRODUCTS
   ═══════════════════════════════════════════════════════════ */

const PRODUCTS = [
  { id: 'stealth', icon: EyeOff, name: 'Madhyam Stealth', tagline: 'Invisible security that never gets in the way',
    desc: 'Your team works freely while multi-layered protection runs silently in the background — no interruptions, no slowdowns.',
    gradient: 'from-[#b5e245]/10 to-[#b5e245]/5' },
  { id: 'vault', icon: Lock, name: 'Madhyam Vault', tagline: 'Your data, under your lock and key',
    desc: 'Encrypted, access-controlled storage that ensures your critical files are always protected and always available.',
    gradient: 'from-[#e29cc3]/10 to-[#e29cc3]/5' },
  { id: 'drp', icon: RefreshCw, name: 'Madhyam DRP', tagline: 'Because downtime is not an option',
    desc: 'Automated disaster recovery that brings your entire business back online — even if everything goes down.',
    gradient: 'from-[#b5e245]/10 to-[#e29cc3]/5' },
  { id: 'geo', icon: MapPin, name: 'Madhyam Geo Binding', tagline: 'Your business stays where you decide',
    desc: 'Control exactly which locations and regions your team can access systems from. No exceptions, no workarounds.',
    gradient: 'from-[#e29cc3]/10 to-[#b5e245]/5' },
  { id: 'deviceless', icon: Monitor, name: 'Madhyam DeviceLESS Workspace', tagline: 'Work from any device. Leave nothing behind.',
    desc: 'Access your complete workspace from any device — nothing is stored locally, nothing can be copied out.',
    gradient: 'from-[#b5e245]/10 to-[#b5e245]/5' },
  { id: 'ai', icon: Brain, name: 'Madhyam AI Suite', tagline: 'Intelligence that works for your business',
    desc: 'AI-powered monitoring, threat detection and automation that makes your workspace smarter every day.',
    gradient: 'from-[#e29cc3]/10 to-[#e29cc3]/5' },
];

function ProductsSection({ navigate }: { navigate: (page: ActivePage, subRoute?: string) => void }) {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Product Suite</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Our Products
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Each product solves a specific business challenge — working together
            as a unified platform or independently as standalone solutions.
          </p>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={i}
                variants={staggerChild}
                onClick={() => navigate('products', product.id)}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#b5e245]/[0.03] dark:hover:shadow-[#b5e245]/[0.02] hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-[#104f37] dark:text-[#b5e245]" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-1.5">{product.name}</h3>
                <p className="text-[13px] text-[#b5e245] font-medium mb-3">{product.tagline}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{product.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#104f37] dark:text-[#b5e245] group-hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 9 — WHY BUSINESSES TRUST MADHYAM
   ═══════════════════════════════════════════════════════════ */

const TIMELINE_ITEMS = [
  { icon: Calendar, title: 'Since 2012', desc: 'Over a decade of building secure digital workspaces for businesses across India and 17 countries.' },
  { icon: Code2, title: 'Expert Engineers', desc: 'Infrastructure engineers who understand business operations — not just technology.' },
  { icon: Settings, title: 'Customized Solutions', desc: 'Every deployment is designed from scratch around the specific needs of each business.' },
  { icon: Handshake, title: 'Long Term Partnership', desc: 'We don\'t deploy and disappear. We grow alongside your business year after year.' },
  { icon: Heart, title: 'Human Support', desc: 'Real engineers who know your setup — not chatbots reading from a script.' },
  { icon: Server, title: 'Enterprise Grade', desc: 'The same reliability and security that India\'s largest enterprises demand.' },
];

function TimelineSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-[#051c14]/50 dark:to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Our Commitment</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Why businesses trust Madhyam.
          </h2>
        </FadeUp>

        {/* Horizontal scrolling timeline */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
            {TIMELINE_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={i} delay={i * 0.08} className="flex-shrink-0 w-[280px] md:w-[300px] snap-start">
                  <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 h-full hover:border-[#b5e245]/20 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#b5e245]/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#b5e245]" />
                      </div>
                      {i === 0 && (
                        <span className="text-[10px] uppercase tracking-wider text-[#e29cc3] font-medium">Est. 2012</span>
                      )}
                    </div>
                    <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
          {/* Scroll hint */}
          <div className="mt-4 flex justify-center md:hidden">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
              <ChevronRight className="w-3 h-3" />
              <span>Swipe to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 10 — CLIENT TESTIMONIALS
   ═══════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    quote: 'Madhyam Connects transformed the way our 200-person team operates across 3 cities. We went from constant IT headaches to complete peace of mind — our team simply logs in and works.',
    name: 'Rajesh Mehta',
    role: 'Managing Director',
    company: 'Mehta Logistics Ltd.',
    industry: 'Manufacturing',
    placeholder: false,
  },
  {
    quote: 'The level of control we have over our data and employee access is unlike anything we have seen. Our compliance audits went from stressful to effortless.',
    name: 'Sanjay Shroff',
    role: 'Chief Executive Officer',
    company: 'Shroff Wealth Advisory',
    industry: 'Finance',
    placeholder: false,
  },
  {
    quote: 'We needed our 50 staff members to work securely from home, office and field locations. Madhyam made it happen in under two weeks — without a single disruption.',
    name: 'Dr. Ananya Reddy',
    role: 'Director of Operations',
    company: 'Reddy Medical Group',
    industry: 'Healthcare',
    placeholder: false,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">Client Stories</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white">
            Trusted by businesses across India.
          </h2>
        </FadeUp>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerParent}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 md:p-8 border border-gray-100 dark:border-[#b5e245]/5 relative"
            >
              {t.placeholder && (
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-[#e29cc3]/10 text-[#e29cc3] font-medium">
                  Placeholder
                </div>
              )}
              <Quote className="w-8 h-8 text-[#b5e245]/20 mb-5" />
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-[#b5e245]/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b5e245] to-[#e29cc3] flex items-center justify-center text-white text-xs font-bold uppercase">
                  {t.name[0] || '?'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 11 — FINAL CTA
   ═══════════════════════════════════════════════════════════ */

function CTASection({ navigate }: { navigate: (p: ActivePage) => void }) {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gray-950 dark:bg-[#020d08]" />
      {/* Gradient accents */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#b5e245] opacity-[0.03] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#e29cc3] opacity-[0.03] blur-[200px] pointer-events-none" />
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, #b5e245 35%, #e29cc3 65%, transparent 90%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1]">
            Let&apos;s build technology
            <br />
            around <span className="text-[#b5e245]">your business.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
            Every business is different. Tell us how yours works and we&apos;ll design
            a secure digital workspace that fits perfectly.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-xl hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px flex items-center gap-2"
            >
              Talk To An Expert
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('contact')}
              className="px-8 py-4 bg-white/5 backdrop-blur text-white font-display font-semibold text-sm rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-px"
            >
              Book Consultation
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN HOMEPAGE EXPORT
   ═══════════════════════════════════════════════════════════ */

export default function HomeView({ setActivePage }: HomeViewProps) {
  const navigate = (page: ActivePage, subRoute?: string) => setActivePage(page, subRoute);

  return (
    <div className="w-full overflow-hidden">
      <HeroSection navigate={navigate} />
      <TrustSection />
      <PhilosophySection />
      <ImproveSection navigate={navigate} />
      <ControlSection />
      <ProtectionSection />
      <IndustriesSection />
      <ProductsSection navigate={navigate} />
      <TimelineSection />
      <TestimonialsSection />
      <CTASection navigate={navigate} />
    </div>
  );
}

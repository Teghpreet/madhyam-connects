import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Check, ChevronDown, ChevronRight,
  Globe, Shield, Lock, TrendingUp, RefreshCw, Brain,
  Users, Folder, MapPin, Clock, Monitor, Layers, ShieldCheck,
  Eye, Activity, Building2, Database, Cloud, Server,
  Headphones, Settings, Zap, Heart,
  Factory, HeartPulse, ShoppingBag, GraduationCap,
  Landmark, HardHat, Scale, UtensilsCrossed,
  EyeOff, Mail, FileText, CheckCircle2,
} from 'lucide-react';
import { ActivePage } from '../types';
import { EncryptionSimulator, StealthSimulator, AISimulator } from './ProductsView';

/* ═══════════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════════ */

interface ServicesViewProps {
  setActivePage: (page: ActivePage, subRoute?: string) => void;
  initialSolution?: string;
}

type SolutionId = 'work-anywhere' | 'stay-in-control' | 'protect' | 'grow' | 'continuity' | 'ai';

interface Feature { icon: any; title: string; business: string; tech?: string; }
interface FAQ { q: string; a: string; }

const SOLUTION_NAV: { id: SolutionId; label: string; icon: any }[] = [
  { id: 'work-anywhere', label: 'Work From Anywhere', icon: Globe },
  { id: 'stay-in-control', label: 'Stay In Control', icon: Shield },
  { id: 'protect', label: 'Protect Your Business', icon: Lock },
  { id: 'grow', label: 'Grow Without Limits', icon: TrendingUp },
  { id: 'continuity', label: 'Business Continuity', icon: RefreshCw },
  { id: 'ai', label: 'AI For Business', icon: Brain },
];

const ALL_INDUSTRIES = [
  { icon: Factory, label: 'Manufacturing' }, { icon: HeartPulse, label: 'Healthcare' },
  { icon: ShoppingBag, label: 'Retail' }, { icon: GraduationCap, label: 'Education' },
  { icon: Landmark, label: 'Finance' }, { icon: HardHat, label: 'Construction' },
  { icon: Scale, label: 'Legal' }, { icon: UtensilsCrossed, label: 'Hospitality' },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ═══════════════════════════════════════════════════════════ */

const ease = [0.25, 0.1, 0.25, 1.0] as const;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

const staggerParent = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const staggerChild = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } };

/* ═══════════════════════════════════════════════════════════
   SHARED SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function SolutionHero({ badge, headline, highlight, description }: { badge: string; headline: string; highlight: string; description: string }) {
  return (
    <section className="relative pt-8 pb-20 md:pt-12 md:pb-28">
      <div className="absolute top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-[#b5e245] opacity-[0.02] blur-[180px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" />
          <span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">{badge}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl lg:text-[58px] font-display font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white">
          {headline} <span className="text-[#104f37] dark:text-[#b5e245]">{highlight}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function FeatureGrid({ features, columns = 3 }: { features: Feature[]; columns?: number }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={staggerParent}
          className={`grid grid-cols-1 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : columns === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} gap-4`}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} variants={staggerChild} className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#051c14]/60 flex items-center justify-center mb-4 group-hover:bg-[#b5e245]/10 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#b5e245] transition-colors duration-300" />
                </div>
                <h4 className="font-display font-semibold text-[15px] text-gray-900 dark:text-white mb-2">{f.title}</h4>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.business}</p>
                {f.tech && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3 pt-3 border-t border-gray-100 dark:border-[#b5e245]/5 italic">{f.tech}</p>}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionFAQ({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">FAQs</p>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
        </FadeUp>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="bg-white dark:bg-[#0a3525]/30 rounded-xl border border-gray-100 dark:border-[#b5e245]/5 overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesUsing({ industries }: { industries: { icon: any; label: string }[] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-3">Industries</p>
          <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Trusted across industries</h3>
        </FadeUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="flex flex-wrap justify-center gap-3">
          {industries.map((ind, i) => { const Icon = ind.icon; return (
            <motion.div key={i} variants={staggerChild} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#0a3525]/30 border border-gray-100 dark:border-[#b5e245]/5">
              <Icon className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500 dark:text-gray-400">{ind.label}</span>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}

function RelatedProducts({ products }: { products: { icon: any; name: string; desc: string }[] }) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-3">Powered By</p>
          <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Products behind this solution</h3>
        </FadeUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {products.map((p, i) => { const Icon = p.icon; return (
            <motion.div key={i} variants={staggerChild} className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-5 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:-translate-y-0.5">
              <Icon className="w-5 h-5 text-[#b5e245] mb-3" />
              <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-1">{p.name}</h4>
              <p className="text-[12px] text-gray-500 dark:text-gray-400">{p.desc}</p>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionCTA({ navigate }: { navigate: (p: ActivePage) => void }) {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950 dark:bg-[#020d08]" />
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] rounded-full bg-[#b5e245] opacity-[0.03] blur-[200px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, #b5e245 35%, #e29cc3 65%, transparent 90%)' }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeUp><h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.1]">Ready to transform<br /><span className="text-[#b5e245]">your business?</span></h2></FadeUp>
        <FadeUp delay={0.15}><p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">Every conversation starts with understanding your business.</p></FadeUp>
        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button onClick={() => navigate('contact')} className="px-8 py-4 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-xl hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px flex items-center gap-2">Book Consultation <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => navigate('contact')} className="px-8 py-4 bg-white/5 backdrop-blur text-white font-display font-semibold text-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-px">Talk To An Expert</button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function TechNote({ text }: { text: string }) {
  return (
    <FadeUp className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="text-center px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#0a3525]/20 border border-gray-100 dark:border-[#b5e245]/5">
        <p className="text-[12px] text-gray-400 dark:text-gray-500 italic leading-relaxed">{text}</p>
      </div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 1 — WORK FROM ANYWHERE
   ═══════════════════════════════════════════════════════════ */

function WorkAnywherePage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const features: Feature[] = [
    { icon: Monitor, title: 'Secure Remote Workspace', business: 'Your employees access their complete work environment from home, office or on the road — exactly as if they were at their desk.', tech: 'Powered by Madhyam DeviceLESS Workspace with end-to-end encryption.' },
    { icon: Database, title: 'Cloud ERP Access', business: 'Run Tally, SAP, or any ERP securely from anywhere without installing software on personal devices.', tech: 'Delivered via isolated application streaming with zero local footprint.' },
    { icon: Layers, title: 'Business Applications', business: 'Every tool your team needs — from Office to custom software — available instantly from any location.', tech: 'Centralized application management with automatic updates.' },
    { icon: Folder, title: 'Centralized Data', business: 'All business files live in one secure location. No data on laptops. No data on personal drives.', tech: 'Enterprise storage with Madhyam Vault encryption and access controls.' },
    { icon: Globe, title: 'Multi-device Access', business: 'Your team works from laptops, tablets or even personal devices — without compromising security.', tech: 'Device-agnostic access with Madhyam Stealth protection layer.' },
    { icon: Users, title: 'Team Collaboration', business: 'Teams across cities work together seamlessly — sharing files, applications and workflows in real time.', tech: 'High-performance connectivity with dedicated bandwidth allocation.' },
    { icon: Lock, title: 'Secure Authentication', business: 'Only authorized people can access your business. Multi-factor verification ensures nobody else gets in.', tech: 'Multi-factor authentication with geo-binding and device policies.' },
    { icon: RefreshCw, title: 'Business Continuity', business: 'Even during outages or emergencies, your team can continue working without any interruption.', tech: 'Geo-redundant infrastructure with automatic failover.' },
  ];
  const faqs: FAQ[] = [
    { q: 'Can my team access our ERP from home?', a: 'Yes. Your team can securely access Tally, SAP, or any business application from anywhere — using any device. The experience is identical to working from the office.' },
    { q: 'Is data safe when employees work remotely?', a: 'Absolutely. No business data is ever stored on personal devices. Everything stays centralized in your secure Madhyam workspace with full encryption.' },
    { q: 'Do employees need to install any software?', a: 'No. Employees access everything through a secure gateway. Nothing is installed locally, and nothing remains on the device after the session.' },
    { q: 'How fast is remote access?', a: 'Madhyam deploys dedicated infrastructure optimized for your region. Most businesses experience the same speed as working in the office.' },
    { q: 'Can I control what remote employees access?', a: 'Yes. You define exactly what each person can access — applications, files, websites, and even working hours. Every rule is enforced automatically.' },
  ];
  return (
    <div>
      <SolutionHero badge="Remote Work" headline="Your team works from anywhere." highlight="Your business stays secure." description="Madhyam Connects enables your people to securely access every business application from any device, any location — while you maintain complete control over data, access and security." />
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 border border-gray-100 dark:border-[#b5e245]/5">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">The Business Problem</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Your team needs to work from different locations — home, office, client sites. But business data cannot live on personal devices. Traditional solutions force you to choose between flexibility and security.</p>
          </div>
          <div className="bg-[#b5e245]/5 dark:bg-[#b5e245]/[0.03] rounded-2xl p-7 border border-[#b5e245]/15">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">The Madhyam Solution</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">We create a secure digital workspace where your team accesses everything they need from any device — while all data stays centralized under your control. No installations. No data on devices. Full productivity.</p>
          </div>
        </div>
      </FadeUp>
      <FadeUp className="text-center pb-8"><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Everything your team needs to work remotely</h2></FadeUp>
      <FeatureGrid features={features} />
      <TechNote text="Powered by Madhyam Connects' proprietary DeviceLESS architecture — your team's workspace is delivered securely through encrypted channels without any local data storage or software installation." />
      <IndustriesUsing industries={ALL_INDUSTRIES.slice(0, 6)} />

      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 2 — STAY IN COMPLETE CONTROL
   ═══════════════════════════════════════════════════════════ */

const CONTROL_CATEGORIES = [
  { id: 'access', label: 'Access', icon: Users },
  { id: 'data', label: 'Data', icon: Folder },
  { id: 'activity', label: 'Activity', icon: Eye },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'monitoring', label: 'Monitoring', icon: Activity },
];

interface ControlFeature { title: string; example: string; enabled: boolean; }

const CONTROL_DATA: Record<string, ControlFeature[]> = {
  access: [
    { title: 'User Management', example: 'Add or remove employees with one click. Each person sees only what they need.', enabled: true },
    { title: 'Department Permissions', example: 'Finance accesses finance tools. Marketing accesses marketing tools. No overlap.', enabled: true },
    { title: 'Role Based Access', example: 'Directors see everything. Managers see their team. Employees see their workspace.', enabled: false },
    { title: 'Application Restrictions', example: 'Assign only the applications each role needs — no unauthorized software.', enabled: true },
  ],
  data: [
    { title: 'Folder Permissions', example: 'Allow Finance to access financial reports while HR cannot — and vice versa.', enabled: true },
    { title: 'Clipboard Restrictions', example: 'Prevent sensitive business data from being copied outside the workspace.', enabled: false },
    { title: 'Printing Restrictions', example: 'Only managers can print confidential documents. Everyone else can view only.', enabled: false },
    { title: 'USB Restrictions', example: 'USB drives are completely disabled — no data can leave the organization.', enabled: false },
  ],
  activity: [
    { title: 'Website Restrictions', example: 'Block non-work websites during office hours. Allow approved sites only.', enabled: false },
    { title: 'Time Policies', example: 'Restrict system access outside business hours — 9 AM to 7 PM only.', enabled: true },
    { title: 'Working Hour Policies', example: 'Define custom schedules for different teams and time zones.', enabled: true },
    { title: 'Copy/Paste Restrictions', example: 'Prevent copying data between the workspace and personal applications.', enabled: false },
  ],
  location: [
    { title: 'Geo Restrictions', example: 'Allow access only from India. Block all other countries by default.', enabled: true },
    { title: 'Location Policies', example: 'Sales can work from client sites. Finance works only from office.', enabled: false },
    { title: 'Device Policies', example: 'Approve specific devices. Block everything else automatically.', enabled: true },
  ],
  monitoring: [
    { title: 'Activity Monitoring', example: 'See exactly who accessed what application and for how long — in real time.', enabled: true },
    { title: 'Audit Logs', example: 'Complete history of every action. Who opened which file, when and from where.', enabled: true },
    { title: 'Real-time Alerts', example: 'Get notified instantly when someone attempts unauthorized access.', enabled: true },
  ],
};

function StayInControlPage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const [activeCtrl, setActiveCtrl] = useState('access');
  const [controlData, setControlData] = useState(CONTROL_DATA);
  const data = controlData[activeCtrl] || [];

  const toggleRow = (index: number) => {
    setControlData(prev => {
      const currentCategory = prev[activeCtrl];
      const updated = currentCategory.map((row, i) => {
        if (i === index) {
          return { ...row, enabled: !row.enabled };
        }
        return row;
      });
      return {
        ...prev,
        [activeCtrl]: updated
      };
    });
  };

  const faqs: FAQ[] = [
    { q: 'Can I prevent employees from copying data out?', a: 'Yes. Clipboard, USB, printing and screenshot restrictions ensure no business data can leave the workspace — even by accident.' },
    { q: 'Can different departments have different rules?', a: 'Absolutely. Every department, team and individual can have unique permission sets, application access and security policies.' },
    { q: 'Can I restrict access by location?', a: 'Yes. Madhyam Geo Binding lets you define exactly which cities, offices or countries each team can work from.' },
    { q: 'Do employees know they are being monitored?', a: 'That is your choice. Activity monitoring runs at the infrastructure level. You decide your transparency policy.' },
    { q: 'How quickly can I change permissions?', a: 'Instantly. Changes take effect in real time across your entire organization — no waiting, no restarts.' },
  ];

  return (
    <div>
      <SolutionHero badge="Business Control" headline="Your business. Your rules." highlight="Complete control." description="You decide who can work, what they can access, where they can work from, when they can work, and what data they can touch. Every rule is enforced automatically — no exceptions." />

      {/* Business Story */}
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            As a business owner, you need absolute certainty that your data, applications and operations
            are protected — not just from external threats, but from internal misuse, accidental leaks and
            unauthorized access. Madhyam Connects puts you in complete control.
          </p>
        </div>
      </FadeUp>

      {/* Interactive Control Dashboard */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Every control at your fingertips</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Click each category to explore what you can control.</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl overflow-hidden">
              <div className="flex overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-[#b5e245]/5">
                {CONTROL_CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button key={cat.id} onClick={() => setActiveCtrl(cat.id)} className={`flex items-center gap-2 px-5 py-4 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${activeCtrl === cat.id ? 'border-[#b5e245] text-[#104f37] dark:text-[#b5e245]' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
                      <Icon className="w-4 h-4" /><span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={activeCtrl} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="p-5 md:p-6 space-y-2.5">
                  {data.map((row, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#051c14]/40 border border-gray-100/50 dark:border-[#b5e245]/[0.03] gap-4">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{row.title}</h4>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{row.example}</p>
                      </div>
                      <div
                        onClick={() => toggleRow(i)}
                        className={`w-9 h-5 rounded-full flex-shrink-0 relative cursor-pointer ${row.enabled ? 'bg-[#b5e245]' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${row.enabled ? 'left-[18px]' : 'left-0.5'}`} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeUp>
        </div>
      </section>

      <TechNote text="Every control is enforced at the infrastructure level through Madhyam Connects' enterprise policy engine — customized specifically for your organization's workflow. No endpoint agents. No workarounds." />
      <IndustriesUsing industries={ALL_INDUSTRIES} />

      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 3 — PROTECT YOUR BUSINESS
   ═══════════════════════════════════════════════════════════ */

function ProtectBusinessPage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const features: Feature[] = [
    { icon: Shield, title: 'Business Security', business: 'Your business is protected by multiple layers of security that work together — stopping threats before they reach your people or data.', tech: 'Multi-layer defense including network isolation, intrusion detection and behavioral analysis.' },
    { icon: Eye, title: 'Cyber Protection', business: 'Intelligent monitoring identifies unusual behavior and neutralizes threats automatically — day and night.', tech: 'Real-time SIEM integration with automated threat response protocols.' },
    { icon: Layers, title: 'Multi-layer Security', business: 'If one security layer is bypassed, the next one catches it. Your business is never exposed.', tech: 'Defense-in-depth architecture with independently operated security zones.' },
    { icon: Lock, title: 'Data Encryption', business: 'Every piece of business data is encrypted — at rest and in transit. Even if intercepted, it cannot be read.', tech: 'AES-256 encryption with zero-knowledge key management.' },
    { icon: Database, title: 'Automatic Backups', business: 'Your data is backed up continuously. You never need to worry about losing a single file.', tech: 'Multi-tier backup with local, remote and geo-redundant copies.' },
    { icon: RefreshCw, title: 'Disaster Recovery', business: 'If the worst happens, your entire business workspace can be restored in minutes — not days.', tech: 'Automated disaster recovery with Madhyam DRP cross-region replication.' },
    { icon: Building2, title: 'Business Continuity', business: 'Your operations continue during any disruption — power outages, natural disasters or cyber incidents.', tech: 'Geo-redundant infrastructure with automatic failover across regions.' },
    { icon: Activity, title: 'Threat Monitoring', business: 'Every access attempt, every login, every file operation is monitored. Suspicious activity triggers instant alerts.', tech: 'AI-powered behavioral analytics with real-time alerting engine.' },
    { icon: ShieldCheck, title: 'Compliance', business: 'Your workspace meets the security standards your industry demands — automatically.', tech: 'Pre-configured compliance templates for regulated industries.' },
    { icon: Lock, title: 'Secure Authentication', business: 'Multi-factor verification ensures only authorized people access your business systems.', tech: 'Adaptive MFA with device binding and biometric support.' },
    { icon: EyeOff, title: 'Zero Footprint Security', business: 'Your business systems are invisible to the internet. Attackers cannot target what they cannot find.', tech: 'Madhyam Stealth protocol eliminates public-facing attack surfaces.' },
    { icon: Zap, title: 'Incident Recovery', business: 'If a security incident occurs, your workspace is restored to its clean state — automatically.', tech: 'Automated rollback with point-in-time recovery and forensic logging.' },
  ];
  const faqs: FAQ[] = [
    { q: 'How does Madhyam protect against ransomware?', a: 'Multi-layer defense prevents ransomware from entering your workspace. Even if an attack occurs, automated backups allow instant restoration to a clean state.' },
    { q: 'What happens if our data center has an outage?', a: 'Your workspace automatically fails over to a secondary location. Your team continues working without interruption.' },
    { q: 'Is our data encrypted?', a: 'Yes. All business data is encrypted at rest and in transit using bank-grade encryption standards.' },
    { q: 'How often are backups taken?', a: 'Backups run continuously throughout the day. You can restore your workspace to any point in time.' },
    { q: 'Do we need to install antivirus software?', a: 'No. Security operates at the infrastructure level. Your team does not need to install, update or manage any security software.' },
  ];
  return (
    <div>
      <SolutionHero badge="Business Protection" headline="Your business is always" highlight="protected." description="Every business faces cyber threats, accidental data loss and operational risks. Madhyam Connects protects your business before problems occur — with multiple layers of defense working 24 hours a day." />
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 border border-gray-100 dark:border-[#b5e245]/5">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">The Business Problem</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Cyber attacks are increasing. Employees make mistakes. Hardware fails. Without proper protection, a single incident can shut down your entire business for days — or permanently.</p>
          </div>
          <div className="bg-[#b5e245]/5 dark:bg-[#b5e245]/[0.03] rounded-2xl p-7 border border-[#b5e245]/15">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">The Madhyam Solution</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">We build multiple layers of protection around your business — from invisible security that hides your systems from attackers to automated recovery that restores everything in minutes.</p>
          </div>
        </div>
      </FadeUp>
      <FadeUp className="text-center pb-8"><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Complete protection for every layer</h2></FadeUp>
      <FeatureGrid features={features} columns={3} />
      <TechNote text="Powered by Madhyam Stealth, Madhyam Vault and Madhyam DRP — an integrated security stack that operates at the infrastructure level without requiring any software on employee devices." />
      <EncryptionSimulator />
      <StealthSimulator />
      <IndustriesUsing industries={ALL_INDUSTRIES.slice(0, 6)} />

      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 4 — GROW WITHOUT LIMITS
   ═══════════════════════════════════════════════════════════ */

const TIERS = [
  { title: 'Shared Workspace', badge: 'Getting Started', icon: Monitor,
    bestFor: ['Individual professionals', 'CA firms', 'Small businesses', 'Businesses with 1–2 ERP users'],
    description: 'A fully managed workspace where one or a few users can securely access business applications without managing any infrastructure.',
    includes: ['Secure application access', 'Managed environment', 'Basic backup', 'Technical support'] },
  { title: 'Virtual Private Server', badge: 'Most Popular', icon: Server,
    bestFor: ['Growing businesses', 'Multiple employees', 'Department-based work', 'Remote teams'],
    description: 'A dedicated virtual business environment where every employee receives their own secure workspace while owners maintain complete control over permissions, storage, backups and access.',
    includes: ['Private resources', 'Individual user workspaces', 'Centralized storage', 'Role-based access', 'Business policies', 'Automated backups', 'Advanced security', 'Scalability'] },
  { title: 'Dedicated Infrastructure', badge: 'Enterprise', icon: Building2,
    bestFor: ['Large enterprises', 'High-security organizations', 'Large distributed teams', 'Mission-critical operations'],
    description: 'Complete dedicated infrastructure customized entirely for one organization — maximum performance, maximum security, maximum control.',
    includes: ['Exclusive hardware', 'Custom architecture', 'Dedicated engineering team', 'Unlimited customization', 'Enterprise compliance', 'Priority support', 'Multi-region deployment'] },
];

const CALC_STEPS = [
  { question: 'How many people need access?', key: 'users', options: ['1–5', '5–20', '20–50', '50+'] },
  { question: 'What kind of work does your team do?', key: 'workload', options: ['Light — Email & Office', 'Standard — ERP & Business Apps', 'Advanced — Design & CAD', 'Enterprise — Mission Critical'] },
  { question: 'What are your growth plans?', key: 'growth', options: ['Stable', 'Moderate Growth', 'Rapid Expansion'] },
  { question: 'How does your team work?', key: 'remote', options: ['Office only', 'Hybrid', 'Fully Remote'] },
  { question: 'How important is security compliance?', key: 'security', options: ['Standard', 'Industry Regulated', 'Government / Critical'] },
];

function InfraCalculator({ navigate }: { navigate: (p: ActivePage) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < CALC_STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Calculate recommendation
      let score = 0;
      if (updated.users === '5–20') score += 2; else if (updated.users === '20–50') score += 3; else if (updated.users === '50+') score += 5;
      if (updated.workload === 'Standard — ERP & Business Apps') score += 1; else if (updated.workload === 'Advanced — Design & CAD') score += 2; else if (updated.workload === 'Enterprise — Mission Critical') score += 4;
      if (updated.growth === 'Moderate Growth') score += 1; else if (updated.growth === 'Rapid Expansion') score += 3;
      if (updated.remote === 'Hybrid') score += 1; else if (updated.remote === 'Fully Remote') score += 2;
      if (updated.security === 'Industry Regulated') score += 1; else if (updated.security === 'Government / Critical') score += 3;
      setTimeout(() => setResult(score <= 4 ? 'Shared Workspace' : score <= 10 ? 'Virtual Private Server' : 'Dedicated Infrastructure'), 400);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };
  const currentStep = CALC_STEPS[step];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Infrastructure Calculator</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Find your ideal solution</h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Answer a few questions and we will recommend the right fit for your business.</p>
        </FadeUp>

        <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl p-6 md:p-8">
          {!result ? (
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                  {CALC_STEPS.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#b5e245]' : 'bg-gray-100 dark:bg-gray-800'}`} />
                  ))}
                </div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Step {step + 1} of {CALC_STEPS.length}</p>
                <h3 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-6">{currentStep.question}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.options.map((opt, i) => (
                    <button key={i} onClick={() => handleSelect(currentStep.key, opt)} className={`p-4 rounded-xl text-left text-sm font-medium border transition-all duration-200 ${answers[currentStep.key] === opt ? 'bg-[#b5e245]/10 border-[#b5e245]/30 text-[#104f37] dark:text-[#b5e245]' : 'bg-gray-50 dark:bg-[#051c14]/40 border-gray-100 dark:border-[#b5e245]/5 text-gray-700 dark:text-gray-300 hover:border-[#b5e245]/20'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
                {step > 0 && <button onClick={() => setStep(step - 1)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">← Previous step</button>}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
              <div className="text-center">
                <CheckCircle2 className="w-12 h-12 text-[#b5e245] mx-auto mb-4" />
                <p className="text-[11px] uppercase tracking-wider text-[#b5e245] mb-2">Recommended Solution</p>
                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">{result}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  Based on your requirements, we recommend the <strong className="text-gray-900 dark:text-white">{result}</strong> tier. Our team will customize this solution specifically for your business.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => navigate('contact')} className="px-6 py-3 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                    Book Consultation <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={reset} className="px-6 py-3 bg-gray-100 dark:bg-[#051c14]/60 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-[#b5e245]/10 hover:bg-gray-200 dark:hover:bg-[#0a3525] transition-all duration-300">
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function GrowPage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const faqs: FAQ[] = [
    { q: 'Which plan is right for my business?', a: 'Use our infrastructure calculator above, or speak to our team. We will recommend the right solution based on your team size, applications and growth plans.' },
    { q: 'Can I upgrade as my business grows?', a: 'Absolutely. You can start with a Shared Workspace and scale to a VPS or Dedicated Infrastructure as your team grows — without any downtime.' },
    { q: 'Is there a long-term contract?', a: 'We offer flexible billing cycles. Our goal is a long-term partnership — not a lock-in contract.' },
    { q: 'How quickly can we get started?', a: 'Most deployments are completed within 5–10 business days. Dedicated infrastructure may take longer depending on customization requirements.' },
  ];
  return (
    <div>
      <SolutionHero badge="Infrastructure" headline="Start small." highlight="Scale without limits." description="Whether you are a solo professional or an enterprise with hundreds of employees — Madhyam Connects has the right infrastructure for your stage. Start where you are. Grow without constraints." />

      {/* Tier Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => {
              const Icon = tier.icon;
              const isPopular = tier.badge === 'Most Popular';
              return (
                <motion.div key={i} variants={staggerChild} className={`relative bg-white dark:bg-[#0a3525]/30 rounded-2xl p-7 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isPopular ? 'border-[#b5e245]/30 shadow-lg' : 'border-gray-100 dark:border-[#b5e245]/5'}`}>
                  {isPopular && <div className="absolute -top-2.5 left-6 px-3 py-1 rounded-full bg-[#b5e245] text-[#051c14] text-[10px] font-bold uppercase tracking-wider">{tier.badge}</div>}
                  {!isPopular && <div className="absolute -top-2.5 left-6 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider">{tier.badge}</div>}
                  <div className="w-12 h-12 rounded-xl bg-[#b5e245]/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#b5e245]" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-3">{tier.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{tier.description}</p>
                  <div className="mb-5">
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Best for</p>
                    <ul className="space-y-1.5">
                      {tier.bestFor.map((b, j) => (
                        <li key={j} className="flex items-center gap-2 text-[13px] text-gray-600 dark:text-gray-300">
                          <Check className="w-3 h-3 text-[#b5e245] flex-shrink-0" />{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Includes</p>
                    <ul className="space-y-1">
                      {tier.includes.map((inc, j) => (
                        <li key={j} className="flex items-center gap-2 text-[12px] text-gray-500 dark:text-gray-400">
                          <CheckCircle2 className="w-3 h-3 text-[#b5e245]/60 flex-shrink-0" />{inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <InfraCalculator navigate={navigate} />
      <IndustriesUsing industries={ALL_INDUSTRIES} />
      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 5 — BUSINESS CONTINUITY
   ═══════════════════════════════════════════════════════════ */

function ContinuityPage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const features: Feature[] = [
    { icon: Database, title: 'Automatic Backups', business: 'Your business data is backed up continuously — every file, every application, every setting. You never need to think about it.', tech: 'Multi-tier backup with configurable schedules and retention policies.' },
    { icon: RefreshCw, title: 'Disaster Recovery', business: 'If the worst happens — hardware failure, ransomware, natural disaster — your entire business workspace is restored in minutes.', tech: 'Madhyam DRP with cross-region automated failover.' },
    { icon: Cloud, title: 'Cloud Replication', business: 'Your data exists in multiple locations simultaneously. If one location fails, another takes over instantly.', tech: 'Real-time synchronous replication across geo-redundant data centers.' },
    { icon: Clock, title: 'Version History', business: 'Accidentally deleted a file last Tuesday? Restore it from any point in the past — with one click.', tech: 'Point-in-time recovery with granular file-level restoration.' },
    { icon: CheckCircle2, title: 'Restore Points', business: 'Scheduled checkpoints ensure you can always roll back your entire workspace to a known good state.', tech: 'Automated snapshot management with configurable retention.' },
    { icon: FileText, title: 'Recovery Planning', business: 'We plan for every scenario — power outages, cyber attacks, natural disasters — so your business is always prepared.', tech: 'Documented RTO/RPO targets with tested recovery procedures.' },
    { icon: ShieldCheck, title: 'Backup Validation', business: 'Backups are automatically tested to ensure they actually work. No surprises when you need them most.', tech: 'Automated integrity verification with monthly recovery drills.' },
    { icon: Activity, title: 'Recovery Testing', business: 'We regularly test your disaster recovery process — so you know it works before you ever need it.', tech: 'Scheduled DR drills with documented results and improvement plans.' },
  ];
  const faqs: FAQ[] = [
    { q: 'How quickly can our business be restored?', a: 'Most workspaces are fully restored within 15–30 minutes. Critical applications can be recovered in under 5 minutes.' },
    { q: 'What if our entire data center goes down?', a: 'Your workspace automatically fails over to a secondary location in a different region. Your team continues working without interruption.' },
    { q: 'How far back can we restore data?', a: 'Our standard retention policy keeps backups for 30 days with hourly granularity. Extended retention is available for compliance requirements.' },
    { q: 'Are backups encrypted?', a: 'Yes. All backups are encrypted at rest and in transit using the same bank-grade encryption as your primary workspace.' },
  ];
  return (
    <div>
      <SolutionHero badge="Business Continuity" headline="Your business should" highlight="never stop." description="Hardware fails. Disasters happen. Attacks occur. But your business must keep running. Madhyam Connects ensures your operations continue — no matter what happens." />
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Every minute of downtime costs your business money, trust and productivity.
          Madhyam Connects builds multiple layers of protection and recovery — ensuring
          your operations continue without interruption.
        </p>
      </FadeUp>
      <FadeUp className="text-center pb-8"><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Your business, always protected</h2></FadeUp>
      <FeatureGrid features={features} columns={2} />
      <TechNote text="Powered by Madhyam DRP — our automated disaster recovery platform with cross-region replication, continuous backup validation and guaranteed recovery time objectives." />
      <IndustriesUsing industries={ALL_INDUSTRIES.slice(0, 6)} />

      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE 6 — AI FOR BUSINESS
   ═══════════════════════════════════════════════════════════ */

function AIPage({ navigate }: { navigate: (p: ActivePage) => void }) {
  const features: Feature[] = [
    { icon: Mail, title: 'AI Email', business: 'Draft professional emails in seconds. AI understands context, tone and your business communication style.', tech: 'Integrated AI email assistant within the Madhyam workspace.' },
    { icon: FileText, title: 'AI Content', business: 'Generate reports, proposals, documentation and presentations — faster than ever before.', tech: 'Business-trained language models with document template integration.' },
    { icon: TrendingUp, title: 'AI Marketing', business: 'Create marketing copy, social media content and campaign ideas that resonate with your audience.', tech: 'Multi-channel content generation with brand voice consistency.' },
    { icon: Scale, title: 'AI Legal', business: 'Review contracts, generate legal documents and ensure compliance — reducing time and cost.', tech: 'Document analysis engine with legal template library.' },
    { icon: Brain, title: 'AI Business Assistant', business: 'Ask questions about your business data. Get insights, summaries and recommendations instantly.', tech: 'Contextual AI assistant trained on your business knowledge base.' },
    { icon: Zap, title: 'AI Automation', business: 'Automate repetitive tasks — data entry, scheduling, approvals — so your team focuses on what matters.', tech: 'Workflow automation engine with customizable triggers and actions.' },
  ];
  const faqs: FAQ[] = [
    { q: 'Is our business data used to train AI models?', a: 'No. Your data stays within your Madhyam workspace. AI processes are isolated and your information is never shared or used for training.' },
    { q: 'Which AI models are used?', a: 'We integrate leading AI models while maintaining your data privacy. All AI processing happens within your secure workspace.' },
    { q: 'Do employees need training?', a: 'The AI assistant is designed to be intuitive. Most teams start using it productively within the first day.' },
    { q: 'Can AI be restricted for certain teams?', a: 'Yes. Like every other feature, AI access is controlled through your permission policies. You decide who can use which AI tools.' },
  ];
  return (
    <div>
      <SolutionHero badge="Artificial Intelligence" headline="AI that works" highlight="for your business." description="Madhyam AI Suite puts the power of artificial intelligence inside your secure workspace. Draft emails, generate content, automate tasks and get business insights — all while your data stays protected." />
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center">
        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          AI should make your team more productive — not more confused.
          Madhyam AI Suite is designed for business users who want practical results
          without complexity or data privacy concerns.
        </p>
      </FadeUp>
      <FadeUp className="text-center pb-8"><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">AI tools built for business</h2></FadeUp>
      <FeatureGrid features={features} columns={3} />
      <TechNote text="Every AI interaction happens within your secure Madhyam workspace. Your business data is never shared, never used for training, and never leaves your environment." />
      <AISimulator />
      <IndustriesUsing industries={ALL_INDUSTRIES.slice(0, 6)} />

      <SolutionFAQ faqs={faqs} />
      <SolutionCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SERVICES VIEW — Tab Navigation + Active Page
   ═══════════════════════════════════════════════════════════ */

export default function ServicesView({ setActivePage, initialSolution }: ServicesViewProps) {
  const [activeSolution, setActiveSolution] = useState<SolutionId>(
    (initialSolution as SolutionId) || 'work-anywhere'
  );
  const navigate = (page: ActivePage, subRoute?: string) => setActivePage(page, subRoute);

  // Sync active solution with initialSolution prop
  useEffect(() => {
    if (initialSolution) {
      setActiveSolution(initialSolution as SolutionId);
    }
  }, [initialSolution]);

  // Scroll to top when switching solutions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSolution]);

  const renderSolution = () => {
    switch (activeSolution) {
      case 'work-anywhere': return <WorkAnywherePage navigate={navigate} />;
      case 'stay-in-control': return <StayInControlPage navigate={navigate} />;
      case 'protect': return <ProtectBusinessPage navigate={navigate} />;
      case 'grow': return <GrowPage navigate={navigate} />;
      case 'continuity': return <ContinuityPage navigate={navigate} />;
      case 'ai': return <AIPage navigate={navigate} />;
    }
  };

  return (
    <div className="w-full relative flex flex-col lg:flex-row min-h-screen">
      {/* Solution Sub-Navigation — Sidebar on Desktop, Horizontal Swiper on Mobile */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-[#b5e245]/5 bg-white/85 dark:bg-[#051c14]/85 backdrop-blur-2xl p-2 lg:p-4 z-20 no-scrollbar">
        <div className="max-w-7xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 py-1 lg:py-0">
            {SOLUTION_NAV.map(sol => {
              const Icon = sol.icon;
              const isActive = activeSolution === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveSolution(sol.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium whitespace-nowrap rounded-xl transition-all duration-200 w-full text-left ${
                    isActive
                      ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/10 border border-[#b5e245]/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0a3525]/30 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sol.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderSolution()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

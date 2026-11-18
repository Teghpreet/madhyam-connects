import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Heart, Users, Shield, Folder, Globe, MapPin, Clock, Monitor, Layers, ShieldCheck,
  Lock, Eye, Search, Headphones, RefreshCw, Building2, Award,
  Settings, Server, CheckCircle2, ArrowRight, ChevronDown, Zap, Brain,
  TrendingUp, EyeOff, Mail, FileText, Briefcase, Calculator, HelpCircle,
  Activity, Factory, HeartPulse, ShoppingBag, GraduationCap, Landmark,
  HardHat, Scale, UtensilsCrossed, Check, Database, Star, Rocket, Code2,
} from 'lucide-react';
import { ActivePage } from '../types';

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

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);
  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════
   TYPES & SUB-PAGE NAV
   ═══════════════════════════════════════════════════════════ */

type AboutSubPage = 'about' | 'partners' | 'careers' | 'faq' | 'calculator';

interface AboutProps { setActivePage: (page: ActivePage) => void; }

const SUB_NAV: { id: AboutSubPage; label: string; icon: any }[] = [
  { id: 'about', label: 'About Madhyam', icon: Heart },
  { id: 'partners', label: 'Partners & Certifications', icon: Award },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
];

/* ═══════════════════════════════════════════════════════════
   FAQ DATA — 10 CATEGORIES, ~55 Q&As
   ═══════════════════════════════════════════════════════════ */

interface FAQ { q: string; a: string; }

const FAQ_CATEGORIES: { id: string; label: string; icon: any }[] = [
  { id: 'business', label: 'Business', icon: Building2 },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'products', label: 'Products', icon: Layers },
  { id: 'pricing', label: 'Pricing', icon: Calculator },
  { id: 'support', label: 'Support', icon: Headphones },
  { id: 'data', label: 'Data Protection', icon: Database },
  { id: 'remote', label: 'Remote Working', icon: Globe },
  { id: 'backups', label: 'Backups', icon: RefreshCw },
  { id: 'ai', label: 'AI', icon: Brain },
];

const FAQ_DATA: Record<string, FAQ[]> = {
  business: [
    { q: 'What does Madhyam Connects do?', a: 'We design secure digital workspaces customized around your business operations. Instead of selling fixed packages, we understand how your business works and build technology that fits your unique workflow, team structure and security requirements.' },
    { q: 'Who is Madhyam Connects for?', a: 'Business owners, CEOs, founders and directors who want complete control over their business technology — without managing it themselves. Our clients range from CA firms with 5 users to enterprises with hundreds of employees across multiple countries.' },
    { q: 'How is Madhyam different from other providers?', a: 'We don\'t sell fixed packages. We custom-build every workspace around your specific operations. Our team understands your business first, then designs technology that fits — not the other way around. We also provide dedicated engineering support, not generic helpdesks.' },
    { q: 'How long does deployment take?', a: 'Most deployments complete within 5–10 business days. Complex enterprise deployments with custom requirements may take 2–4 weeks depending on the level of customization and data migration involved.' },
    { q: 'Do you require long-term contracts?', a: 'We offer flexible billing cycles. Our goal is a long-term partnership built on value, not contractual lock-in. Most clients stay with us because of the quality of service, not because of a contract.' },
    { q: 'Can I see a demo before committing?', a: 'Absolutely. Book a consultation and our team will walk you through a complete demonstration tailored to your industry and business requirements. No commitment required.' },
  ],
  infrastructure: [
    { q: 'What infrastructure options are available?', a: 'Three tiers: Shared Workspace for small teams and individuals, Virtual Private Server for growing businesses with multiple employees, and Dedicated Infrastructure for large enterprises with custom requirements and maximum control.' },
    { q: 'How do I choose the right plan?', a: 'Use our infrastructure calculator or speak to our team. We recommend the right solution based on your team size, applications, security requirements and growth plans — never overselling.' },
    { q: 'Can I upgrade as my business grows?', a: 'Yes. You can seamlessly scale from Shared Workspace to VPS to Dedicated Infrastructure as your team grows — without downtime and without losing any data or configurations.' },
    { q: 'Where are your data centers?', a: 'We operate infrastructure across 17 countries with primary facilities in India. You can choose your preferred data center region based on your compliance requirements and user locations.' },
    { q: 'What is the uptime guarantee?', a: 'We maintain 99.99% uptime across all infrastructure tiers with automated failover, redundant systems and 24/7 monitoring. Dedicated infrastructure clients receive custom SLAs.' },
    { q: 'Do you manage the infrastructure?', a: 'Yes. Fully managed by our engineering team. Your team focuses on business while we handle all technical operations, updates, security patches and maintenance.' },
  ],
  security: [
    { q: 'How do you protect our data?', a: 'Multi-layer defense including encryption at rest and in transit, network isolation, behavioral monitoring, intrusion detection, Madhyam Stealth protection and automated threat response — all operating at the infrastructure level without requiring any software on user devices.' },
    { q: 'Is our data encrypted?', a: 'Yes. All business data is encrypted using AES-256 encryption — both at rest in storage and in transit between your devices and our infrastructure. Encryption keys are managed securely and never shared.' },
    { q: 'Do you protect against ransomware?', a: 'Multiple layers prevent ransomware from reaching your workspace. Even if an attack occurs, automated backups with Madhyam DRP ensure your entire business can be restored to a clean state within minutes.' },
    { q: 'Can employees access data on personal devices?', a: 'With Madhyam DeviceLESS Workspace, employees access everything through a secure session. No business data is ever stored on personal devices — not even temporarily.' },
    { q: 'Do you monitor for threats?', a: '24/7 threat monitoring with real-time alerting. Our systems detect unusual behavior, unauthorized access attempts and potential security incidents — and respond automatically.' },
    { q: 'What compliance standards do you meet?', a: 'We support industry-specific compliance requirements including data residency, audit logging, access controls and encryption standards. Our team works with you to meet your specific regulatory obligations.' },
  ],
  products: [
    { q: 'What is Madhyam Vault?', a: 'Encrypted, access-controlled business storage that protects your most critical data. Define who can access what, track every file interaction, and restore any version — all with bank-grade encryption.' },
    { q: 'What is Madhyam Stealth?', a: 'Invisible security that protects your business without interrupting your team\'s work. It operates at the infrastructure level with zero footprint on user devices — threats are blocked before users even know they exist.' },
    { q: 'What is Madhyam DRP?', a: 'Automated disaster recovery that brings your entire business back online in minutes — not days. Continuous replication ensures zero data loss, even in worst-case scenarios like ransomware or hardware failure.' },
    { q: 'What is Madhyam Geo Binding?', a: 'Location-based access enforcement. Define exactly which countries, cities or office locations your team can work from. Anyone attempting access from an unapproved location is automatically blocked.' },
    { q: 'What is DeviceLESS Workspace?', a: 'Access your full business workspace from any device — laptop, tablet, phone — without storing a single byte of data locally. When you disconnect, nothing remains on the device.' },
    { q: 'What is Madhyam AI Suite?', a: 'AI-powered productivity tools that work inside your secure workspace. Draft emails, generate reports, automate tasks and get business insights — all while your data stays completely private and protected.' },
  ],
  pricing: [
    { q: 'How is pricing structured?', a: 'Pricing is customized based on your team size, applications, storage needs and specific requirements. We believe in transparent, value-based pricing — never hidden fees or surprise costs.' },
    { q: 'Is there a free trial?', a: 'We offer guided demonstrations where our team walks you through the platform using scenarios specific to your business. This gives you a much better understanding than a generic trial.' },
    { q: 'Are there setup fees?', a: 'Setup, migration and initial configuration are included in our deployment process. We handle everything from data migration to user onboarding.' },
    { q: 'What payment methods do you accept?', a: 'We accept all standard business payment methods including bank transfers, UPI, and standard invoicing with flexible billing cycles.' },
    { q: 'Can I get a custom quote?', a: 'Yes. Every quote is tailored to your specific needs. Contact our team and we will provide a detailed proposal based on your requirements.' },
  ],
  support: [
    { q: 'What support is included?', a: '24/7 expert engineering support is included with every plan. Our support team consists of engineers — not call center agents — who understand your specific setup and can resolve issues quickly.' },
    { q: 'How do I reach support?', a: 'Phone, email and dedicated support portal. Priority clients receive direct engineer access with dedicated phone lines and instant messaging.' },
    { q: 'Do I get a dedicated engineer?', a: 'Yes. Every client gets engineers who know their specific setup, applications, policies and requirements. No repeating your situation to a new agent every time.' },
    { q: 'What is your response time?', a: 'Critical issues: under 15 minutes. Standard requests: under 2 hours. We maintain these targets around the clock, including weekends and holidays.' },
    { q: 'Do you provide onboarding?', a: 'Yes. Complete onboarding and training for your entire team. We ensure everyone is comfortable with the new workspace before we consider deployment complete.' },
  ],
  data: [
    { q: 'Where is my data stored?', a: 'In secure, geo-redundant data centers. You choose the region based on your compliance requirements. Data never leaves your chosen jurisdiction without your explicit approval.' },
    { q: 'Can I control who accesses my data?', a: 'Yes. Granular permissions down to individual files and folders. Define access by user, department, role, location and time — all enforced automatically at the infrastructure level.' },
    { q: 'Is data backed up automatically?', a: 'Yes. Continuous automated backups run throughout the day with point-in-time recovery. You can restore any file, folder or your entire workspace to any moment in the past.' },
    { q: 'Can I export my data?', a: 'Yes. Your data belongs to you. Full export available at any time in standard formats. We never hold your data hostage.' },
    { q: 'What happens to data when we leave?', a: 'Complete data export in your preferred format, followed by certified data destruction. We provide documentation confirming all your data has been securely removed from our systems.' },
  ],
  remote: [
    { q: 'Can my team work from home?', a: 'Yes. Secure access from any location using Madhyam DeviceLESS Workspace. The experience is identical to working from the office — same applications, same files, same speed.' },
    { q: 'Is remote access secure?', a: 'Yes. Encrypted connections with multi-factor authentication, device binding and geo-restrictions. All security policies are enforced regardless of where your team works from.' },
    { q: 'Do employees need VPN?', a: 'No. Our workspace provides secure access without traditional VPN complexity. Employees simply connect through a secure gateway — no software installation, no VPN configuration, no IT tickets.' },
    { q: 'Can I restrict remote locations?', a: 'Yes. Madhyam Geo Binding lets you define approved locations — countries, cities, specific office addresses. Any access attempt from an unapproved location is automatically blocked.' },
    { q: 'Does remote access affect performance?', a: 'No. Dedicated infrastructure with optimized connectivity ensures consistent performance. Most businesses report the same speed as working in the office.' },
  ],
  backups: [
    { q: 'How often are backups taken?', a: 'Continuously throughout the day. Our backup engine captures changes in near real-time, providing point-in-time recovery to any moment.' },
    { q: 'How quickly can data be restored?', a: 'Individual files: seconds. Complete workspace restoration: 15–30 minutes. Critical applications: under 5 minutes with Madhyam DRP.' },
    { q: 'Are backups stored off-site?', a: 'Yes. Geo-redundant backup storage across multiple regions. Even if an entire data center is lost, your backups remain safe in a different geographic location.' },
    { q: 'Can I restore individual files?', a: 'Yes. Granular file-level restoration from any backup point. No need to restore everything — just pick the specific file and the specific version you need.' },
    { q: 'Are backups tested?', a: 'Yes. Automated backup validation runs continuously to verify integrity. We also conduct regular recovery drills to ensure your disaster recovery process works when you need it.' },
  ],
  ai: [
    { q: 'Is my data used to train AI?', a: 'No. Your data stays completely private and is never used for training any AI models. All AI processing is isolated within your secure workspace.' },
    { q: 'Which AI features are available?', a: 'AI Email drafting, content generation, document analysis, legal review assistance, business intelligence, workflow automation and a conversational AI assistant that understands your business context.' },
    { q: 'Can I control who uses AI?', a: 'Yes. AI access is managed through your existing permission policies. You decide which teams and individuals can use which AI tools — just like any other application.' },
    { q: 'Is AI processing secure?', a: 'Yes. All AI processing happens within your secure Madhyam workspace. Your data never leaves your environment and is never shared with third-party AI providers.' },
    { q: 'Do I need training for AI tools?', a: 'The tools are designed to be intuitive. Most teams start using them productively within the first day. We also provide onboarding sessions focused on your specific use cases.' },
  ],
};

/* ═══════════════════════════════════════════════════════════
   SUB-PAGE: ABOUT MADHYAM (Main)
   ═══════════════════════════════════════════════════════════ */

function AboutMainPage({ navigate }: { navigate: (page: ActivePage) => void }) {
  const PHILOSOPHY_TRADITIONAL = ['Choose a fixed package', 'Adjust your business to fit', 'Live with the limitations'];
  const PHILOSOPHY_MADHYAM = ['Understand your business', 'Design custom architecture', 'Secure every layer', 'Deploy your workspace', 'Support continuously', 'Improve as you grow'];
  const HOW_WE_WORK = [
    { num: '01', icon: Search, title: 'Understand', desc: 'We study your operations, teams, applications and security needs before writing a single line of configuration.' },
    { num: '02', icon: Settings, title: 'Design', desc: 'Custom architecture designed specifically for your business — not a template applied to everyone.' },
    { num: '03', icon: Shield, title: 'Secure', desc: 'Multi-layer security, access controls, encryption and policies configured for your organization.' },
    { num: '04', icon: Rocket, title: 'Deploy', desc: 'Seamless migration and deployment with zero disruption to your ongoing business operations.' },
    { num: '05', icon: Headphones, title: 'Support', desc: 'Dedicated engineers who know your setup, available 24/7 for anything you need.' },
    { num: '06', icon: TrendingUp, title: 'Improve', desc: 'Continuous optimization as your business evolves — technology that grows with you.' },
  ];
  const CUSTOMIZATION = [
    { icon: Users, label: 'Permissions' }, { icon: Building2, label: 'Departments' },
    { icon: Layers, label: 'Applications' }, { icon: Shield, label: 'Security' },
    { icon: Globe, label: 'Remote Access' }, { icon: RefreshCw, label: 'Backups' },
    { icon: Lock, label: 'Data Protection' }, { icon: Settings, label: 'Business Rules' },
  ];
  const TRUST = [
    { value: 2012, label: 'Founded', prefix: 'Since ' }, { value: 25000, label: 'Users Secured', suffix: '+' },
    { value: 80000, label: 'Deployments', suffix: '+' }, { value: 17, label: 'Countries' },
  ];
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="absolute top-20 right-0 w-[40vw] h-[40vw] rounded-full bg-[#b5e245] opacity-[0.02] blur-[180px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" /><span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">Our Philosophy</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl lg:text-[58px] font-display font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white">
            Technology should fit your business.<br /><span className="text-[#104f37] dark:text-[#b5e245]">Not the other way around.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Every business is unique. Different teams, different workflows, different security needs. Madhyam Connects designs technology around the way you already operate.
          </motion.p>
        </div>
      </section>

      {/* Philosophy Comparison */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Our Approach</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Two fundamentally different approaches</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeUp delay={0.1}>
              <div className="bg-gray-50 dark:bg-[#0a3525]/20 rounded-2xl p-7 border border-gray-100 dark:border-[#b5e245]/5 h-full">
                <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-6">Traditional Approach</div>
                <div className="space-y-3">
                  {PHILOSOPHY_TRADITIONAL.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#051c14]/40 border border-gray-100 dark:border-[#b5e245]/5">
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400">{i + 1}</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-[#b5e245]/5 dark:bg-[#b5e245]/[0.03] rounded-2xl p-7 border border-[#b5e245]/15 h-full">
                <div className="text-xs font-medium uppercase tracking-wider text-[#b5e245] mb-6">Madhyam Approach</div>
                <div className="space-y-3">
                  {PHILOSOPHY_MADHYAM.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#051c14]/30 border border-[#b5e245]/10">
                      <div className="w-6 h-6 rounded-full bg-[#b5e245]/20 flex items-center justify-center text-[10px] font-bold text-[#104f37] dark:text-[#b5e245]">{i + 1}</div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">Process</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">How we work with every client</h2>
          </FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HOW_WE_WORK.map((step, i) => { const Icon = step.icon; return (
              <motion.div key={i} variants={staggerChild} className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:-translate-y-0.5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-bold text-[#b5e245] font-display">{step.num}</span>
                  <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-[#051c14]/60 flex items-center justify-center group-hover:bg-[#b5e245]/10 transition-colors"><Icon className="w-4 h-4 text-gray-400 group-hover:text-[#b5e245] transition-colors" /></div>
                </div>
                <h4 className="font-display font-semibold text-[15px] text-gray-900 dark:text-white mb-2">{step.title}</h4>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ); })}
          </motion.div>
        </div>
      </section>

      {/* Customization */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Built around <span className="text-[#104f37] dark:text-[#b5e245]">your business</span></h2></FadeUp>
          <FadeUp delay={0.1}><p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No two businesses work the same. We customize every aspect.</p></FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {CUSTOMIZATION.map((c, i) => { const Icon = c.icon; return (
              <motion.div key={i} variants={staggerChild} className="bg-white dark:bg-[#0a3525]/30 rounded-xl p-4 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300">
                <Icon className="w-5 h-5 text-[#b5e245] mx-auto mb-2" /><p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{c.label}</p>
              </motion.div>
            ); })}
          </motion.div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Trust & Scale</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Trusted by businesses across the world</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST.map((t, i) => (
              <FadeUp key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white">
                  {t.prefix && <span className="text-lg text-gray-400 font-normal">{t.prefix}</span>}
                  <AnimatedNumber value={t.value} suffix={t.suffix || ''} />
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{t.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp><h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white leading-[1.1]">Your business evolves.<br /><span className="text-[#104f37] dark:text-[#b5e245]">Your technology should evolve with it.</span></h2></FadeUp>
          <FadeUp delay={0.15}><p className="mt-6 text-base text-gray-500 dark:text-gray-400 leading-relaxed">We don't just deploy and disappear. Madhyam Connects is a long-term technology partner. As your team grows, your operations change and your industry evolves — your workspace evolves with you.</p></FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-950 dark:bg-[#020d08]" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, #b5e245 35%, #e29cc3 65%, transparent 90%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeUp><h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.1]">Let's build technology<br /><span className="text-[#b5e245]">around your business.</span></h2></FadeUp>
          <FadeUp delay={0.15}><p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">Every conversation starts with understanding your business.</p></FadeUp>
          <FadeUp delay={0.3}><div className="flex flex-wrap justify-center gap-3 mt-10">
            <button onClick={() => navigate('contact')} className="px-8 py-4 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-xl hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px flex items-center gap-2">Talk To An Expert <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => navigate('contact')} className="px-8 py-4 bg-white/5 backdrop-blur text-white font-display font-semibold text-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-px">Book Consultation</button>
          </div></FadeUp>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-PAGE: PARTNERS & CERTIFICATIONS
   ═══════════════════════════════════════════════════════════ */

function PartnersPage() {
  const certifications = [
    { name: 'SOC 2 Type II', desc: 'AICPA Security & Availability Standards' },
    { name: 'ISO/IEC 27001', desc: 'Information Security Management System' },
    { name: 'GDPR Compliant', desc: 'General Data Protection Regulation' },
    { name: 'HIPAA Compliant', desc: 'Healthcare Data Privacy & Security' },
    { name: 'PCI DSS Level 1', desc: 'Payment Card Industry Security Standards' },
    { name: 'ISO 9001:2015', desc: 'Quality Management System Standard' }
  ];

  const partners = [
    { icon: Server, name: 'Dell Technologies', desc: 'OEM Enterprise Server Hardware' },
    { icon: Layers, name: 'VMware ESXi', desc: 'Virtualization & Hypervisors' },
    { icon: Settings, name: 'Intel Xeon', desc: 'Processing & Compute Architectures' },
    { icon: Globe, name: 'Cisco Systems', desc: 'Enterprise Network & Firewalls' },
    { icon: Lock, name: 'Red Hat Enterprise', desc: 'Secure Enterprise OS Foundations' },
    { icon: RefreshCw, name: 'Veeam Software', desc: 'DRP Backup & Replication Engines' },
    { icon: Monitor, name: 'Microsoft Partner', desc: 'Enterprise Cloud Integrations' },
    { icon: Brain, name: 'NVIDIA Enterprise', desc: 'Private AI & Compute Infrastructure' }
  ];

  return (
    <div>
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" /><span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">Partnerships</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl font-display font-bold leading-[1.08] text-gray-900 dark:text-white">
            Enterprise-Grade <span className="text-[#104f37] dark:text-[#b5e245]">Partnerships & Standards</span>
          </motion.h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10"><h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Certifications & Compliance</h2></FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {certifications.map((c, i) => (
              <motion.div key={i} variants={staggerChild} className="bg-white dark:bg-[#0a3525]/20 rounded-2xl p-6 border border-gray-150 dark:border-[#b5e245]/10 flex flex-col justify-between min-h-[120px] hover:border-[#b5e245]/20 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <ShieldCheck className="w-6 h-6 text-[#b5e245]" />
                  <span className="text-[9px] font-bold text-[#b5e245] uppercase bg-[#b5e245]/10 px-2 py-0.5 rounded-full">Certified</span>
                </div>
                <div className="mt-4">
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">{c.name}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-normal">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10"><h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Technology Partners</h2></FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {partners.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} variants={staggerChild} className="bg-white dark:bg-[#0a3525]/20 rounded-2xl p-5 border border-gray-150 dark:border-[#b5e245]/10 flex flex-col justify-between min-h-[100px] hover:border-[#b5e245]/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div className="mt-3">
                    <h4 className="font-display font-bold text-[13px] text-gray-900 dark:text-white leading-tight">{p.name}</h4>
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-PAGE: CAREERS
   ═══════════════════════════════════════════════════════════ */

function CareersPage() {
  const BENEFITS = [
    { icon: Rocket, title: 'Innovation', desc: 'Work on cutting-edge enterprise technology that powers businesses across 17 countries.' },
    { icon: TrendingUp, title: 'Impact', desc: 'Your work directly impacts thousands of businesses and their operations every day.' },
    { icon: Star, title: 'Growth', desc: 'Clear career progression with mentorship, learning budgets and conference sponsorships.' },
    { icon: Heart, title: 'Culture', desc: 'A team that values quality, respects work-life balance and celebrates wins together.' },
  ];
  const POSITIONS = [
    { dept: 'Engineering', title: 'Senior Infrastructure Engineer', type: 'Full-time' },
    { dept: 'Sales', title: 'Enterprise Business Development', type: 'Full-time' },
    { dept: 'Support', title: 'Technical Support Engineer', type: 'Full-time' },
    { dept: 'Marketing', title: 'Content & Brand Strategist', type: 'Full-time' },
  ];

  const handlePositionClick = (title: string) => {
    window.location.href = `mailto:careers@madhyamconnects.com?subject=Application for ${encodeURIComponent(title)} - Madhyam Connects`;
  };

  return (
    <div>
      <section className="relative pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" /><span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">Careers</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl font-display font-bold leading-[1.08] text-gray-900 dark:text-white">
            Build the Future of <span className="text-[#104f37] dark:text-[#b5e245]">Business Technology</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Join a team that builds technology securing thousands of businesses across 17 countries.</motion.p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10"><h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Why Madhyam Connects?</h2></FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BENEFITS.map((b, i) => { const Icon = b.icon; return (
              <motion.div key={i} variants={staggerChild} className="bg-white dark:bg-[#0a3525]/30 rounded-2xl p-5 border border-gray-100 dark:border-[#b5e245]/5 text-center hover:border-[#b5e245]/20 transition-all duration-300">
                <Icon className="w-6 h-6 text-[#b5e245] mx-auto mb-3" /><h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white mb-1">{b.title}</h4>
                <p className="text-[12px] text-gray-500 dark:text-gray-400">{b.desc}</p>
              </motion.div>
            ); })}
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-10"><h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">Open Positions</h2></FadeUp>
          <div className="space-y-3">
            {POSITIONS.map((pos, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div
                  onClick={() => handlePositionClick(pos.title)}
                  className="cursor-pointer relative bg-white dark:bg-[#0a3525]/30 rounded-xl p-5 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#b5e245] transition-colors">{pos.title}</h4>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{pos.dept} · {pos.type}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#b5e245] group-hover:translate-x-0.5 transition-all" />
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3} className="text-center mt-10">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Don't see your role? We're always looking for talented people.</p>
            <a href="mailto:careers@madhyamconnects.com" className="inline-flex items-center gap-2 text-[#104f37] dark:text-[#b5e245] font-display font-semibold text-sm hover:gap-3 transition-all">Send us your resume <ArrowRight className="w-4 h-4" /></a>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-PAGE: FAQ (Searchable Knowledge Centre)
   ═══════════════════════════════════════════════════════════ */

function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('business');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = (FAQ_DATA[activeCategory] || []).filter(faq =>
    searchQuery === '' || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalResults = searchQuery
    ? Object.values(FAQ_DATA).flat().filter(faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())).length
    : 0;

  // Reset open accordion when category changes
  useEffect(() => { setOpenIndex(null); }, [activeCategory]);

  return (
    <div>
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" /><span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">Knowledge Centre</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl font-display font-bold leading-[1.08] text-gray-900 dark:text-white">
            Frequently Asked <span className="text-[#104f37] dark:text-[#b5e245]">Questions</span>
          </motion.h1>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease }} className="mt-8 relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all questions..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-[#0a3525]/40 border border-gray-200 dark:border-[#b5e245]/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#b5e245]/30 transition-colors"
            />
            {searchQuery && <p className="mt-2 text-[11px] text-gray-400">{totalResults} result{totalResults !== 1 ? 's' : ''} across all categories</p>}
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 mb-8 pb-1">
            {FAQ_CATEGORIES.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium whitespace-nowrap rounded-lg transition-all duration-200 ${activeCategory === cat.id ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#0a3525]/30'}`}>
                  <Icon className="w-3.5 h-3.5" />{cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ accordion */}
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className="space-y-2.5">
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-12"><p className="text-sm text-gray-400">No matching questions found.</p></div>
              ) : filteredFaqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-[#0a3525]/30 rounded-xl border border-gray-100 dark:border-[#b5e245]/5 overflow-hidden">
                  <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm font-medium text-gray-900 dark:text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB-PAGE: CALCULATOR
   ═══════════════════════════════════════════════════════════ */

const CALC_STEPS = [
  { question: 'How many people need access?', key: 'users', options: ['1–5', '5–20', '20–50', '50+'] },
  { question: 'What kind of work does your team do?', key: 'workload', options: ['Light — Email & Office', 'Standard — ERP & Business Apps', 'Advanced — Design & CAD', 'Enterprise — Mission Critical'] },
  { question: 'What are your growth plans?', key: 'growth', options: ['Stable', 'Moderate Growth', 'Rapid Expansion'] },
  { question: 'How does your team work?', key: 'remote', options: ['Office only', 'Hybrid', 'Fully Remote'] },
  { question: 'How important is security compliance?', key: 'security', options: ['Standard', 'Industry Regulated', 'Government / Critical'] },
];

function CalculatorPage({ navigate }: { navigate: (page: ActivePage) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < CALC_STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
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
    <div>
      <section className="relative pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" /><span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">Infrastructure Calculator</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl font-display font-bold leading-[1.08] text-gray-900 dark:text-white">
            Find Your Ideal <span className="text-[#104f37] dark:text-[#b5e245]">Infrastructure</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-4 text-base text-gray-500 dark:text-gray-400">Answer a few questions and get a personalized recommendation.</motion.p>
        </div>
      </section>
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl p-6 md:p-8">
            {!result ? (
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                  <div className="flex items-center gap-2 mb-6">{CALC_STEPS.map((_, i) => (<div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-[#b5e245]' : 'bg-gray-100 dark:bg-gray-800'}`} />))}</div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-2">Step {step + 1} of {CALC_STEPS.length}</p>
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
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
                <CheckCircle2 className="w-12 h-12 text-[#b5e245] mx-auto mb-4" />
                <p className="text-[11px] uppercase tracking-wider text-[#b5e245] mb-2">Recommended Solution</p>
                <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3">{result}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">Based on your requirements, we recommend the <strong className="text-gray-900 dark:text-white">{result}</strong> tier.</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button onClick={() => navigate('contact')} className="px-6 py-3 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-lg transition-all flex items-center gap-2">Book Consultation <ArrowRight className="w-4 h-4" /></button>
                  <button onClick={reset} className="px-6 py-3 bg-gray-100 dark:bg-[#051c14]/60 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-200 dark:border-[#b5e245]/10 hover:bg-gray-200 dark:hover:bg-[#0a3525] transition-all">Start Over</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN ABOUT VIEW — Tab Navigation + Sub-pages
   ═══════════════════════════════════════════════════════════ */

export default function AboutView({ setActivePage }: AboutProps) {
  const [activeSubPage, setActiveSubPage] = useState<AboutSubPage>('about');
  const navigate = (page: ActivePage) => setActivePage(page);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeSubPage]);

  const renderSubPage = () => {
    switch (activeSubPage) {
      case 'about': return <AboutMainPage navigate={navigate} />;
      case 'partners': return <PartnersPage />;
      case 'careers': return <CareersPage />;
      case 'faq': return <FAQPage />;
      case 'calculator': return <CalculatorPage navigate={navigate} />;
    }
  };

  return (
    <div className="w-full relative flex flex-col lg:flex-row min-h-screen">
      {/* Sub-Navigation — Sidebar on Desktop, Horizontal Swiper on Mobile */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-[#b5e245]/5 bg-white/85 dark:bg-[#051c14]/85 backdrop-blur-2xl p-2 lg:p-4 z-20 no-scrollbar">
        <div className="max-w-7xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 py-1 lg:py-0">
            {SUB_NAV.map(tab => {
              const Icon = tab.icon;
              const isActive = activeSubPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubPage(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium whitespace-nowrap rounded-xl transition-all duration-200 w-full text-left ${
                    isActive
                      ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/10 border border-[#b5e245]/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0a3525]/30 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
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
            key={activeSubPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderSubPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

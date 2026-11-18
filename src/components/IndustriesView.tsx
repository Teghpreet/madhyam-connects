import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Factory, HeartPulse, ShoppingBag, GraduationCap, Landmark, HardHat, Scale,
  UtensilsCrossed, Building2, Users, Calculator, Globe, Shield, Lock, TrendingUp,
  RefreshCw, Brain, Monitor, MapPin, EyeOff, Eye, Folder, Database, ArrowRight,
  Check, CheckCircle2, ChevronDown, Layers, Activity, Zap, Clock, Headphones,
  ShieldCheck, Server
} from 'lucide-react';
import { ActivePage } from '../types';

/* ─── Animation helpers ─────────────────────────────────────── */
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

/* ─── Types ──────────────────────────────────────────────────── */
type IndustrySlug =
  | 'overview' | 'healthcare' | 'manufacturing' | 'retail' | 'education'
  | 'finance' | 'legal' | 'hospitality' | 'construction' | 'ca-firms'
  | 'smes' | 'enterprise';

interface IndustryData {
  id: string;
  icon: any;
  name: string;
  heroHeadline: string;
  heroHighlight: string;
  heroDesc: string;
  overview: string;
  challenges: { icon: any; title: string; desc: string }[];
  solutions: { icon: any; title: string; desc: string; solutionId: string }[];
  products: { icon: any; name: string; desc: string }[];
  workflowDepts: string[];
  workflowApps: string[];
  workflowPolicies: string[];
  recommendedInfra: 'shared' | 'vps' | 'dedicated';
  faqs: { q: string; a: string }[];
}

/* ─── Industry data ──────────────────────────────────────────── */

const HEALTHCARE: IndustryData = {
  id: 'healthcare',
  icon: HeartPulse,
  name: 'Healthcare',
  heroHeadline: 'Secure Technology For',
  heroHighlight: 'Healthcare.',
  heroDesc: 'Protect patient data, empower clinical teams, and ensure compliance across every department — from the front desk to the operating room.',
  overview: 'Healthcare providers face unique technology challenges. Patient privacy regulations demand stringent data security, while clinical teams need seamless access to critical systems around the clock. Multi-department workflows — from pharmacy to lab to billing — require granular access control without compromising speed of care.\n\nMadhyam provides purpose-built infrastructure designed for healthcare organisations. Our solutions ensure HIPAA-grade data isolation, role-based access for every department, and continuous backup for zero-downtime operations — all managed through a single, intuitive control panel.',
  challenges: [
    { icon: Lock, title: 'Patient Data Security', desc: 'Safeguarding sensitive patient records and diagnostic data from breaches and unauthorized access across every endpoint.' },
    { icon: Users, title: 'Multi-Department Access', desc: 'Enabling doctors, nurses, pharmacy, and admin to access the right systems without compromising data isolation between departments.' },
    { icon: ShieldCheck, title: 'Regulatory Compliance', desc: 'Meeting stringent healthcare regulations and audit requirements for data handling, storage, and transmission.' },
    { icon: Monitor, title: 'Remote Diagnostics Access', desc: 'Providing secure remote access for telemedicine consultations and off-site diagnostic review without exposing clinical systems.' },
  ],
  solutions: [
    { icon: Shield, title: 'Protect Your Business', desc: 'End-to-end encryption and multi-layer security for all patient data, from EMR to diagnostic imaging systems.', solutionId: 'protect' },
    { icon: Eye, title: 'Stay In Control', desc: 'Granular role-based access control that lets administrators define exactly who sees what, across every department.', solutionId: 'control' },
    { icon: RefreshCw, title: 'Business Continuity', desc: 'Automated hourly backups with instant failover ensure your critical systems never go offline, even during emergencies.', solutionId: 'continuity' },
  ],
  products: [
    { icon: Lock, name: 'Vault', desc: 'Encrypted, isolated storage for patient records, diagnostics, and billing data with granular access controls.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible endpoint protection that secures clinical workstations without disrupting healthcare workflows.' },
    { icon: RefreshCw, name: 'DRP', desc: 'Disaster recovery planning with automated backups and instant failover for mission-critical healthcare systems.' },
  ],
  workflowDepts: ['Administration', 'Doctors', 'Nurses', 'Pharmacy', 'Lab', 'Billing'],
  workflowApps: ['HMS', 'EMR', 'PACS', 'Pharmacy Mgmt', 'Lab System', 'Billing'],
  workflowPolicies: ['Patient Data Isolation', 'Role-Based Access', 'Audit Logging', 'Backup Every Hour'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'How does Madhyam ensure patient data remains confidential?', a: 'Every patient record is stored in an isolated, encrypted environment with role-based access control. Only authorized personnel can access specific datasets, and every access event is logged for audit compliance.' },
    { q: 'Can doctors access systems remotely for telemedicine?', a: 'Yes. Our DeviceLESS technology lets clinicians securely access EMR, PACS, and diagnostic tools from any device, anywhere — without installing software or exposing the hospital network.' },
    { q: 'What happens if a server goes down during critical operations?', a: 'Our DRP solution provides automated hourly backups with instant failover. If a primary server fails, operations continue seamlessly on the backup with zero data loss.' },
    { q: 'Is your infrastructure compliant with healthcare regulations?', a: 'Our infrastructure is designed for healthcare compliance from the ground up, including data isolation, encryption at rest and in transit, audit logging, and access controls that map to regulatory requirements.' },
    { q: 'How quickly can we onboard our hospital staff?', a: 'Most healthcare deployments are fully operational within 48 hours. We handle migration, access setup, and policy configuration — your clinical teams just log in and start working.' },
  ],
};

const MANUFACTURING: IndustryData = {
  id: 'manufacturing',
  icon: Factory,
  name: 'Manufacturing',
  heroHeadline: 'Connected Operations For',
  heroHighlight: 'Manufacturing.',
  heroDesc: 'Bridge the gap between shop floor and corner office with secure, centralized access to every system your manufacturing operation depends on.',
  overview: 'Modern manufacturing runs on interconnected systems — ERP platforms, design software, supply chain management, and quality control tools that must work together seamlessly. Yet most manufacturers struggle with fragmented IT, insecure remote access, and siloed data across multiple facilities.\n\nMadhyam unifies your manufacturing technology stack under one secure, centralized platform. From production planning to dispatch, every department accesses the tools they need with the security policies your operations demand — including USB restrictions, geo-locking, and ERP access control.',
  challenges: [
    { icon: Layers, title: 'Shop Floor to Office Access', desc: 'Bridging the technology gap between production teams on the shop floor and management in the back office.' },
    { icon: Lock, title: 'ERP Security', desc: 'Protecting your critical ERP and financial data from unauthorized access, data leaks, and insider threats.' },
    { icon: Shield, title: 'Supply Chain Data Protection', desc: 'Securing sensitive supplier contracts, pricing data, and logistics information across the entire supply chain.' },
    { icon: Globe, title: 'Multi-Site Operations', desc: 'Managing technology infrastructure consistently across multiple factories, warehouses, and regional offices.' },
  ],
  solutions: [
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Enable engineers and managers to securely access CAD, ERP, and production systems from any device, any location.', solutionId: 'remote' },
    { icon: Eye, title: 'Stay In Control', desc: 'Enforce granular access policies across departments — restrict USB, control screen sharing, and audit every action.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Multi-layer security for your intellectual property, production data, and financial systems.', solutionId: 'protect' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Access CAD, ERP, and production tools from any device without installing software or risking data on local machines.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible endpoint protection that enforces security policies across shop floor terminals and office workstations.' },
    { icon: Lock, name: 'Vault', desc: 'Encrypted storage for blueprints, production data, and financial records with strict access controls.' },
  ],
  workflowDepts: ['Production', 'Quality', 'Purchase', 'Finance', 'HR', 'Logistics'],
  workflowApps: ['SAP/ERP', 'AutoCAD', 'Tally', 'Inventory', 'Quality Control', 'Dispatch'],
  workflowPolicies: ['Shop Floor Restrictions', 'ERP Access Control', 'USB Disabled', 'Geo-Locked'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'Can shop floor workers access the ERP system securely?', a: 'Yes. With DeviceLESS, shop floor terminals can access the ERP through a secure, browser-based environment. No data is stored locally, and USB ports can be disabled to prevent data theft.' },
    { q: 'How do you handle multi-site manufacturing operations?', a: 'Our platform provides centralized management across all your facilities. Each site can have its own policies and access controls while being managed from a single dashboard.' },
    { q: 'Is AutoCAD and design software compatible?', a: 'Absolutely. Our VPS infrastructure is optimized for resource-intensive applications like AutoCAD, SolidWorks, and other design tools, delivered securely to any device.' },
    { q: 'Can we restrict access by shift or time?', a: 'Yes. Our policy engine supports time-based access controls, so you can restrict system access to specific shifts, working hours, or maintenance windows.' },
    { q: 'What about securing data from contract workers?', a: 'Contract workers receive isolated, time-limited access with full audit logging. When their contract ends, access is instantly revoked with no data leaving your infrastructure.' },
  ],
};

const RETAIL: IndustryData = {
  id: 'retail',
  icon: ShoppingBag,
  name: 'Retail',
  heroHeadline: 'Centralized Control For',
  heroHighlight: 'Retail.',
  heroDesc: 'Manage every store, every terminal, and every team member from one secure platform — whether you operate two outlets or two hundred.',
  overview: 'Retail businesses face a unique set of technology challenges: high employee turnover, distributed POS terminals across multiple locations, inventory that must be tracked in real time, and customer data that must be protected at every touchpoint. Traditional IT approaches simply cannot keep up.\n\nMadhyam gives retail businesses enterprise-grade centralized management without enterprise complexity. Every store, every terminal, and every employee is managed from a single control panel — with automatic security policies, instant onboarding, and real-time visibility across your entire retail operation.',
  challenges: [
    { icon: Lock, title: 'POS Security Across Stores', desc: 'Protecting point-of-sale data and customer payment information across dozens or hundreds of retail locations.' },
    { icon: Layers, title: 'Multi-Store Management', desc: 'Maintaining consistent technology policies, updates, and security across a growing number of retail outlets.' },
    { icon: Database, title: 'Inventory Access Control', desc: 'Ensuring only authorized personnel can access and modify inventory data while maintaining real-time accuracy.' },
    { icon: Users, title: 'High Employee Turnover', desc: 'Rapidly onboarding and offboarding retail staff without compromising system security or operational continuity.' },
  ],
  solutions: [
    { icon: Eye, title: 'Stay In Control', desc: 'Centralized management for every store terminal, employee account, and security policy — from one dashboard.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'End-to-end encryption for POS data, customer information, and financial transactions across all locations.', solutionId: 'protect' },
    { icon: TrendingUp, title: 'Grow Without Limits', desc: 'Add new stores, terminals, and staff in minutes — our platform scales with your retail expansion.', solutionId: 'scale' },
  ],
  products: [
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible security that protects POS terminals and back-office systems without disrupting store operations.' },
    { icon: MapPin, name: 'Geo Binding', desc: 'Lock POS and inventory systems to specific store locations, preventing unauthorized access from outside the premises.' },
    { icon: Lock, name: 'Vault', desc: 'Encrypted storage for customer data, transaction records, and financial information with compliance-ready audit trails.' },
  ],
  workflowDepts: ['Store Ops', 'Inventory', 'Finance', 'Marketing', 'HR', 'E-Commerce'],
  workflowApps: ['POS', 'Inventory Mgmt', 'Tally', 'E-Commerce', 'CRM', 'Loyalty'],
  workflowPolicies: ['Store-Level Isolation', 'POS Data Encryption', 'Employee Rotation', 'Centralized Reporting'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'How quickly can we add a new store to the platform?', a: 'A new store can be fully configured and operational within hours. We pre-configure POS terminals, employee access, and security policies so your team just plugs in and starts selling.' },
    { q: 'What happens when an employee leaves?', a: 'One click. Access is revoked instantly across all systems, terminals, and locations. No data leaves your infrastructure, and the full session history is preserved for audit purposes.' },
    { q: 'Can we manage both physical stores and e-commerce from one place?', a: 'Yes. Our platform provides unified management for in-store POS, inventory, e-commerce backends, and CRM — all from a single, centralized dashboard.' },
    { q: 'How do you protect customer payment data?', a: 'All payment data is encrypted end-to-end, stored in isolated environments, and never touches local POS hardware. Our infrastructure supports PCI-DSS compliance requirements.' },
    { q: 'Can store managers only see their own store data?', a: 'Absolutely. Store-level isolation ensures each manager sees only their own store data, while regional and corporate management gets the full picture across all locations.' },
  ],
};

const EDUCATION: IndustryData = {
  id: 'education',
  icon: GraduationCap,
  name: 'Education',
  heroHeadline: 'Connected Learning For',
  heroHighlight: 'Education.',
  heroDesc: 'Empower teachers, protect students, and connect campuses — with technology that makes learning accessible, secure, and scalable.',
  overview: 'Educational institutions manage an enormous amount of sensitive data — student records, exam papers, financial information — while simultaneously needing to provide open, accessible learning environments. Balancing security with accessibility is a constant challenge, especially across multiple campuses and remote learning programs.\n\nMadhyam helps educational institutions deliver secure, connected learning experiences. Our platform provides campus-level isolation, role-based access for staff and students, content filtering, and seamless remote access to learning management systems — all without requiring students or faculty to install any software.',
  challenges: [
    { icon: Lock, title: 'Student Data Privacy', desc: 'Protecting sensitive student records, exam data, and personal information from breaches and unauthorized access.' },
    { icon: Folder, title: 'Content Access Control', desc: 'Managing what content is accessible to students versus faculty, and ensuring exam materials remain secure.' },
    { icon: Shield, title: 'Remote Learning Security', desc: 'Providing secure access to learning platforms for remote students without exposing institutional systems.' },
    { icon: Globe, title: 'Multi-Campus Management', desc: 'Maintaining consistent technology policies and access controls across multiple campuses and learning centres.' },
  ],
  solutions: [
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Enable students and faculty to securely access LMS, portals, and library systems from any device, anywhere.', solutionId: 'remote' },
    { icon: Eye, title: 'Stay In Control', desc: 'Granular access policies for faculty, students, and administrative staff — with content filtering and time-based controls.', solutionId: 'control' },
    { icon: Brain, title: 'AI For Your Business', desc: 'AI-powered tools for automated grading assistance, content recommendations, and administrative workflow optimization.', solutionId: 'ai' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Students access learning platforms from any device without software installation — perfect for BYOD environments.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Content filtering and endpoint security that keeps students focused and institutional systems protected.' },
    { icon: Brain, name: 'AI Suite', desc: 'AI-powered tools for administrative automation, content management, and learning analytics.' },
  ],
  workflowDepts: ['Administration', 'Teachers', 'Students', 'Library', 'Finance', 'IT'],
  workflowApps: ['LMS', 'Student Portal', 'Fee Management', 'Library System', 'HR', 'Attendance'],
  workflowPolicies: ['Student Data Privacy', 'Content Filtering', 'Time-Based Access', 'Campus Isolation'],
  recommendedInfra: 'shared',
  faqs: [
    { q: 'Can students use their own devices to access learning platforms?', a: 'Yes. DeviceLESS technology lets students access LMS, library systems, and student portals from any personal device through a secure browser session. No software installation required.' },
    { q: 'How do you secure exam materials?', a: 'Exam content is stored in isolated, encrypted environments with strict time-based access controls. Faculty can set precise availability windows, and all access is logged for audit purposes.' },
    { q: 'Can you manage multiple campuses from one place?', a: 'Absolutely. Our platform provides centralized management with campus-level isolation. Each campus can have its own policies while being managed from a single administrative dashboard.' },
    { q: 'Is the platform suitable for K-12 and higher education?', a: 'Yes. Our platform is flexible enough for K-12 content filtering requirements and sophisticated enough for university research environments and multi-department faculty access.' },
    { q: 'How fast can we deploy across all campuses?', a: 'Most multi-campus deployments are fully operational within one week. We handle setup, configuration, and training for IT staff and faculty coordinators.' },
  ],
};

const FINANCE: IndustryData = {
  id: 'finance',
  icon: Landmark,
  name: 'Finance',
  heroHeadline: 'Bank-Grade Security For',
  heroHighlight: 'Finance.',
  heroDesc: 'Build your financial operations on infrastructure designed for zero-trust security, regulatory compliance, and uninterrupted trading.',
  overview: 'Financial institutions operate under some of the most stringent regulatory requirements in any industry. Every transaction must be logged, every access point audited, and every piece of data encrypted. At the same time, trading desks need millisecond-level responsiveness and operations teams need 24/7 availability.\n\nMadhyam provides dedicated, bank-grade infrastructure purpose-built for financial services. Our zero-trust architecture ensures that every user, device, and application is verified before access is granted — with complete audit trails, compliance reporting, and disaster recovery built into every deployment.',
  challenges: [
    { icon: ShieldCheck, title: 'Regulatory Compliance', desc: 'Meeting complex financial regulations including data residency, audit requirements, and reporting obligations.' },
    { icon: Lock, title: 'Transaction Security', desc: 'Ensuring every financial transaction is encrypted, logged, and protected from interception or tampering.' },
    { icon: Folder, title: 'Audit Requirements', desc: 'Maintaining comprehensive, tamper-proof audit trails for every system access, data modification, and transaction.' },
    { icon: EyeOff, title: 'Insider Threat Prevention', desc: 'Detecting and preventing unauthorized data access or exfiltration by internal staff with legitimate credentials.' },
  ],
  solutions: [
    { icon: Eye, title: 'Stay In Control', desc: 'Zero-trust access controls with continuous verification for every user, device, and session across your financial systems.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Bank-grade encryption, data loss prevention, and insider threat detection for your entire financial operation.', solutionId: 'protect' },
    { icon: RefreshCw, title: 'Business Continuity', desc: 'Multi-region disaster recovery with automated failover ensures your trading and operations never go offline.', solutionId: 'continuity' },
  ],
  products: [
    { icon: Lock, name: 'Vault', desc: 'Ultra-secure encrypted storage for financial records, client data, and transaction histories with compliance-ready controls.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Advanced endpoint protection with insider threat detection and data loss prevention for financial workstations.' },
    { icon: RefreshCw, name: 'DRP', desc: 'Multi-region disaster recovery with near-zero RPO and RTO for mission-critical financial systems.' },
  ],
  workflowDepts: ['Trading', 'Operations', 'Compliance', 'Risk', 'Accounting', 'IT'],
  workflowApps: ['Core Banking', 'Trading Platform', 'Compliance Suite', 'Tally', 'Risk Engine', 'Audit'],
  workflowPolicies: ['Zero-Trust Access', 'Transaction Logging', 'Compliance Reports', 'Geo-Restricted'],
  recommendedInfra: 'dedicated',
  faqs: [
    { q: 'How do you ensure regulatory compliance?', a: 'Our infrastructure is designed with compliance built in — including automated audit trails, data residency controls, access logging, and compliance reporting that maps to financial regulatory frameworks.' },
    { q: 'What level of uptime do you guarantee?', a: 'Our dedicated financial infrastructure provides 99.99% uptime with multi-region failover. Trading platforms receive priority routing and dedicated resources to ensure millisecond-level responsiveness.' },
    { q: 'How do you prevent insider threats?', a: 'Our Stealth product monitors all endpoint activity in real-time, detecting anomalous data access patterns, unauthorized copy attempts, and suspicious session behaviour — alerting security teams instantly.' },
    { q: 'Can we meet data residency requirements?', a: 'Yes. We offer data residency options across multiple regions, ensuring your financial data remains within required geographic boundaries while maintaining full operational capability.' },
    { q: 'How are audit trails maintained?', a: 'Every system access, data modification, and transaction generates a tamper-proof audit log that is stored separately from operational data, with configurable retention periods and automated compliance reporting.' },
  ],
};

const LEGAL: IndustryData = {
  id: 'legal',
  icon: Scale,
  name: 'Legal',
  heroHeadline: 'Confidential Workspaces For',
  heroHighlight: 'Legal.',
  heroDesc: 'Protect client privilege, secure case files, and enable your practice to work from anywhere — without ever compromising confidentiality.',
  overview: 'Legal practices handle some of the most sensitive information in any profession. Client privilege demands absolute data isolation, case documents must be protected with enterprise-grade security, and every access event must be auditable. Yet most law firms rely on consumer-grade tools that leave gaps in their security posture.\n\nMadhyam provides purpose-built technology for legal professionals. Our platform delivers client-matter isolation, document classification controls, comprehensive audit trails, and secure remote access — enabling your practice to serve clients with confidence from any location.',
  challenges: [
    { icon: Lock, title: 'Client Confidentiality', desc: 'Maintaining absolute data separation between clients and ensuring attorney-client privilege is never compromised.' },
    { icon: Folder, title: 'Document Security', desc: 'Protecting sensitive case files, contracts, and correspondence from unauthorized access, leaks, or tampering.' },
    { icon: Activity, title: 'Audit Trails', desc: 'Maintaining comprehensive access logs for every document, file, and system interaction for regulatory and compliance needs.' },
    { icon: Database, title: 'Multi-Client Data Isolation', desc: 'Ensuring complete data separation between different client matters to prevent accidental conflicts of interest.' },
  ],
  solutions: [
    { icon: Eye, title: 'Stay In Control', desc: 'Client-matter isolation with granular access controls ensures only authorized team members access specific case data.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Document classification, print restrictions, and data loss prevention protect client privilege at every layer.', solutionId: 'protect' },
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Secure remote access to case management, document vaults, and court portals from any device, any location.', solutionId: 'remote' },
  ],
  products: [
    { icon: Lock, name: 'Vault', desc: 'Encrypted document storage with client-matter isolation, version control, and comprehensive audit trails.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible endpoint security with print restrictions, screenshot prevention, and data exfiltration controls.' },
    { icon: MapPin, name: 'Geo Binding', desc: 'Lock sensitive case data access to approved locations — office premises, home offices, or court facilities.' },
  ],
  workflowDepts: ['Partners', 'Associates', 'Paralegals', 'Clerks', 'Admin', 'Accounts'],
  workflowApps: ['Case Management', 'Document Vault', 'Court Portal', 'Billing', 'Research', 'Communication'],
  workflowPolicies: ['Client-Matter Isolation', 'Document Classification', 'Access Audit Trail', 'Print Restrictions'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'How do you ensure client-matter isolation?', a: 'Each client matter operates in a completely isolated environment. Data, documents, and access logs are separated at the infrastructure level, preventing any cross-contamination between client matters.' },
    { q: 'Can associates work remotely on case files?', a: 'Yes. Our DeviceLESS technology provides secure access to case management systems and document vaults from any device — without storing any case data on the local machine.' },
    { q: 'How do you prevent document leaks?', a: 'Our Stealth product enforces print restrictions, blocks screenshots, disables USB storage, and monitors all file access patterns — alerting administrators to any suspicious activity.' },
    { q: 'Are audit trails tamper-proof?', a: 'Yes. All access logs are stored in a separate, append-only audit system that cannot be modified or deleted, even by administrators. Logs are retained according to your compliance requirements.' },
    { q: 'Can we integrate with existing case management software?', a: 'Absolutely. Our platform is compatible with all major legal case management, billing, and research tools. We handle the integration during deployment at no additional cost.' },
  ],
};

const HOSPITALITY: IndustryData = {
  id: 'hospitality',
  icon: UtensilsCrossed,
  name: 'Hospitality',
  heroHeadline: 'Multi-Property Control For',
  heroHighlight: 'Hospitality.',
  heroDesc: 'Manage every property, every department, and every season from one platform — with instant scaling for peak demand.',
  overview: 'Hospitality businesses operate across multiple properties, departments, and seasons — each with unique staffing needs, system requirements, and security considerations. Front desk needs PMS access, F&B needs POS terminals, housekeeping needs task management, and management needs visibility across everything.\n\nMadhyam provides multi-property technology management designed for hospitality. Our platform delivers property-level isolation, seasonal staff onboarding in minutes, role-based POS access, and centralized reporting — so you can focus on delivering exceptional guest experiences while we handle the technology.',
  challenges: [
    { icon: Globe, title: 'Multi-Property Management', desc: 'Maintaining consistent technology standards and security policies across hotels, resorts, and restaurant chains.' },
    { icon: Users, title: 'Guest vs Staff Isolation', desc: 'Keeping guest-facing systems completely separate from back-of-house operations and financial data.' },
    { icon: Clock, title: 'Seasonal Staff Onboarding', desc: 'Rapidly provisioning and deprovisioning access for seasonal employees during peak periods.' },
    { icon: Layers, title: 'POS and PMS Integration', desc: 'Integrating point-of-sale, property management, and channel management systems into a unified, secure platform.' },
  ],
  solutions: [
    { icon: TrendingUp, title: 'Grow Without Limits', desc: 'Add new properties and scale capacity for seasonal demand without infrastructure headaches.', solutionId: 'scale' },
    { icon: Eye, title: 'Stay In Control', desc: 'Property-level isolation with centralized management — every front desk, kitchen, and back office under one dashboard.', solutionId: 'control' },
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Enable management to monitor and control operations across all properties from any location.', solutionId: 'remote' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Instant access to PMS, POS, and reservation systems from any hotel terminal — perfect for seasonal staff and multi-property operations.' },
    { icon: MapPin, name: 'Geo Binding', desc: 'Lock POS and PMS access to specific property locations, preventing unauthorized access from outside the premises.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible security for guest-facing and back-of-house systems that protects without disrupting service.' },
  ],
  workflowDepts: ['Front Desk', 'Housekeeping', 'F&B', 'Finance', 'Marketing', 'Management'],
  workflowApps: ['PMS', 'Channel Manager', 'POS', 'Reservation', 'Accounting', 'Loyalty'],
  workflowPolicies: ['Property Isolation', 'Seasonal Access', 'Role-Based POS', 'Centralized Reporting'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'How fast can we onboard seasonal staff?', a: 'Seasonal staff can be fully provisioned with the right access to PMS, POS, and housekeeping systems in under 15 minutes. When their contract ends, access is revoked instantly.' },
    { q: 'Can each property have its own policies?', a: 'Yes. Each property operates in an isolated environment with its own access policies, user roles, and system configurations — all managed from a centralized corporate dashboard.' },
    { q: 'Do you integrate with our existing PMS and Channel Manager?', a: 'Our platform is compatible with all major hospitality systems including Opera, Cloudbeds, and popular channel managers. We handle integration during deployment.' },
    { q: 'How do you handle guest Wi-Fi vs staff network separation?', a: 'Our infrastructure provides complete network isolation between guest-facing services and back-of-house operations. Guest traffic never touches your operational systems.' },
    { q: 'Can management access all properties remotely?', a: 'Yes. Our platform provides real-time dashboards showing operations, performance, and system health across all properties — accessible securely from any device, anywhere.' },
  ],
};

const CONSTRUCTION: IndustryData = {
  id: 'construction',
  icon: HardHat,
  name: 'Construction',
  heroHeadline: 'Field-to-Office For',
  heroHighlight: 'Construction.',
  heroDesc: 'Connect every project site to your central office with secure access to blueprints, billing, and project management — from the field.',
  overview: 'Construction companies operate across distributed project sites, each with engineers, project managers, and contractors who need access to design files, billing systems, and project management tools. Traditional IT approaches fail when teams are spread across cities, with unreliable connectivity and contractor turnover.\n\nMadhyam connects your field operations to your central office securely. Our platform enables project-based access control, contractor isolation, site-level geo-binding, and secure access to AutoCAD, Tally, and project management tools — all from any device at any project site.',
  challenges: [
    { icon: Globe, title: 'Field-to-Office Secure Access', desc: 'Providing secure, reliable access to central systems from remote construction sites with varying connectivity.' },
    { icon: Lock, title: 'Project Data Security', desc: 'Protecting sensitive blueprints, cost estimates, and bid documents from unauthorized access and competitive espionage.' },
    { icon: Layers, title: 'Multi-Site Coordination', desc: 'Coordinating technology, data, and access across multiple active construction sites simultaneously.' },
    { icon: Users, title: 'Contractor Access Management', desc: 'Providing temporary, isolated access to contractors and subcontractors without exposing your core systems.' },
  ],
  solutions: [
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Secure access to AutoCAD, project management, and billing systems from any device at any project site.', solutionId: 'remote' },
    { icon: Eye, title: 'Stay In Control', desc: 'Project-based access controls with contractor isolation — every user sees only what they need to.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Blueprint security, cost estimate protection, and bid document encryption for your competitive advantage.', solutionId: 'protect' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Access AutoCAD, Tally, and project management tools from any device at any project site — no software installation needed.' },
    { icon: MapPin, name: 'Geo Binding', desc: 'Bind system access to specific project sites, preventing blueprint and financial data from being accessed off-site.' },
    { icon: Lock, name: 'Vault', desc: 'Encrypted storage for blueprints, cost estimates, and bid documents with project-based access controls.' },
  ],
  workflowDepts: ['Project Mgmt', 'Engineering', 'Procurement', 'Finance', 'HR', 'Site Ops'],
  workflowApps: ['Project Mgmt', 'AutoCAD', 'Cost Estimation', 'Billing', 'Tally', 'Safety'],
  workflowPolicies: ['Project-Based Access', 'Contractor Isolation', 'Site Geo-Binding', 'Blueprint Security'],
  recommendedInfra: 'vps',
  faqs: [
    { q: 'Can engineers access AutoCAD from project sites?', a: 'Yes. Our VPS infrastructure is optimized for graphics-intensive applications like AutoCAD. Engineers can access their design environment from any device at any site through a secure browser connection.' },
    { q: 'How do you handle contractor access?', a: 'Contractors receive isolated, project-specific access with automatic expiry dates. They see only the systems and files relevant to their scope, and access is revoked automatically when the contract ends.' },
    { q: 'What if the project site has poor internet?', a: 'Our platform is optimized for low-bandwidth connections. Critical operations can continue even on basic mobile data, with intelligent caching and session recovery for connectivity interruptions.' },
    { q: 'Can we restrict access to specific project sites?', a: 'Yes. Geo Binding locks system access to approved locations — specific project sites, the central office, or designated home offices. Access attempts from unauthorized locations are automatically blocked.' },
    { q: 'How do you secure bid documents?', a: 'Bid documents are stored in encrypted Vault environments with strict access controls, watermarking, print restrictions, and comprehensive audit trails. Only authorized personnel can access them during the bid window.' },
  ],
};

const CA_FIRMS: IndustryData = {
  id: 'ca-firms',
  icon: Calculator,
  name: 'CA Firms',
  heroHeadline: 'Secure Practice For',
  heroHighlight: 'CA Firms.',
  heroDesc: 'Handle every client with confidence \u2014 from Tally to tax portals, our platform keeps your practice secure, scalable, and compliant.',
  overview: 'Chartered Accountancy firms manage sensitive financial data for dozens or hundreds of clients simultaneously. During filing seasons, capacity demands spike dramatically, and the firm must scale without compromising data isolation between clients. Every Tally instance, every tax portal session, and every audit document must be completely separated.\n\nMadhyam provides purpose-built infrastructure for CA practices. Our platform delivers client data isolation at the infrastructure level, seamless Tally and tax portal access from any device, automatic scaling during filing seasons, and USB/print restrictions that protect client confidentiality.',
  challenges: [
    { icon: Database, title: 'Multi-Client Data Isolation', desc: 'Maintaining complete data separation between client accounts to prevent conflicts and ensure confidentiality.' },
    { icon: Lock, title: 'Tax Software Secure Access', desc: 'Providing secure, centralized access to Tally, GST portals, and tax filing platforms across the firm.' },
    { icon: TrendingUp, title: 'Seasonal Capacity Scaling', desc: 'Rapidly scaling infrastructure during filing seasons to handle increased workload without performance degradation.' },
    { icon: ShieldCheck, title: 'Filing Compliance', desc: 'Ensuring all filing activities are logged, auditable, and compliant with professional standards.' },
  ],
  solutions: [
    { icon: Eye, title: 'Stay In Control', desc: 'Client data isolation, access logging, and role-based controls for partners, staff, and article clerks.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'USB disabled, print restrictions, and encrypted storage for all client financial data.', solutionId: 'protect' },
    { icon: TrendingUp, title: 'Grow Without Limits', desc: 'Automatically scale capacity during filing seasons and add new clients without infrastructure overhauls.', solutionId: 'scale' },
  ],
  products: [
    { icon: Lock, name: 'Vault', desc: 'Encrypted, isolated storage for each client with comprehensive audit trails and access controls.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Invisible endpoint security with USB restrictions, print controls, and screenshot prevention for client data.' },
    { icon: Monitor, name: 'DeviceLESS', desc: 'Access Tally, tax portals, and audit tools from any device — perfect for remote work and branch offices.' },
  ],
  workflowDepts: ['Partners', 'Senior Staff', 'Juniors', 'Clerks', 'Admin', 'IT'],
  workflowApps: ['Tally', 'Tax Portal', 'GST', 'Audit Tools', 'Excel', 'Communication'],
  workflowPolicies: ['Client Data Isolation', 'Filing Period Scaling', 'Print Restrictions', 'USB Disabled'],
  recommendedInfra: 'shared',
  faqs: [
    { q: 'Can each staff member access only their assigned clients?', a: 'Yes. Our platform provides client-level isolation where each staff member is assigned specific client environments. Partners can access all clients, while junior staff see only their assignments.' },
    { q: 'How does scaling work during tax filing season?', a: 'Our platform automatically scales resources during filing seasons. You can add temporary capacity with one click and scale back down when the rush is over — you only pay for what you use.' },
    { q: 'Is Tally fully compatible?', a: 'Absolutely. Tally runs natively on our infrastructure with optimized performance. Multiple users can access separate Tally instances simultaneously, each isolated to a specific client.' },
    { q: 'Can we prevent staff from copying client data to USB drives?', a: 'Yes. USB ports are disabled by default, and our Stealth product prevents screenshots, print to file, and all other data exfiltration methods — protecting client data at every endpoint.' },
    { q: 'How do article clerks access the system?', a: 'Article clerks receive restricted access with only the tools and client data they need. Access is automatically adjusted based on their rotation schedule and revoked upon completion.' },
  ],
};

const SMES: IndustryData = {
  id: 'smes',
  icon: Building2,
  name: 'SMEs',
  heroHeadline: 'Enterprise Technology For',
  heroHighlight: 'Growing Businesses.',
  heroDesc: 'Get the technology infrastructure of a large enterprise — without the complexity, cost, or dedicated IT team.',
  overview: 'Small and medium enterprises are the backbone of every economy, yet they are often forced to choose between consumer-grade tools that lack security and enterprise systems that are too complex and expensive. Growing teams need scalable, secure infrastructure — but most SMEs cannot afford a dedicated IT department.\n\nMadhyam bridges this gap. We provide enterprise-grade infrastructure, security, and management tools designed specifically for SMEs. No dedicated IT team required — our platform handles deployment, management, monitoring, and support, so your team can focus on growing the business.',
  challenges: [
    { icon: Headphones, title: 'Limited IT Resources', desc: 'Operating without a dedicated IT team while still needing enterprise-grade security and infrastructure management.' },
    { icon: TrendingUp, title: 'Budget-Conscious Scaling', desc: 'Growing technology infrastructure in line with business growth without large upfront capital expenditure.' },
    { icon: Users, title: 'Growing Team Management', desc: 'Onboarding new employees and managing access as the team grows from 10 to 100 and beyond.' },
    { icon: Shield, title: 'Basic Security Needs', desc: 'Implementing fundamental security practices — backup, access control, email protection — without enterprise complexity.' },
  ],
  solutions: [
    { icon: Monitor, title: 'Work From Anywhere', desc: 'Enable your growing team to work securely from any device, any location — office, home, or on the road.', solutionId: 'remote' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Essential security for email, data, and endpoints — enterprise-grade protection without enterprise complexity.', solutionId: 'protect' },
    { icon: TrendingUp, title: 'Grow Without Limits', desc: 'Scale your infrastructure seamlessly as your team and business grows — add users and capacity in minutes.', solutionId: 'scale' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Access all business applications from any device without installation — perfect for BYOD and remote teams.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Set-and-forget endpoint protection that secures every workstation without requiring IT expertise.' },
    { icon: Lock, name: 'Vault', desc: 'Secure, automated backup and encrypted storage for all your business data with one-click recovery.' },
  ],
  workflowDepts: ['Management', 'Operations', 'Sales', 'Finance', 'Support', 'Admin'],
  workflowApps: ['Office Suite', 'Email', 'CRM', 'Tally', 'Inventory', 'Communication'],
  workflowPolicies: ['Basic Access Control', 'Standard Backup', 'Email Security', 'Web Filtering'],
  recommendedInfra: 'shared',
  faqs: [
    { q: 'Do we need an IT team to use Madhyam?', a: 'No. Our platform is fully managed — we handle deployment, monitoring, updates, and support. Your team just uses the tools while we take care of the infrastructure.' },
    { q: 'How much does it cost compared to managing our own servers?', a: 'Most SMEs save 40-60% compared to maintaining in-house servers when you factor in hardware, IT staff, electricity, and downtime costs. Our pricing scales with your team size.' },
    { q: 'Can we start small and scale later?', a: 'Absolutely. Start with as few as 5 users and scale to hundreds as your business grows. Adding new users and capacity takes minutes, not weeks.' },
    { q: 'What if we already use Google Workspace or Microsoft 365?', a: 'Our platform complements your existing tools. We provide the secure infrastructure layer that Google and Microsoft lack — including data backup, endpoint security, and access control.' },
    { q: 'How long does deployment take?', a: 'Most SME deployments are fully operational within 24 hours. We handle migration, setup, and configuration — your team just logs in and starts working.' },
  ],
};

const ENTERPRISE: IndustryData = {
  id: 'enterprise',
  icon: Users,
  name: 'Enterprise',
  heroHeadline: 'Dedicated Infrastructure For',
  heroHighlight: 'Enterprise.',
  heroDesc: 'Custom-engineered, dedicated infrastructure for organizations that demand the highest levels of security, compliance, and performance.',
  overview: 'Large enterprises require technology infrastructure that matches the scale and complexity of their operations. Off-the-shelf solutions cannot address custom compliance requirements, multi-region deployments, mission-critical uptime needs, and the intricate access control patterns of a large distributed workforce.\n\nMadhyam provides fully dedicated, custom-engineered infrastructure for enterprise clients. Every deployment is tailored to the specific requirements of the organisation \u2014 from zero-trust architecture and multi-region disaster recovery to compliance automation and dedicated engineering support. Your infrastructure, your rules, your dedicated team.',
  challenges: [
    { icon: ShieldCheck, title: 'Complex Regulatory Compliance', desc: 'Navigating multi-jurisdictional regulatory requirements across different markets, industries, and data residency laws.' },
    { icon: Globe, title: 'Large Distributed Workforce', desc: 'Providing secure, consistent technology access to thousands of employees across multiple countries and time zones.' },
    { icon: Zap, title: 'Mission-Critical Uptime', desc: 'Ensuring 99.99%+ uptime for business-critical systems that cannot tolerate any interruption.' },
    { icon: Server, title: 'Custom Engineering Requirements', desc: 'Building and maintaining custom infrastructure components that off-the-shelf solutions simply cannot provide.' },
  ],
  solutions: [
    { icon: Eye, title: 'Stay In Control', desc: 'Zero-trust architecture with continuous verification, dynamic access policies, and real-time threat detection.', solutionId: 'control' },
    { icon: Shield, title: 'Protect Your Business', desc: 'Enterprise-grade security with advanced threat protection, data loss prevention, and insider threat monitoring.', solutionId: 'protect' },
    { icon: RefreshCw, title: 'Business Continuity', desc: 'Multi-region disaster recovery with automated failover, near-zero RPO/RTO, and 24/7 dedicated engineering support.', solutionId: 'continuity' },
  ],
  products: [
    { icon: Monitor, name: 'DeviceLESS', desc: 'Secure, device-agnostic access to enterprise applications for your entire global workforce.' },
    { icon: EyeOff, name: 'Stealth', desc: 'Advanced endpoint protection with AI-powered threat detection and automated response capabilities.' },
    { icon: Lock, name: 'Vault', desc: 'Enterprise-grade encrypted storage with multi-region replication and compliance-ready access controls.' },
    { icon: MapPin, name: 'Geo Binding', desc: 'Geographic access controls for compliance with data residency requirements across multiple jurisdictions.' },
    { icon: RefreshCw, name: 'DRP', desc: 'Multi-region disaster recovery with automated failover, continuous replication, and guaranteed RTO/RPO.' },
    { icon: Brain, name: 'AI Suite', desc: 'Enterprise AI tools for security analytics, compliance automation, and operational intelligence.' },
  ],
  workflowDepts: ['Executive', 'Engineering', 'Operations', 'Finance', 'Legal', 'HR', 'IT', 'Sales'],
  workflowApps: ['Custom ERP', 'Enterprise BI', 'Compliance Suite', 'Communication', 'CRM', 'HR Platform'],
  workflowPolicies: ['Zero-Trust Architecture', 'Multi-Region DR', 'Compliance Automation', 'Dedicated Engineering'],
  recommendedInfra: 'dedicated',
  faqs: [
    { q: 'What level of customization is available?', a: 'Every enterprise deployment is custom-engineered to your specific requirements. From network architecture to compliance controls, our dedicated engineering team builds infrastructure that maps exactly to your operational needs.' },
    { q: 'Do we get a dedicated engineering team?', a: 'Yes. Enterprise clients receive a dedicated engineering team that handles deployment, ongoing optimization, incident response, and custom development — available 24/7 through priority channels.' },
    { q: 'What SLA do you offer?', a: 'Enterprise SLAs include 99.99% uptime guarantee, sub-15-minute incident response, dedicated account management, and custom escalation procedures tailored to your organisation.' },
    { q: 'Can you support multi-region deployments?', a: 'Absolutely. We deploy infrastructure across multiple regions simultaneously, with data replication, automated failover, and compliance controls that respect data residency requirements in each jurisdiction.' },
    { q: 'How do you handle integration with our existing systems?', a: 'Our engineering team works directly with your IT department to integrate with existing ERP, CRM, BI, and custom systems. We provide API-level integration, SSO, and custom connectors as needed.' },
  ],
};

const ALL_INDUSTRIES: IndustryData[] = [
  HEALTHCARE, MANUFACTURING, RETAIL, EDUCATION, FINANCE, LEGAL,
  HOSPITALITY, CONSTRUCTION, CA_FIRMS, SMES, ENTERPRISE,
];

const TABS: { id: IndustrySlug; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'retail', label: 'Retail' },
  { id: 'education', label: 'Education' },
  { id: 'finance', label: 'Finance' },
  { id: 'legal', label: 'Legal' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'construction', label: 'Construction' },
  { id: 'ca-firms', label: 'CA Firms' },
  { id: 'smes', label: 'SMEs' },
  { id: 'enterprise', label: 'Enterprise' },
];

/* ─── Infra cards data ──────────────────────────────────────── */
const INFRA_OPTIONS = [
  {
    id: 'shared' as const,
    icon: Globe,
    name: 'Shared Cloud',
    desc: 'Cost-effective, managed infrastructure ideal for teams up to 50 users. Full security and management included.',
    features: ['Up to 50 users', 'Managed security', 'Daily backups', '99.9% uptime SLA'],
  },
  {
    id: 'vps' as const,
    icon: Server,
    name: 'Virtual Private Server',
    desc: 'Dedicated resources on shared hardware. Ideal for growing organisations that need performance and isolation.',
    features: ['Dedicated resources', 'Full isolation', 'Hourly backups', '99.95% uptime SLA'],
  },
  {
    id: 'dedicated' as const,
    icon: Database,
    name: 'Dedicated Server',
    desc: 'Fully dedicated hardware with custom configuration. For enterprises that demand maximum performance and control.',
    features: ['Dedicated hardware', 'Custom config', 'Continuous replication', '99.99% uptime SLA'],
  },
];

/* ─── FAQ Accordion item ─────────────────────────────────────── */
function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="border border-gray-100 dark:border-[#b5e245]/5 rounded-2xl overflow-hidden transition-colors hover:border-[#b5e245]/20"
      variants={staggerChild}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white dark:bg-[#0a3525]/30"
      >
        <span className="font-display font-semibold text-gray-900 dark:text-white pr-4">{q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
        >
          <ChevronDown className="w-5 h-5 text-[#b5e245] flex-shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Workflow Dashboard ────────────────────────────────────── */
function WorkflowDashboard({ depts, apps, policies, industryName }: {
  depts: string[]; apps: string[]; policies: string[]; industryName: string;
}) {
  const [activeTab, setActiveTab] = useState<'depts' | 'apps' | 'policies'>('depts');

  const tabItems = [
    { id: 'depts' as const, label: 'Departments', icon: Users },
    { id: 'apps' as const, label: 'Applications', icon: Layers },
    { id: 'policies' as const, label: 'Policies', icon: Shield },
  ];

  const items = activeTab === 'depts' ? depts : activeTab === 'apps' ? apps : policies;
  const itemIcon = activeTab === 'depts' ? Users : activeTab === 'apps' ? Monitor : ShieldCheck;

  return (
    <div className="bg-white dark:bg-[#0a3525]/30 border border-gray-100 dark:border-[#b5e245]/5 rounded-2xl p-6 md:p-8">
      {/* dashboard title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#b5e245]/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-[#b5e245]" />
        </div>
        <div>
          <h4 className="font-display font-bold text-gray-900 dark:text-white">{industryName} Workflow</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">How Madhyam powers your operations</p>
        </div>
      </div>

      {/* inner tabs */}
      <div className="flex gap-2 mb-6">
        {tabItems.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === t.id
                ? 'bg-[#b5e245] text-[#051c14]'
                : 'bg-gray-100 dark:bg-[#051c14]/60 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#051c14]'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* items grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {items.map((item, i) => {
            const Icon = itemIcon;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-[#051c14]/40 rounded-xl border border-gray-100 dark:border-[#b5e245]/5"
              >
                <Icon className="w-4 h-4 text-[#b5e245] flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{item}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Shared IndustryPage component ──────────────────────────── */
function IndustryPage({ data, setActivePage, goBack }: {
  data: IndustryData; setActivePage: (page: ActivePage) => void; goBack: () => void;
}) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <motion.div
      key={data.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#b5e245]/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-[#e29cc3]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* back button */}
          <FadeUp>
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#b5e245] transition-colors mb-8"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              All Industries
            </button>
          </FadeUp>

          <FadeUp delay={0.1}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-6">
              <data.icon className="w-4 h-4" />
              {data.name}
            </span>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 max-w-3xl">
              {data.heroHeadline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b5e245] to-[#e29cc3]">
                {data.heroHighlight}
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {data.heroDesc}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. Overview ──────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="max-w-4xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Understanding the{' '}
                <span className="text-[#b5e245]">{data.name}</span> Landscape
              </h2>
              {data.overview.split('\n\n').map((p, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. Challenges ────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#051c14]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e29cc3]/10 text-[#e29cc3] text-sm font-medium mb-4">
              Challenges
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
              What {data.name} Faces Today
            </h2>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-6"
          >
            {data.challenges.map((ch, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-100 dark:border-[#b5e245]/5 p-6 hover:border-[#b5e245]/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#e29cc3]/10 flex items-center justify-center mb-4 group-hover:bg-[#e29cc3]/20 transition-colors">
                  <ch.icon className="w-6 h-6 text-[#e29cc3]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{ch.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{ch.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. How Madhyam Helps ─────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-4">
              Solutions
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How Madhyam Helps {data.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Purpose-built solutions that address the specific challenges of {data.name.toLowerCase()} organisations.
            </p>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {data.solutions.map((sol, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-100 dark:border-[#b5e245]/5 p-6 hover:border-[#b5e245]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => setActivePage('services')}
              >
                <div className="w-12 h-12 rounded-xl bg-[#b5e245]/10 flex items-center justify-center mb-4 group-hover:bg-[#b5e245]/20 transition-colors">
                  <sol.icon className="w-6 h-6 text-[#b5e245]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{sol.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{sol.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-[#b5e245] font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5. Recommended Products ──────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#051c14]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-4">
              Products
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recommended For {data.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              The products most commonly deployed across {data.name.toLowerCase()} organisations.
            </p>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={`grid gap-6 ${data.products.length > 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'}`}
          >
            {data.products.map((prod, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-100 dark:border-[#b5e245]/5 p-6 hover:border-[#b5e245]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                onClick={() => setActivePage('products')}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b5e245]/10 to-[#e29cc3]/10 flex items-center justify-center mb-4 group-hover:from-[#b5e245]/20 group-hover:to-[#e29cc3]/20 transition-all">
                  <prod.icon className="w-6 h-6 text-[#b5e245]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{prod.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{prod.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-[#b5e245] font-medium group-hover:gap-2 transition-all">
                  View Product <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. Workflow Dashboard ────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-4">
              Workflow
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your {data.name} Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              A unified view of departments, applications, and security policies — managed from one platform.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <WorkflowDashboard
              depts={data.workflowDepts}
              apps={data.workflowApps}
              policies={data.workflowPolicies}
              industryName={data.name}
            />
          </FadeUp>
        </div>
      </section>

      {/* ── 7. Case Study Placeholder ────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#051c14]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative bg-gradient-to-br from-[#0a3525]/60 to-[#051c14] rounded-2xl border border-[#b5e245]/10 p-8 md:p-12 overflow-hidden">
              {/* bg accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b5e245]/5 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e29cc3]/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#b5e245]/10 flex items-center justify-center flex-shrink-0">
                  <data.icon className="w-8 h-8 text-[#b5e245]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                      {data.name} Success Story
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-[#e29cc3]/20 text-[#e29cc3] text-xs font-medium">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed max-w-xl">
                    We are documenting how leading {data.name.toLowerCase()} organisations transformed their technology infrastructure with Madhyam. Check back soon for the full case study.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── 8. Infrastructure Options ────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-4">
              Infrastructure
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Infrastructure
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Select the deployment model that fits your {data.name.toLowerCase()} scale and requirements.
            </p>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {INFRA_OPTIONS.map(opt => {
              const isRec = opt.id === data.recommendedInfra;
              return (
                <motion.div
                  key={opt.id}
                  variants={staggerChild}
                  className={`relative bg-white dark:bg-[#0a3525]/30 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5 ${
                    isRec
                      ? 'border-[#b5e245]/40 ring-1 ring-[#b5e245]/20'
                      : 'border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20'
                  }`}
                >
                  {isRec && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#b5e245] text-[#051c14] text-xs font-bold">
                      Recommended
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isRec ? 'bg-[#b5e245]/20' : 'bg-gray-100 dark:bg-[#051c14]/40'
                  }`}>
                    <opt.icon className={`w-6 h-6 ${isRec ? 'text-[#b5e245]' : 'text-gray-500 dark:text-gray-400'}`} />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{opt.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{opt.desc}</p>
                  <ul className="space-y-2">
                    {opt.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className={`w-4 h-4 flex-shrink-0 ${isRec ? 'text-[#b5e245]' : 'text-gray-400'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 9. FAQ Accordion ─────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#051c14]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-4 max-w-3xl"
          >
            {data.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10. CTA ──────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative bg-gradient-to-br from-[#104f37] to-[#051c14] rounded-2xl p-8 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#b5e245]/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#e29cc3]/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative">
                <data.icon className="w-12 h-12 text-[#b5e245] mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your{' '}
                  <span className="text-[#b5e245]">{data.name}</span> Technology?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                  Book a consultation with our {data.name.toLowerCase()} technology specialists and discover what Madhyam can do for you.
                </p>
                <button
                  onClick={() => setActivePage('contact')}
                  className="inline-flex items-center gap-2 bg-[#b5e245] hover:bg-[#c5f255] text-[#051c14] font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Consultation for {data.name}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </motion.div>
  );
}

/* ─── Overview page ──────────────────────────────────────────── */
function OverviewPage({ setActiveIndustry, setActivePage }: {
  setActiveIndustry: (id: IndustrySlug) => void; setActivePage: (page: ActivePage) => void;
}) {
  const stats = [
    { value: '17', label: 'Countries', icon: Globe },
    { value: '25,000+', label: 'Users', icon: Users },
    { value: '80,000+', label: 'Deployments', icon: CheckCircle2 },
  ];

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#b5e245]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#e29cc3]/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b5e245]/10 text-[#b5e245] text-sm font-medium mb-6">
              <Layers className="w-4 h-4" />
              Industries
            </span>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 max-w-4xl">
              Technology Designed For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b5e245] to-[#e29cc3]">
                Your Industry.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              Every industry has unique technology challenges. We do not believe in one-size-fits-all.
              Our solutions are customised for your sector — from compliance requirements to workflow automation.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Industry cards ────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Select Your Industry
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl">
              Explore how Madhyam serves organisations across 11 key sectors with purpose-built technology solutions.
            </p>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {ALL_INDUSTRIES.map(ind => (
              <motion.div
                key={ind.id}
                variants={staggerChild}
                onClick={() => setActiveIndustry(ind.id as IndustrySlug)}
                className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-100 dark:border-[#b5e245]/5 p-6 cursor-pointer hover:border-[#b5e245]/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#b5e245]/10 flex items-center justify-center mb-4 group-hover:bg-[#b5e245]/20 group-hover:scale-110 transition-all duration-300">
                  <ind.icon className="w-6 h-6 text-[#b5e245]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{ind.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {ind.heroDesc.slice(0, 100)}…
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-[#b5e245] font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trust stats ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50/50 dark:bg-[#051c14]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted Across the Globe
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Organisations in every sector rely on Madhyam to power their technology infrastructure.
              </p>
            </div>
          </FadeUp>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {stats.map(s => (
              <motion.div
                key={s.label}
                variants={staggerChild}
                className="text-center bg-white dark:bg-[#0a3525]/30 rounded-2xl border border-gray-100 dark:border-[#b5e245]/5 p-8"
              >
                <s.icon className="w-8 h-8 text-[#b5e245] mx-auto mb-4" />
                <p className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {s.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative bg-gradient-to-br from-[#104f37] to-[#051c14] rounded-2xl p-8 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#b5e245]/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#e29cc3]/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Not Sure Where to{' '}
                  <span className="text-[#b5e245]">Start?</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                  Our team will assess your industry, recommend the right solutions, and build a deployment plan tailored to your operations.
                </p>
                <button
                  onClick={() => setActivePage('contact')}
                  className="inline-flex items-center gap-2 bg-[#b5e245] hover:bg-[#c5f255] text-[#051c14] font-bold py-4 px-8 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get a Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════
   Main component
   ═════════════════════════════════════════════════════════════════ */
export default function IndustriesView({ setActivePage }: { setActivePage: (page: ActivePage) => void }) {
  const [activeIndustry, setActiveIndustry] = useState<IndustrySlug>('overview');

  // scroll to top on sub-page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeIndustry]);

  const industryData = ALL_INDUSTRIES.find(i => i.id === activeIndustry);

  return (
    <div className="w-full relative flex flex-col lg:flex-row min-h-screen">
      {/* Industries Sub-Navigation — Sidebar on Desktop, Horizontal Swiper on Mobile */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-[#b5e245]/5 bg-white/85 dark:bg-[#051c14]/85 backdrop-blur-2xl p-2 lg:p-4 z-20 no-scrollbar">
        <div className="max-w-7xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 py-1 lg:py-0">
            {TABS.map(tab => {
              const isActive = activeIndustry === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveIndustry(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium whitespace-nowrap rounded-xl transition-all duration-200 w-full text-left ${
                    isActive
                      ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/10 border border-[#b5e245]/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0a3525]/30 border border-transparent'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Page Content */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {activeIndustry === 'overview' ? (
            <OverviewPage
              key="overview"
              setActiveIndustry={setActiveIndustry}
              setActivePage={setActivePage}
            />
          ) : industryData ? (
            <IndustryPage
              key={industryData.id}
              data={industryData}
              setActivePage={setActivePage}
              goBack={() => setActiveIndustry('overview')}
            />
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

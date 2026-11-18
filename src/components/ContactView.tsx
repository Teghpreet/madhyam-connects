import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Calendar, Clock, CheckCircle2, ChevronDown, Send, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactView() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // FAQ expanding state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          name,
          email,
          phone,
          company,
          message,
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to send message');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Submit Error:', err);
      setSubmitError(err.message || 'An error occurred while sending your request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Can Madhyam Connects sign a custom corporate NDA before inspecting our current ERP configuration?",
      answer: "Absolutely. We strictly enforce corporate data confidentiality. Before you share any database schema diagrams, network topology maps, or system volume metrics, our legal counsel will provide standard or reciprocal Non-Disclosure Agreements (NDAs) to guarantee your proprietary design secrets are completely protected by law."
    },
    {
      question: "How long does a standard ERP Private Cloud migration take?",
      answer: "A seamless transition usually takes between 7 to 14 business days. Our systems engineers first build a standby replication node on your dedicated hypervisor. We run comprehensive stress tests to confirm ERP integrity, then perform the final cutover during off-peak weekend hours to guarantee absolute zero disruption to your daily operations."
    },
    {
      question: "What happens in case of physical hardware failure at the data center?",
      answer: "Your dedicated hypervisors run in active HA (High Availability) pairs on elite, redundant enterprise Dell EMC PowerEdge clusters. Built with dual hot-swap power supplies, dual network interfaces, and high-speed hardware RAID-10 arrays, any component failure triggers a seamless, sub-second failover with absolutely zero transactional database lag."
    },
    {
      question: "What support SLA response times does Madhyam Connects offer for managed hosting?",
      answer: "For our Enterprise Private Cloud clients, we provide highly robust, legally backed SLAs. Our Incident Response metrics feature an urgent P1 database issue turnaround threshold of under 15 minutes, managed 24/7 by our New Delhi Network Operations Center (NOC)."
    }
  ];

  return (
    <div className="space-y-24 md:space-y-36 pb-24 text-left">
      
      {/* 1. HERO TITLE */}
      <section className="relative pt-12 text-center max-w-3xl mx-auto space-y-6 px-4">
        <span className="font-mono text-[#104f37] dark:text-[#b5e245] text-xs font-semibold tracking-wider uppercase bg-[#b5e245]/10 px-3.5 py-1.5 rounded-full">
          Get in Touch
        </span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white tracking-tight">
          Initiate Your Private Cloud Migration
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
          Whether you want to calculate savings with a dedicated Dell hypervisor configuration or plan a zero-downtime SAP/Oracle migration, our engineering bureau is ready to assist.
        </p>
      </section>

      {/* 2. FORM & INFO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CONTACT FORM / SUCCESS STATE */}
          <div className="lg:col-span-7 bg-white dark:bg-brand-green-dark p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-brand-green/15 text-left shadow-sm">
            
            {submitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-[#b5e245]/20 rounded-full flex items-center justify-center mx-auto text-[#104f37] dark:text-[#b5e245] animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                    Discovery Consultation Scheduled!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm font-light leading-relaxed">
                    Thank you, <strong className="text-gray-900 dark:text-white">{name}</strong>. We have logged your request. A Senior Systems Architect has been assigned to your project and will reach out to schedule an NDA review.
                  </p>
                </div>

                {/* Simulated Google Meet Block */}
                <div className="max-w-md mx-auto p-4 bg-gray-50 dark:bg-brand-green-deep/50 rounded-2xl border border-gray-100 dark:border-[#b5e245]/10 text-left space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#b5e245]" />
                      <span>Duration: 30 minutes</span>
                    </span>
                    <span>Google Meet Confirmed</span>
                  </div>
                  <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white">
                    Madhyam Connects Enterprise Private Cloud Discovery
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Our systems architect will demonstrate active failover simulations, map out your private subnet VPN topology, and issue our standard reciprocal NDA template.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-gray-100 dark:bg-brand-green-deep hover:bg-gray-200 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full transition-all"
                >
                  Edit Information / Send Another Message
                </button>

              </motion.div>
            ) : (
              /* Core Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Mehta"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#051c14] border border-gray-200 dark:border-brand-green/20 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#b5e245] transition-all"
                    />
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#051c14] border border-gray-200 dark:border-brand-green/20 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#b5e245] transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#051c14] border border-gray-200 dark:border-brand-green/20 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#b5e245] transition-all"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">
                      Enterprise / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Mehta Logistics Ltd."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-[#051c14] border border-gray-200 dark:border-brand-green/20 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#b5e245] transition-all"
                    />
                  </div>

                </div>



                {/* Project Scope details */}
                <div className="space-y-2">
                  <label className="text-xs font-display font-semibold text-gray-500 uppercase tracking-wider">
                    Project Scope / ERP Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your target database (SAP/Oracle/Odoo/Tally), current hardware bottlenecks, or daily backup needs..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-[#051c14] border border-gray-200 dark:border-brand-green/20 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#b5e245] transition-all"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#104f37] dark:bg-[#b5e245] hover:bg-[#18714f] dark:hover:bg-[#cbf263] text-white dark:text-[#051c14] font-display font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Schedule Architectural Consult'}</span>
                </button>

                {submitError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-xs text-center font-mono">
                    {submitError}
                  </div>
                )}

                <div className="flex items-center gap-2.5 justify-center text-[10px] text-gray-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#b5e245]" />
                  <span>Confidentiality Guaranteed: NDAs will be signed prior to system reviews.</span>
                </div>

              </form>
            )}

          </div>

          {/* RIGHT: ADDRESS DETAILS & SYSTEM MAP */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Office Locations */}
            <div className="bg-white dark:bg-brand-green-dark p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-brand-green/15 text-left space-y-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                Our Corporate Offices
              </h3>
              
              <div className="space-y-6 text-sm">
                
                {/* Office 1 */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#b5e245]/15 text-[#104f37] dark:text-[#b5e245] rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-gray-900 dark:text-white">New Delhi Headquarters</h4>
                    <p className="text-gray-400 font-light leading-relaxed">
                      B16, no. 5, Bhagwan Das Nagar, East Punjabi Bagh, Punjabi Bagh, New Delhi, Delhi, 110026
                    </p>
                  </div>
                </div>



                {/* Direct Contacts */}
                <div className="border-t border-gray-50 dark:border-brand-green/10 pt-4 space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-[#b5e245]/15 text-[#104f37] dark:text-[#b5e245] rounded-lg flex-shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-3 w-full">
                      <h4 className="font-display font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Direct Contacts</h4>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email:{' '}
                          <a href="mailto:team@madhyamconnects.com" className="text-gray-800 dark:text-gray-200 font-semibold hover:underline">
                            team@madhyamconnects.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="p-5 bg-gradient-to-r from-gray-900 to-[#0a3525] border border-[#b5e245]/20 rounded-3xl text-left space-y-3">
              <h4 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b5e245] animate-ping" />
                <span>Our Architect On-Call SLA</span>
              </h4>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                We guarantee a direct certified private cloud systems architect call back within 2 hours for all custom corporate database hosting and migration requests lodged through our web portal.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DETAILED EXPANDING FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-gray-900 dark:text-white">
            Frequently Asked Integration Queries
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base font-light">
            Answering structural questions regarding compliance, migration pathways, and security standards.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-brand-green-dark border border-gray-100 dark:border-brand-green/15 rounded-2xl overflow-hidden transition-all text-left shadow-sm"
              >
                {/* FAQ Header */}
                <div
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="p-5 flex justify-between items-center cursor-pointer select-none"
                >
                  <h3 className="font-display font-bold text-sm md:text-base text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* FAQ Content */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t border-gray-50 dark:border-brand-green/5 pt-4">
                    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

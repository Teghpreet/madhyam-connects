import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Lock, EyeOff, RefreshCw, MapPin, Monitor, Brain,
  Shield, Database, Eye, Folder, Globe, Users,
  Clock, Layers, ShieldCheck, Activity, Building2,
  CheckCircle2, ArrowRight, ChevronDown, Check, Zap,
  Mail, FileText, Factory, HeartPulse, ShoppingBag,
  GraduationCap, Landmark, HardHat, Scale, UtensilsCrossed,
  Fingerprint, Search, Key, AlertTriangle, Wifi, WifiOff,
  Laptop, Smartphone, Server, Settings, TrendingUp,
  BarChart3, MessageSquare, Briefcase, PenTool, BookOpen,
  Headphones, X as XIcon, Cpu, Network, ScanLine, Target,
} from 'lucide-react';
import { ActivePage } from '../types';

/* ═══════════════════════════════════════════════════════════
   INTERACTIVE SIMULATOR COMPONENTS
   ═══════════════════════════════════════════════════════════ */

export function EncryptionSimulator() {
  const [plainText, setPlainText] = useState('My highly confidential business file.pdf');
  const [cipherText, setCipherText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [secretKey] = useState('K3y_Rot4tion_Active_AES256_Active');

  const handleToggle = () => {
    if (!isEncrypted) {
      setIsEncrypting(true);
      setTimeout(() => {
        const mockCipher = btoa(plainText).split('').map((char, i) => i % 3 === 0 ? '$' : char).join('');
        setCipherText(mockCipher);
        setIsEncrypting(false);
        setIsEncrypted(true);
      }, 1200);
    } else {
      setIsEncrypting(true);
      setTimeout(() => {
        setIsEncrypting(false);
        setIsEncrypted(false);
      }, 1200);
    }
  };

  return (
    <section className="py-16 bg-[#0a3525]/10 dark:bg-[#051c14]/40 border-y border-gray-150 dark:border-[#b5e245]/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-2.5 py-1 rounded bg-[#b5e245]/10 text-[#b5e245] text-[10px] font-semibold uppercase tracking-wider">Functional Live Demo</span>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">Military-Grade Encryption Simulator</h3>
          <p className="text-xs text-gray-500 mt-1">See how Madhyam Vault encrypts files at rest with zero-knowledge keys.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Plaintext Data</label>
              <textarea
                value={plainText}
                onChange={(e) => !isEncrypted && setPlainText(e.target.value)}
                disabled={isEncrypted || isEncrypting}
                className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 dark:border-[#b5e245]/10 bg-white dark:bg-[#051c14] text-sm text-gray-900 dark:text-white h-24 focus:outline-none focus:border-[#b5e245]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Encryption Key (Generated Locally)</label>
              <input
                type="text"
                value={secretKey}
                disabled
                className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 dark:border-[#b5e245]/10 bg-gray-50 dark:bg-[#051c14]/50 text-xs text-gray-450 font-mono"
              />
            </div>

            <button
              onClick={handleToggle}
              disabled={isEncrypting}
              className={`w-full py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isEncrypting
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : isEncrypted
                  ? 'bg-[#e29cc3] text-[#051c14] hover:shadow-lg'
                  : 'bg-[#b5e245] text-[#051c14] hover:shadow-lg'
              }`}
            >
              {isEncrypting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  <span>Processing AES-256 ...</span>
                </>
              ) : isEncrypted ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Decrypt Vault Content</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Encrypt & Seal in Vault</span>
                </>
              )}
            </button>
          </div>

          {/* Cipher output / animations */}
          <div className="h-60 rounded-2xl border border-gray-200/80 dark:border-[#b5e245]/10 bg-gray-950 p-4 font-mono text-xs text-[#b5e245] overflow-hidden flex flex-col justify-between relative shadow-inner">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-[#b5e245]/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold">
              <div className={`w-1.5 h-1.5 rounded-full ${isEncrypted ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`} />
              <span>{isEncrypted ? 'SEALED' : 'UNSECURED'}</span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[170px] no-scrollbar">
              <p className="text-gray-500">// System ready.</p>
              {!isEncrypted && !isEncrypting && (
                <>
                  <p className="text-gray-400">[Key State] Rotated 256-bit active key</p>
                  <p className="text-gray-300">[Ready] Awaiting local AES-256 payload...</p>
                  <p className="text-white mt-2 font-sans break-all">&quot;{plainText}&quot;</p>
                </>
              )}
              {isEncrypting && (
                <>
                  <p className="text-yellow-400 animate-pulse">[Encrypting] Performing AES-256 Key Schedule...</p>
                  <p className="text-gray-500">[Info] Diffie-Hellman Key Exchange success</p>
                  <p className="text-gray-400">[Bytes] Scattering payload: {plainText.length} bytes</p>
                  <p className="text-[#e29cc3] break-all animate-pulse">01011001 01101111 01110101 01110010 01100010 01110101 01110011 01101001</p>
                </>
              )}
              {isEncrypted && !isEncrypting && (
                <>
                  <p className="text-[#e29cc3]">[Ciphertext] Payload successfully encrypted:</p>
                  <p className="text-white bg-[#e29cc3]/10 p-2 rounded border border-[#e29cc3]/20 break-all select-all font-sans text-[11px] mt-2">
                    {cipherText}
                  </p>
                  <p className="text-gray-500 mt-2">// The plain data has been fully isolated locally. Your key is stored in your private memory vault.</p>
                </>
              )}
            </div>

            <div className="border-t border-gray-800 pt-2 flex justify-between items-center text-gray-500 text-[10px]">
              <span>AES-256-GCM</span>
              <span>Madhyam Protocol v1.4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StealthSimulator() {
  const [mode, setMode] = useState<'hacker' | 'employee'>('hacker');
  const [isScanning, setIsScanning] = useState(false);
  const [scanLogs, setScanLogs] = useState<string[]>([]);

  const runScan = () => {
    setIsScanning(true);
    setScanLogs([]);
    let currentLogs: string[] = [];

    const addLog = (log: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          currentLogs.push(log);
          setScanLogs([...currentLogs]);
          resolve();
        }, delay);
      });
    };

    if (mode === 'hacker') {
      addLog('// Initiating target network scan...', 0)
        .then(() => addLog('Scanning public IP range: 192.168.4.100 - 192.168.4.150...', 600))
        .then(() => addLog('Scanning Port 80 (HTTP)... [TIMEOUT]', 500))
        .then(() => addLog('Scanning Port 443 (HTTPS)... [TIMEOUT]', 500))
        .then(() => addLog('Scanning Port 22 (SSH)... [TIMEOUT]', 500))
        .then(() => addLog('Scanning Port 3389 (RDP)... [TIMEOUT]', 500))
        .then(() => addLog('--> 0 public entry points discovered.', 400))
        .then(() => addLog('--> Madhyam Stealth active: Server invisible to public internet.', 400))
        .then(() => setIsScanning(false));
    } else {
      addLog('// Initiating authorized connection...', 0)
        .then(() => addLog('Locating private stealth endpoint...', 500))
        .then(() => addLog('Validating user client cryptographic signature...', 600))
        .then(() => addLog('GeoBind verification: Approved from Location (India)...', 500))
        .then(() => addLog('Opening dynamic ephemeral tunnel...', 400))
        .then(() => addLog('Tunnel bound on Port 59302 (UDP). SSH session initialized...', 500))
        .then(() => addLog('--> CONNECTED! Welcome to your secure digital workspace.', 400))
        .then(() => setIsScanning(false));
    }
  };

  useEffect(() => {
    setScanLogs([]);
    setIsScanning(false);
  }, [mode]);

  return (
    <section className="py-16 bg-[#0a3525]/10 dark:bg-[#051c14]/40 border-y border-gray-150 dark:border-[#b5e245]/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-2.5 py-1 rounded bg-[#e29cc3]/10 text-[#e29cc3] text-[10px] font-semibold uppercase tracking-wider">Functional Live Demo</span>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">Stealth Network Simulator</h3>
          <p className="text-xs text-gray-500 mt-1">See how Madhyam Stealth hides your server from hackers while keeping it open for employees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="flex rounded-xl bg-gray-155 dark:bg-[#051c14]/80 p-1">
              <button
                onClick={() => setMode('hacker')}
                disabled={isScanning}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'hacker'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Unauthorized Hacker Scan
              </button>
              <button
                onClick={() => setMode('employee')}
                disabled={isScanning}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                  mode === 'employee'
                    ? 'bg-[#b5e245] text-[#051c14] shadow-md'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                Authorized Employee
              </button>
            </div>

            <div className="text-sm text-gray-650 dark:text-gray-300 leading-relaxed">
              {mode === 'hacker' ? (
                <p>
                  Hackers target your business by scanning public IP addresses for open ports (like HTTP, SSH, RDP). 
                  With <strong>Madhyam Stealth</strong>, your network ports do not show as closed; they show as <strong>Filtered (Invisible)</strong>. 
                  The server simply ignores scan packets entirely, giving hackers zero trace that it exists.
                </p>
              ) : (
                <p>
                  When an authorized employee requests access, the client validates their identity via 
                  cryptographic signatures. Once verified, a dynamic, ephemeral UDP connection is open 
                  just for their device, allowing instant and secure entry.
                </p>
              )}
            </div>

            <button
              onClick={runScan}
              disabled={isScanning}
              className={`w-full py-3 rounded-xl font-display font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isScanning
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                  : mode === 'hacker'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-[#b5e245] text-[#051c14] hover:bg-[#a4d134]'
              }`}
            >
              {isScanning ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  <span>Simulating...</span>
                </>
              ) : mode === 'hacker' ? (
                <span>Launch Port Scan</span>
              ) : (
                <span>Establish Stealth Tunnel</span>
              )}
            </button>
          </div>

          <div className="h-60 rounded-2xl border border-gray-200/80 dark:border-[#b5e245]/10 bg-gray-950 p-4 font-mono text-xs text-white overflow-hidden flex flex-col justify-between shadow-inner">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold">
              <div className={`w-1.5 h-1.5 rounded-full ${mode === 'hacker' ? 'bg-red-500' : 'bg-green-500'}`} />
              <span>{mode === 'hacker' ? 'HACKER WINDOW' : 'USER WINDOW'}</span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[170px] no-scrollbar">
              <p className="text-gray-500">// Shell ready.</p>
              {scanLogs.length === 0 && (
                <p className="text-gray-400">Click the button on the left to start the simulation...</p>
              )}
              {scanLogs.map((log, index) => (
                <p
                  key={index}
                  className={
                    log.includes('TIMEOUT') || log.includes('invisible')
                      ? 'text-red-400'
                      : log.includes('CONNECTED') || log.includes('Approved')
                      ? 'text-[#b5e245]'
                      : 'text-gray-300'
                  }
                >
                  {log}
                </p>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-2 flex justify-between items-center text-gray-500 text-[10px]">
              <span>Mode: {mode === 'hacker' ? 'WAN Port Scan' : 'Stealth UDP'}</span>
              <span>Invisible Node Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GeoSimulator() {
  const [city, setCity] = useState('Mumbai');
  const [time, setTime] = useState('Working Hours');
  const [role, setRole] = useState('Employee');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulateAccess = () => {
    setIsProcessing(true);
    setResult(null);

    setTimeout(() => {
      let status = 'APPROVED';
      let reason = 'Request aligns with location and schedule boundaries.';
      let isGeoAllowed = true;
      let isTimeAllowed = true;

      if (city === 'New York' || city === 'Sydney') {
        status = 'REJECTED';
        reason = `GeoBind: Client IP resolved to ${city}. This region is explicitly blacklisted.`;
        isGeoAllowed = false;
      }

      if (status === 'APPROVED' && time === 'Out of Hours' && role === 'Employee') {
        status = 'REJECTED';
        reason = 'Policy: Non-management users are restricted from connecting outside core hours.';
        isTimeAllowed = false;
      }

      setResult({ status, reason, isGeoAllowed, isTimeAllowed });
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-[#0a3525]/10 dark:bg-[#051c14]/40 border-y border-gray-150 dark:border-[#b5e245]/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-2.5 py-1 rounded bg-[#b5e245]/10 text-[#b5e245] text-[10px] font-semibold uppercase tracking-wider">Functional Live Demo</span>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">GeoBind 2.0 Access Simulator</h3>
          <p className="text-xs text-gray-500 mt-1">Simulate access attempts from different locations, roles, and times to see GeoBind in action.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={isProcessing}
                  className="w-full mt-1.5 p-2 rounded-lg border border-gray-200 dark:border-[#b5e245]/10 bg-white dark:bg-[#051c14] text-xs text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Mumbai">Mumbai (IN)</option>
                  <option value="Delhi">Delhi (IN)</option>
                  <option value="New York">New York (US)</option>
                  <option value="Sydney">Sydney (AU)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isProcessing}
                  className="w-full mt-1.5 p-2 rounded-lg border border-gray-200 dark:border-[#b5e245]/10 bg-white dark:bg-[#051c14] text-xs text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Working Hours">Working Hours</option>
                  <option value="Out of Hours">Out of Hours</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">User Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isProcessing}
                  className="w-full mt-1.5 p-2 rounded-lg border border-gray-200 dark:border-[#b5e245]/10 bg-white dark:bg-[#051c14] text-xs text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
            </div>

            <button
              onClick={simulateAccess}
              disabled={isProcessing}
              className="w-full py-3 bg-[#b5e245] hover:bg-[#a4d134] text-[#051c14] rounded-xl font-display font-semibold text-sm transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#051c14] border-t-transparent animate-spin" />
                  <span>Evaluating access parameters...</span>
                </>
              ) : (
                <span>Simulate Access Attempt</span>
              )}
            </button>
          </div>

          <div className="h-60 rounded-2xl border border-gray-200/80 dark:border-[#b5e245]/10 bg-gray-950 p-4 font-mono text-xs text-white overflow-hidden flex flex-col justify-between shadow-inner">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold">
              <div className={`w-1.5 h-1.5 rounded-full ${result ? (result.status === 'APPROVED' ? 'bg-green-500 animate-pulse' : 'bg-red-500') : 'bg-gray-500'}`} />
              <span>{result ? result.status : 'AWAITING EVALUATION'}</span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[170px] no-scrollbar">
              <p className="text-gray-500">// Policy engine initialized.</p>
              {!result && !isProcessing && (
                <p className="text-gray-400">Select parameters and click simulate...</p>
              )}
              {isProcessing && (
                <>
                  <p className="text-yellow-400 animate-pulse">Checking credentials: User ({role})</p>
                  <p className="text-gray-400">Analyzing GPS coordinates & IP resolver...</p>
                  <p className="text-gray-500">Checking time schedule filters...</p>
                </>
              )}
              {result && (
                <>
                  <p className="text-gray-300">Attempt by Role: <span className="text-white font-sans font-semibold">{role}</span></p>
                  <p className="text-gray-300">Location resolved: <span className="text-white font-sans font-semibold">{city}</span></p>
                  <p className="text-gray-300">Time window: <span className="text-white font-sans font-semibold">{time}</span></p>
                  <p className={result.isGeoAllowed ? 'text-green-400' : 'text-red-400'}>
                    [GeoCheck] {result.isGeoAllowed ? 'OK - Within geographic boundary' : 'FAIL - Geo-Lock Breach detected'}
                  </p>
                  <p className={result.isTimeAllowed ? 'text-green-400' : 'text-red-400'}>
                    [TimeCheck] {result.isTimeAllowed ? 'OK - Access schedule verified' : 'FAIL - Out of schedule boundaries'}
                  </p>
                  <p className={`mt-2 p-2 rounded text-[11px] font-sans border ${
                    result.status === 'APPROVED'
                      ? 'bg-green-500/10 text-[#b5e245] border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {result.reason}
                  </p>
                </>
              )}
            </div>

            <div className="border-t border-gray-800 pt-2 flex justify-between items-center text-gray-500 text-[10px]">
              <span>Engine: GeoBind 2.0</span>
              <span>Intelligent Policy Verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AISimulator() {
  const [task, setTask] = useState('Proposal');
  const [inputPrompt, setInputPrompt] = useState('Draft a CA advisory agreement for Rahul.');
  const [logs, setLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState('');

  const runAI = () => {
    setIsProcessing(true);
    setLogs([]);
    setOutput('');
    let currentLogs: string[] = [];

    const addLog = (log: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          currentLogs.push(log);
          setLogs([...currentLogs]);
          resolve();
        }, delay);
      });
    };

    addLog('// Initializing private AI request context...', 0)
      .then(() => addLog('Scanning payload for PII data (Names, Emails, Keys)...', 400))
      .then(() => addLog('Anonymizing sensitive word: "Rahul" -> "[CLIENT_A]"', 500))
      .then(() => addLog('Isolating network environment: Restricting WAN egress...', 500))
      .then(() => addLog('Routing query to private local model inference engine...', 500))
      .then(() => addLog('Model processing payload (temperature=0.3)...', 600))
      .then(() => addLog('Drafting completed. Restoring original local placeholders...', 400))
      .then(() => {
        setIsProcessing(false);
        setOutput(
          task === 'Proposal'
            ? 'Subject: CA Agreement - Rahul\n\nDear Rahul,\n\nWe are pleased to offer our CA advisory and auditing services to Rahul Enterprises. Our secure digital workspaces ensure that all financial audits are kept isolated and protected.'
            : 'Result: SECURITY AUDIT REPORT\n\n1. Found no external endpoints active.\n2. All variables bound to local memory interfaces.\n3. Encryption protocols verified.'
        );
      });
  };

  useEffect(() => {
    setInputPrompt(
      task === 'Proposal'
        ? 'Draft a CA advisory agreement for Rahul.'
        : 'Analyze the CA workflow file and suggest optimizations.'
    );
    setLogs([]);
    setOutput('');
  }, [task]);

  return (
    <section className="py-16 bg-[#0a3525]/10 dark:bg-[#051c14]/40 border-y border-gray-150 dark:border-[#b5e245]/5">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <span className="px-2.5 py-1 rounded bg-[#e29cc3]/10 text-[#e29cc3] text-[10px] font-semibold uppercase tracking-wider">Functional Live Demo</span>
          <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mt-3">Madhyam AI Suite Simulator</h3>
          <p className="text-xs text-gray-500 mt-1">See how our Private AI anonymizes and processes corporate requests securely without data leaks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Select Task</label>
              <div className="flex gap-2 mt-1.5">
                <button
                  onClick={() => setTask('Proposal')}
                  disabled={isProcessing}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    task === 'Proposal'
                      ? 'bg-[#b5e245]/15 border-[#b5e245] text-[#b5e245]'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500'
                  }`}
                >
                  Draft Client Proposal
                </button>
                <button
                  onClick={() => setTask('Audit')}
                  disabled={isProcessing}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    task === 'Audit'
                      ? 'bg-[#b5e245]/15 border-[#b5e245] text-[#b5e245]'
                      : 'border-gray-200 dark:border-gray-800 text-gray-500'
                  }`}
                >
                  Optimize Workflow
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Your Prompt</label>
              <textarea
                value={inputPrompt}
                onChange={(e) => !isProcessing && setInputPrompt(e.target.value)}
                disabled={isProcessing}
                className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 dark:border-[#b5e245]/10 bg-white dark:bg-[#051c14] text-xs text-gray-900 dark:text-white h-20 focus:outline-none focus:border-[#b5e245]"
              />
            </div>

            <button
              onClick={runAI}
              disabled={isProcessing}
              className="w-full py-3 bg-[#b5e245] hover:bg-[#a4d134] text-[#051c14] rounded-xl font-display font-semibold text-sm transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-[#051c14] border-t-transparent animate-spin" />
                  <span>Processing secure AI query...</span>
                </>
              ) : (
                <span>Submit Secure AI Request</span>
              )}
            </button>
          </div>

          <div className="h-60 rounded-2xl border border-gray-200/80 dark:border-[#b5e245]/10 bg-gray-950 p-4 font-mono text-xs text-white overflow-hidden flex flex-col justify-between shadow-inner">
            <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-semibold">
              <div className={`w-1.5 h-1.5 rounded-full ${output ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span>{output ? 'COMPLETED' : 'AWAITING RESPONSE'}</span>
            </div>

            <div className="space-y-1 overflow-y-auto max-h-[170px] no-scrollbar">
              <p className="text-gray-500">// AI Suite active.</p>
              {logs.length === 0 && (
                <p className="text-gray-400">Click submit to see private parsing workflow...</p>
              )}
              {logs.map((log, index) => (
                <p key={index} className="text-gray-400">{log}</p>
              ))}
              {output && (
                <div className="mt-2 p-2.5 rounded bg-white/5 border border-white/10 text-white font-sans text-[11px] whitespace-pre-line">
                  {output}
                </div>
              )}
            </div>

            <div className="border-t border-gray-800 pt-2 flex justify-between items-center text-gray-500 text-[10px]">
              <span>Inference: Local Private Llama-3</span>
              <span>PII Protection Engaged</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════════ */

type ProductId = 'overview' | 'vault' | 'stealth' | 'deviceless' | 'geo' | 'drp' | 'ai';

const PRODUCT_NAV: { id: ProductId; label: string; icon: any }[] = [
  { id: 'overview', label: 'All Products', icon: Layers },
  { id: 'vault', label: 'Vault', icon: Lock },
  { id: 'stealth', label: 'Stealth', icon: EyeOff },
  { id: 'deviceless', label: 'DeviceLESS', icon: Monitor },
  { id: 'geo', label: 'GeoBind 2.0', icon: MapPin },
  { id: 'drp', label: 'DRP', icon: RefreshCw },
  { id: 'ai', label: 'AI Suite', icon: Brain },
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

function PulsingDot({ color = '#b5e245', className = '' }: { color?: string; className?: string }) {
  return (
    <span className={`relative flex h-2 w-2 ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   SHARED SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════ */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border border-[#b5e245]/20 mb-8">
      <div className="w-1.5 h-1.5 rounded-full bg-[#b5e245]" />
      <span className="text-[11px] font-medium text-[#104f37] dark:text-[#b5e245] uppercase tracking-wider">{children}</span>
    </motion.div>
  );
}

function ProductHero({ badge, headline, highlight, description }: { badge: string; headline: string; highlight: string; description: string }) {
  return (
    <section className="relative pt-8 pb-20 md:pt-12 md:pb-28 overflow-hidden">
      <div className="absolute top-20 right-0 w-[45vw] h-[45vw] rounded-full bg-[#b5e245] opacity-[0.02] blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] rounded-full bg-[#e29cc3] opacity-[0.015] blur-[180px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <SectionBadge>{badge}</SectionBadge>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="text-4xl md:text-5xl lg:text-[58px] font-display font-bold leading-[1.08] tracking-tight text-gray-900 dark:text-white">
          {headline}<br /><span className="text-[#104f37] dark:text-[#b5e245]">{highlight}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease }} className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </motion.p>
      </div>
    </section>
  );
}

function ComparisonSection({ title, leftLabel, rightLabel, leftItems, rightItems }: { title: string; leftLabel: string; rightLabel: string; leftItems: string[]; rightItems: string[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">Comparison</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">{title}</h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeUp delay={0.1}>
            <div className="bg-gray-50 dark:bg-[#0a3525]/20 rounded-2xl p-7 border border-gray-100 dark:border-gray-800 h-full">
              <div className="flex items-center gap-2 mb-5">
                <XIcon className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">{leftLabel}</span>
              </div>
              <div className="space-y-2.5">{leftItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#051c14]/30 border border-gray-100 dark:border-gray-800">
                  <XIcon className="w-3.5 h-3.5 text-red-300 mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] text-gray-500 dark:text-gray-400">{item}</span>
                </div>
              ))}</div>
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="bg-[#b5e245]/5 dark:bg-[#b5e245]/[0.03] rounded-2xl p-7 border border-[#b5e245]/15 h-full">
              <div className="flex items-center gap-2 mb-5">
                <Check className="w-4 h-4 text-[#b5e245]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#b5e245]">{rightLabel}</span>
              </div>
              <div className="space-y-2.5">{rightItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#051c14]/20 border border-[#b5e245]/10">
                  <Check className="w-3.5 h-3.5 text-[#b5e245] mt-0.5 flex-shrink-0" />
                  <span className="text-[13px] text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}</div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function FeatureCards({ title, subtitle, features }: { title: string; subtitle?: string; features: { icon: any; title: string; desc: string }[] }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-14">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Capabilities</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{subtitle}</p>}
        </FadeUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => { const Icon = f.icon; return (
            <motion.div key={i} variants={staggerChild} className="group bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:-translate-y-0.5">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#051c14]/60 flex items-center justify-center mb-4 group-hover:bg-[#b5e245]/10 transition-colors"><Icon className="w-5 h-5 text-gray-400 group-hover:text-[#b5e245] transition-colors" /></div>
              <h4 className="font-display font-semibold text-[15px] text-gray-900 dark:text-white mb-2">{f.title}</h4>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ); })}
        </motion.div>
      </div>
    </section>
  );
}

function IndustryChips({ industries }: { industries: { icon: any; name: string }[] }) {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">Built For</p>
        <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white mb-8">Industries That Trust This Product</h2></FadeUp>
        <div className="flex flex-wrap justify-center gap-3">
          {industries.map((ind, i) => { const Icon = ind.icon; return (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white dark:bg-[#0a3525]/30 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all">
                <Icon className="w-4 h-4 text-[#b5e245]" /><span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">{ind.name}</span>
              </div>
            </FadeUp>
          ); })}
        </div>
      </div>
    </section>
  );
}

function WorkflowSteps({ steps }: { steps: { label: string; icon: any; desc?: string }[] }) {
  return (
    <FadeUp>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
        {steps.map((step, i) => { const Icon = step.icon; return (
          <div key={i} className="flex items-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.4 }}
              className="flex flex-col items-center text-center w-32 md:w-40"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b5e245]/10 to-[#e29cc3]/10 dark:from-[#b5e245]/5 dark:to-[#e29cc3]/5 border border-[#b5e245]/20 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-[#b5e245]" />
              </div>
              <p className="text-[13px] font-display font-semibold text-gray-900 dark:text-white">{step.label}</p>
              {step.desc && <p className="text-[11px] text-gray-400 mt-1">{step.desc}</p>}
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.2, duration: 0.3 }}
                className="hidden md:block w-12 h-px bg-gradient-to-r from-[#b5e245]/30 to-[#e29cc3]/30 origin-left" />
            )}
            {i < steps.length - 1 && (
              <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.2, duration: 0.3 }}
                className="md:hidden w-px h-8 bg-gradient-to-b from-[#b5e245]/30 to-[#e29cc3]/30 origin-top" />
            )}
          </div>
        ); })}
      </div>
    </FadeUp>
  );
}

function ProductCTA({ navigate }: { navigate: (p: ActivePage) => void }) {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gray-950 dark:bg-[#020d08]" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, #b5e245 35%, #e29cc3 65%, transparent 90%)' }} />
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#b5e245]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#e29cc3]/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <FadeUp><h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-[1.1]">Let{'\u2019'}s build a cloud<br /><span className="text-[#b5e245]">that fits your business.</span></h2></FadeUp>
        <FadeUp delay={0.15}><p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">Every conversation starts with understanding your business.</p></FadeUp>
        <FadeUp delay={0.3}><div className="flex flex-wrap justify-center gap-3 mt-10">
          <button onClick={() => navigate('contact')} className="px-8 py-4 bg-gradient-to-r from-[#b5e245] to-[#cbf263] text-[#051c14] font-display font-bold text-sm rounded-full hover:shadow-xl hover:shadow-[#b5e245]/20 transition-all duration-300 hover:-translate-y-px flex items-center gap-2">Talk To An Expert <ArrowRight className="w-4 h-4" /></button>
          <button onClick={() => navigate('contact')} className="px-8 py-4 bg-white/5 backdrop-blur text-white font-display font-semibold text-sm rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-px">Book Consultation</button>
        </div></FadeUp>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIVE DASHBOARD MOCK — Glassmorphism animated dashboard
   ═══════════════════════════════════════════════════════════ */

function LiveDashboard({ rows }: { rows: { label: string; status: string; color: string }[] }) {
  return (
    <FadeUp>
      <div className="max-w-2xl mx-auto bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 dark:border-[#b5e245]/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="ml-2 text-[10px] text-gray-400 font-mono">madhyam-dashboard</span>
        </div>
        <div className="p-4 space-y-2">
          {rows.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-[#051c14]/30 border border-gray-100/50 dark:border-[#b5e245]/5"
            >
              <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{row.label}</span>
              <div className="flex items-center gap-2">
                <PulsingDot color={row.color} />
                <span className="text-[11px] font-medium" style={{ color: row.color }}>{row.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

/* ═══════════════════════════════════════════════════════════
   OVERVIEW PAGE
   ═══════════════════════════════════════════════════════════ */

const PRODUCT_CARDS: { id: ProductId; icon: any; name: string; tagline: string; desc: string }[] = [
  { id: 'vault', icon: Lock, name: 'Madhyam Vault', tagline: 'Your protected business vault', desc: 'Military-grade encrypted storage with granular access controls, insider threat protection, and zero-knowledge architecture.' },
  { id: 'stealth', icon: EyeOff, name: 'Madhyam Stealth', tagline: 'Invisible infrastructure', desc: 'Your servers become invisible to the internet. Hackers cannot attack what they cannot find.' },
  { id: 'deviceless', icon: Monitor, name: 'Madhyam DeviceLESS Workspace', tagline: 'Your workspace, anywhere', desc: 'Carry your complete business environment without carrying a computer. Plug in and work.' },
  { id: 'geo', icon: MapPin, name: 'Madhyam GeoBind 2.0', tagline: 'AI-powered access intelligence', desc: 'Context-aware access decisions based on identity, device, location, behavior, risk score, and real-time analysis.' },
  { id: 'drp', icon: RefreshCw, name: 'Madhyam DRP', tagline: 'Instant data protection', desc: 'Critical data disappears on command. When safe, it returns exactly where it was. Your business time machine.' },
  { id: 'ai', icon: Brain, name: 'Madhyam AI Suite', tagline: 'Private AI for every department', desc: 'Every department gets its own AI assistant. All intelligence stays inside your infrastructure.' },
];

function OverviewPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  return (
    <div>
      <ProductHero badge="Product Ecosystem" headline="Six Products." highlight="One Unified Platform." description="Every product in the Madhyam ecosystem is designed to solve a specific business challenge. Use them together as a unified platform, or independently as standalone solutions." />

      {/* Product Cards Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_CARDS.map((product) => {
              const Icon = product.icon;
              return (
                <motion.div key={product.id} variants={staggerChild}
                  onClick={() => setProduct(product.id)}
                  className="group cursor-pointer bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b5e245]/5"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b5e245]/10 to-[#e29cc3]/10 dark:from-[#b5e245]/5 dark:to-[#e29cc3]/5 border border-[#b5e245]/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-[#b5e245]" />
                  </div>
                  <h3 className="font-display font-bold text-base text-gray-900 dark:text-white mb-1">{product.name}</h3>
                  <p className="text-[12px] text-[#b5e245] font-medium mb-3">{product.tagline}</p>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{product.desc}</p>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#104f37] dark:text-[#b5e245] group-hover:gap-2.5 transition-all">
                    <span>Explore</span><ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Visual */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp><h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Built to Work Together</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-12">Every Madhyam product strengthens the others. Vault protects data. Stealth hides infrastructure. DeviceLESS removes device risk. GeoBind controls access. DRP ensures recovery. AI amplifies productivity.</p></FadeUp>
          <LiveDashboard rows={[
            { label: 'Madhyam Vault', status: 'Encrypted', color: '#b5e245' },
            { label: 'Madhyam Stealth', status: 'Invisible', color: '#b5e245' },
            { label: 'Madhyam DeviceLESS', status: 'Active', color: '#b5e245' },
            { label: 'Madhyam GeoBind 2.0', status: 'Monitoring', color: '#e29cc3' },
            { label: 'Madhyam DRP', status: 'Protected', color: '#b5e245' },
            { label: 'Madhyam AI Suite', status: 'Online', color: '#e29cc3' },
          ]} />
        </div>
      </section>

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 1: MADHYAM VAULT
   ═══════════════════════════════════════════════════════════ */

function VaultPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const [activePermission, setActivePermission] = useState(0);
  const permissionLayers = [
    { label: 'User Permissions', desc: 'Who can access', icon: Users, color: '#b5e245' },
    { label: 'Department Permissions', desc: 'Which team', icon: Building2, color: '#89c73e' },
    { label: 'Folder Permissions', desc: 'Which folders', icon: Folder, color: '#e29cc3' },
    { label: 'Time-Based Permissions', desc: 'When', icon: Clock, color: '#d084b5' },
    { label: 'Geo-Based Permissions', desc: 'Where from', icon: MapPin, color: '#b5e245' },
    { label: 'MFA Required', desc: 'Verified identity', icon: Fingerprint, color: '#e29cc3' },
  ];

  useEffect(() => {
    const interval = setInterval(() => setActivePermission(p => (p + 1) % permissionLayers.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProductHero badge="Data Security" headline="Your most valuable business information" highlight="should never be accessible to everyone." description="Madhyam Vault is not cloud storage. It is a protected business vault with military-grade encryption, granular access controls, and zero-knowledge architecture." />

      {/* Interactive Vault Animation */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Access Control Matrix</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Six Layers of Permission Control</h2>
          </FadeUp>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {permissionLayers.map((layer, i) => {
                const Icon = layer.icon;
                const isActive = activePermission === i;
                return (
                  <motion.button key={i} onClick={() => setActivePermission(i)}
                    animate={{ scale: isActive ? 1.03 : 1, borderColor: isActive ? layer.color + '40' : 'transparent' }}
                    className={`relative p-4 rounded-xl text-left transition-all duration-300 border-2 ${isActive ? 'bg-white dark:bg-[#0a3525]/50 shadow-lg' : 'bg-white/50 dark:bg-[#0a3525]/20 hover:bg-white dark:hover:bg-[#0a3525]/40'}`}
                  >
                    {isActive && <motion.div layoutId="vault-active" className="absolute inset-0 rounded-xl border-2" style={{ borderColor: layer.color + '40' }} />}
                    <div className="relative flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: layer.color + '15' }}>
                        <Icon className="w-4 h-4" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-gray-900 dark:text-white">{layer.label}</p>
                        <p className="text-[10px] text-gray-400">{layer.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            {/* Live permission dashboard */}
            <LiveDashboard rows={[
              { label: 'Vault Status', status: 'Encrypted & Sealed', color: '#b5e245' },
              { label: permissionLayers[activePermission].label, status: 'Enforced', color: permissionLayers[activePermission].color },
              { label: 'Encryption', status: 'AES-256 Active', color: '#b5e245' },
              { label: 'Insider Threat Monitor', status: 'Watching', color: '#e29cc3' },
              { label: 'Audit Trail', status: 'Recording', color: '#b5e245' },
            ]} />
          </div>
        </div>
      </section>

      <EncryptionSimulator />

      {/* Why Vault Exists */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">The Problem</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">Most businesses store critical data in places anyone can access.</h2>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">Shared drives. Email attachments. Personal laptops. USB sticks. One careless click and your most sensitive business information is in the wrong hands. Madhyam Vault eliminates this risk entirely.</p>
          </FadeUp>
        </div>
      </section>

      <FeatureCards title="Everything Your Data Needs" subtitle="Built for businesses that take data protection seriously." features={[
        { icon: Lock, title: 'Secret Vaults', desc: 'Hidden storage areas only visible to authorized users. Even administrators cannot see vault contents without explicit permission.' },
        { icon: Eye, title: 'Granular Access Controls', desc: 'Define access by user, department, folder, time window, geographic location, and multi-factor authentication requirements.' },
        { icon: ShieldCheck, title: 'Zero Knowledge Architecture', desc: 'Even Madhyam engineers cannot access your vault contents. Your encryption keys are yours alone.' },
        { icon: Activity, title: 'Activity Monitoring', desc: 'Every file access, download, share, and modification is logged with timestamp, user identity, device, and location.' },
        { icon: AlertTriangle, title: 'Insider Threat Protection', desc: 'AI-powered behavioral analysis detects unusual access patterns and alerts administrators before data leaves your organization.' },
        { icon: Database, title: 'Military Grade Encryption', desc: 'AES-256 encryption at rest and in transit. The same standard used by governments and defense organizations worldwide.' },
      ]} />

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp className="mb-12"><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Architecture</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">How Madhyam Vault Protects Your Data</h2></FadeUp>
          <WorkflowSteps steps={[
            { label: 'Store', icon: Folder, desc: 'Data enters the vault' },
            { label: 'Encrypt', icon: Lock, desc: 'AES-256 encryption' },
            { label: 'Isolate', icon: Shield, desc: 'Permission boundaries' },
            { label: 'Monitor', icon: Eye, desc: 'Activity tracking' },
            { label: 'Audit', icon: FileText, desc: 'Complete history' },
          ]} />
        </div>
      </section>

      <IndustryChips industries={[
        { icon: Landmark, name: 'Finance' }, { icon: Scale, name: 'Legal' }, { icon: HeartPulse, name: 'Healthcare' },
        { icon: Factory, name: 'Manufacturing' }, { icon: GraduationCap, name: 'Education' }, { icon: Building2, name: 'Government' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 2: MADHYAM STEALTH
   ═══════════════════════════════════════════════════════════ */

function StealthPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const [scanPhase, setScanPhase] = useState<'scanning' | 'traditional' | 'stealth'>('scanning');

  useEffect(() => {
    const phases: typeof scanPhase[] = ['scanning', 'traditional', 'stealth'];
    let idx = 0;
    const interval = setInterval(() => { idx = (idx + 1) % 3; setScanPhase(phases[idx]); }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProductHero badge="Invisible Infrastructure" headline="Security through" highlight="invisibility." description="Traditional servers expose public IPs. Madhyam Stealth removes your entire digital footprint. Hackers cannot attack what they cannot find." />

      {/* Scanning Animation */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Live Demonstration</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">What Hackers See</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Server */}
            <FadeUp delay={0.1}>
              <div className="bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 dark:border-[#b5e245]/5">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" /><div className="w-2 h-2 rounded-full bg-yellow-400/60" /><div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-[10px] text-gray-400 font-mono">attacker-scan.sh</span>
                </div>
                <div className="p-4 font-mono text-[11px] space-y-1.5 min-h-[180px]">
                  <p className="text-gray-400">$ nmap target-traditional.com</p>
                  <motion.div animate={{ opacity: scanPhase !== 'scanning' ? 1 : [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: scanPhase === 'scanning' ? Infinity : 0 }}>
                    <p className="text-yellow-400">Scanning ports...</p>
                  </motion.div>
                  <AnimatePresence>
                    {scanPhase === 'traditional' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                        <p className="text-red-400">PORT 22 OPEN - SSH</p>
                        <p className="text-red-400">PORT 80 OPEN - HTTP</p>
                        <p className="text-red-400">PORT 443 OPEN - HTTPS</p>
                        <p className="text-red-400">PORT 3306 OPEN - MySQL</p>
                        <p className="text-red-300 mt-2">Server: Apache/2.4.41</p>
                        <p className="text-red-300">OS: Ubuntu 20.04</p>
                        <p className="text-red-500 font-bold mt-2">6 vulnerabilities found</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-[#b5e245]/5">
                  <span className="text-[10px] font-medium text-red-400 uppercase">Traditional Cloud — Exposed</span>
                </div>
              </div>
            </FadeUp>

            {/* Stealth Server */}
            <FadeUp delay={0.2}>
              <div className="bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 dark:border-[#b5e245]/5">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" /><div className="w-2 h-2 rounded-full bg-yellow-400/60" /><div className="w-2 h-2 rounded-full bg-green-400/60" />
                  <span className="ml-2 text-[10px] text-gray-400 font-mono">attacker-scan.sh</span>
                </div>
                <div className="p-4 font-mono text-[11px] space-y-1.5 min-h-[180px]">
                  <p className="text-gray-400">$ nmap target-stealth.com</p>
                  <motion.div animate={{ opacity: scanPhase !== 'scanning' ? 1 : [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: scanPhase === 'scanning' ? Infinity : 0 }}>
                    <p className="text-yellow-400">Scanning ports...</p>
                  </motion.div>
                  <AnimatePresence>
                    {scanPhase === 'stealth' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-1">
                        <p className="text-gray-600">No open ports detected</p>
                        <p className="text-gray-600">No services found</p>
                        <p className="text-gray-600">No OS fingerprint</p>
                        <p className="text-gray-600">No DNS records</p>
                        <p className="text-[#b5e245] font-bold mt-3">Target does not exist.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="px-4 py-2 border-t border-gray-100 dark:border-[#b5e245]/5 flex items-center gap-2">
                  <PulsingDot color="#b5e245" />
                  <span className="text-[10px] font-medium text-[#b5e245] uppercase">Madhyam Stealth — Invisible</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <StealthSimulator />

      {/* Why Stealth Exists */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">The Problem</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-6">Every traditional server broadcasts its existence to the entire internet.</h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">Public IPs, open ports, DNS records, service fingerprints. Attackers scan billions of addresses daily looking for these signals. Madhyam Stealth eliminates every signal. Your infrastructure becomes invisible.</p></FadeUp>
        </div>
      </section>

      <FeatureCards title="Complete Invisibility" features={[
        { icon: WifiOff, title: 'Zero Attack Surface', desc: 'No public IP addresses, no open ports, no exposed services. Nothing for attackers to discover or target.' },
        { icon: EyeOff, title: 'Hidden DNS', desc: 'Your infrastructure has no public DNS records. Standard reconnaissance tools return nothing.' },
        { icon: Network, title: 'Private Networking', desc: 'All communication happens through encrypted private tunnels. No traffic traverses the public internet.' },
        { icon: Shield, title: 'Anti-Reconnaissance', desc: 'Port scans, service detection, and OS fingerprinting all fail. Your infrastructure does not exist to outsiders.' },
        { icon: Lock, title: 'Encrypted Tunnels', desc: 'All authorized access passes through multi-layer encrypted channels with mutual authentication.' },
        { icon: ScanLine, title: 'Zero Footprint', desc: 'No digital traces, no server signatures, no metadata leaks. Complete infrastructure anonymity.' },
      ]} />

      <ComparisonSection title="Traditional Cloud vs Madhyam Stealth" leftLabel="Traditional Cloud" rightLabel="Madhyam Stealth"
        leftItems={['Public IP exposed to the internet', 'Open ports visible to scanners', 'DNS records publicly accessible', 'Server OS and version detectable', 'Attack surface grows with every service', 'Relies on firewalls after detection']}
        rightItems={['No public IP exists', 'Zero open ports to discover', 'No DNS records to find', 'No fingerprint possible', 'Zero attack surface always', 'Prevention through invisibility']}
      />

      <IndustryChips industries={[
        { icon: Landmark, name: 'Finance' }, { icon: Building2, name: 'Government' }, { icon: HeartPulse, name: 'Healthcare' },
        { icon: Scale, name: 'Legal' }, { icon: Factory, name: 'Manufacturing' }, { icon: Users, name: 'Enterprise' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 3: MADHYAM DEVICELESS WORKSPACE
   ═══════════════════════════════════════════════════════════ */

function DevicelessPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const [workflowStep, setWorkflowStep] = useState(0);
  const wfSteps = ['Authenticate', 'Workspace Loads', 'Applications Appear', 'Start Working'];

  useEffect(() => {
    const interval = setInterval(() => setWorkflowStep(s => (s + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProductHero badge="Device Freedom" headline="Your complete workspace." highlight="No computer required." description="Carry your entire business environment anywhere without carrying a computer. Simply connect through the secure Madhyam environment, and your full workspace appears instantly." />

      {/* Animated Workspace Loading */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">How It Works</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Plug In. Work. Walk Away.</h2>
          </FadeUp>
          <FadeUp>
            <div className="max-w-2xl mx-auto bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 dark:border-[#b5e245]/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] text-gray-400 font-mono">madhyam-workspace</span>
              </div>
              <div className="p-6 min-h-[220px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div key={workflowStep} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="text-center">
                    {workflowStep === 0 && <>
                      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 rounded-full border-2 border-[#b5e245]/30 border-t-[#b5e245] mx-auto mb-4" />
                      <p className="text-sm font-display font-semibold text-gray-900 dark:text-white">Authenticating...</p>
                      <p className="text-[11px] text-gray-400 mt-1">Verifying identity + device + location</p>
                    </>}
                    {workflowStep === 1 && <>
                      <div className="w-16 h-16 rounded-2xl bg-[#b5e245]/10 flex items-center justify-center mx-auto mb-4"><Monitor className="w-8 h-8 text-[#b5e245]" /></div>
                      <p className="text-sm font-display font-semibold text-gray-900 dark:text-white">Workspace Loading</p>
                      <p className="text-[11px] text-gray-400 mt-1">Your personalized environment is being prepared</p>
                      <div className="w-48 h-1 bg-gray-100 dark:bg-gray-800 rounded-full mt-3 mx-auto overflow-hidden"><motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1, repeat: Infinity }} className="w-1/2 h-full bg-[#b5e245] rounded-full" /></div>
                    </>}
                    {workflowStep === 2 && <>
                      <div className="flex gap-3 justify-center mb-4">
                        {[Mail, FileText, BarChart3, Settings].map((Icon, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="w-10 h-10 rounded-xl bg-[#b5e245]/10 flex items-center justify-center"><Icon className="w-5 h-5 text-[#b5e245]" /></motion.div>
                        ))}
                      </div>
                      <p className="text-sm font-display font-semibold text-gray-900 dark:text-white">Applications Ready</p>
                      <p className="text-[11px] text-gray-400 mt-1">Tally, ERP, Email, Office — all your tools</p>
                    </>}
                    {workflowStep === 3 && <>
                      <CheckCircle2 className="w-12 h-12 text-[#b5e245] mx-auto mb-4" />
                      <p className="text-sm font-display font-semibold text-[#b5e245]">You are working.</p>
                      <p className="text-[11px] text-gray-400 mt-1">Zero data on this device. Everything is in the cloud.</p>
                    </>}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="px-4 py-3 border-t border-gray-100 dark:border-[#b5e245]/5 flex justify-center gap-2">
                {wfSteps.map((s, i) => (<div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === workflowStep ? 'bg-[#b5e245]' : 'bg-gray-200 dark:bg-gray-700'}`} />))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <FeatureCards title="Work Without Boundaries" features={[
        { icon: Monitor, title: 'Plug and Work', desc: 'Connect from any authorized system. Your full workspace appears instantly — same desktop, same files, same applications.' },
        { icon: Folder, title: 'Zero Local Storage', desc: 'No files are ever stored on the host device. When you disconnect, nothing remains. Not a single byte.' },
        { icon: Globe, title: 'Same Workspace Everywhere', desc: 'Your workspace looks and feels identical whether you connect from the office, home, a hotel, or a client site.' },
        { icon: Zap, title: 'Instant Deployment', desc: 'New employee? Their full workspace is ready in minutes. No laptop procurement, no software installation, no IT setup.' },
        { icon: Settings, title: 'Centralized Management', desc: 'Every workspace is managed from a single dashboard. Deploy updates, change policies, and control access — all centrally.' },
        { icon: Lock, title: 'Secure Sessions', desc: 'Every connection is encrypted, authenticated, and isolated. Session hijacking and man-in-the-middle attacks are impossible.' },
      ]} />

      <ComparisonSection title="Traditional Laptop vs DeviceLESS Workspace" leftLabel="Traditional Laptop" rightLabel="Madhyam DeviceLESS"
        leftItems={['Data stored on every device', 'Lost laptop = data breach', 'Software installation required', 'IT setup takes days per device', 'Different environment on each device', 'Hardware failure stops work']}
        rightItems={['Zero data on any device', 'Lost device = zero risk', 'No installations needed', 'New workspace in minutes', 'Identical environment everywhere', 'Switch device and continue working']}
      />

      <IndustryChips industries={[
        { icon: Factory, name: 'Manufacturing' }, { icon: HeartPulse, name: 'Healthcare' }, { icon: GraduationCap, name: 'Education' },
        { icon: HardHat, name: 'Construction' }, { icon: ShoppingBag, name: 'Retail' }, { icon: UtensilsCrossed, name: 'Hospitality' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 4: MADHYAM GEOBIND 2.0
   ═══════════════════════════════════════════════════════════ */

function GeoPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const contextFactors = [
    { icon: Users, label: 'Identity', desc: 'Who is requesting access', active: true },
    { icon: Smartphone, label: 'Device', desc: 'What device they are using', active: true },
    { icon: MapPin, label: 'Location', desc: 'Where they are connecting from', active: true },
    { icon: Activity, label: 'Behavior', desc: 'Is this normal for this user', active: true },
    { icon: Clock, label: 'Time', desc: 'When are they accessing', active: false },
    { icon: BarChart3, label: 'Risk Score', desc: 'Real-time threat assessment', active: false },
    { icon: FileText, label: 'Access History', desc: 'Past access patterns', active: false },
    { icon: Target, label: 'Context', desc: 'What they are trying to access', active: false },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveIdx(i => (i + 1) % contextFactors.length), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProductHero badge="AI-Powered Access Intelligence" headline="Access decisions powered by" highlight="real-time AI." description="Madhyam GeoBind 2.0 is not simple IP restriction. It is an AI-powered intelligent access verification system that considers identity, device, location, behavior, time, history, risk score, and context — in real time." />

      {/* Context Factor Animation */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Decision Engine</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Eight Factors. One Instant Decision.</h2>
          </FadeUp>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {contextFactors.map((f, i) => {
                const Icon = f.icon;
                const isActive = activeIdx === i;
                return (
                  <motion.div key={i} animate={{ scale: isActive ? 1.05 : 1 }}
                    className={`p-4 rounded-xl text-center transition-all duration-300 border ${isActive ? 'bg-[#b5e245]/10 dark:bg-[#b5e245]/5 border-[#b5e245]/30 shadow-lg' : 'bg-white dark:bg-[#0a3525]/20 border-gray-100 dark:border-[#b5e245]/5'}`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-2 transition-colors ${isActive ? 'text-[#b5e245]' : 'text-gray-400'}`} />
                    <p className={`text-[11px] font-semibold ${isActive ? 'text-[#b5e245]' : 'text-gray-600 dark:text-gray-300'}`}>{f.label}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <LiveDashboard rows={[
              { label: 'Access Request', status: 'Analyzing', color: '#e29cc3' },
              { label: contextFactors[activeIdx].label, status: 'Evaluating', color: '#b5e245' },
              { label: 'Risk Score', status: 'Low — 12/100', color: '#b5e245' },
              { label: 'Decision', status: 'Access Granted', color: '#b5e245' },
            ]} />
          </div>
        </div>
      </section>

      <GeoSimulator />

      <FeatureCards title="Intelligent Access Control" features={[
        { icon: Brain, title: 'Behavior Analysis', desc: 'AI learns normal patterns for every user. Unusual behavior triggers verification or blocks access automatically.' },
        { icon: BarChart3, title: 'Risk Scoring', desc: 'Every access request receives a real-time risk score based on all context factors combined.' },
        { icon: MapPin, title: 'Location Intelligence', desc: 'Go beyond IP addresses. Understand physical location, VPN detection, and impossible travel scenarios.' },
        { icon: Settings, title: 'Adaptive Policies', desc: 'Security policies adjust automatically based on risk level. Low risk = seamless access. High risk = additional verification.' },
        { icon: Globe, title: 'Travel Detection', desc: 'When legitimate employees travel, GeoBind recognizes the pattern and adjusts access policies accordingly.' },
        { icon: AlertTriangle, title: 'Suspicious Login Detection', desc: 'Impossible travel, unusual devices, odd timing — all detected and challenged in real-time.' },
      ]} />

      <ComparisonSection title="Static IP Restriction vs GeoBind 2.0" leftLabel="Static IP Restriction" rightLabel="Madhyam GeoBind 2.0"
        leftItems={['Only checks IP address', 'VPN bypasses all controls', 'No behavioral analysis', 'No risk assessment', 'Blocks legitimate travelers', 'All-or-nothing access']}
        rightItems={['Checks 8 context factors simultaneously', 'Detects and blocks VPN evasion', 'AI-powered behavioral analysis', 'Real-time risk scoring', 'Smart travel detection', 'Adaptive, risk-based decisions']}
      />

      <IndustryChips industries={[
        { icon: Landmark, name: 'Finance' }, { icon: Scale, name: 'Legal' }, { icon: Building2, name: 'Government' },
        { icon: Users, name: 'Enterprise' }, { icon: HeartPulse, name: 'Healthcare' }, { icon: Factory, name: 'Manufacturing' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 5: MADHYAM DRP (Data Recovery Protocol)
   ═══════════════════════════════════════════════════════════ */

function DRPPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const [drpMode, setDrpMode] = useState<'idle' | 'protect' | 'hidden' | 'retrieve' | 'restored'>('idle');

  const triggerProtect = () => {
    setDrpMode('protect');
    setTimeout(() => setDrpMode('hidden'), 1500);
  };

  const triggerRetrieve = () => {
    setDrpMode('retrieve');
    setTimeout(() => setDrpMode('restored'), 1500);
    setTimeout(() => setDrpMode('idle'), 4000);
  };

  return (
    <div>
      <ProductHero badge="Data Recovery Protocol" headline="Critical data disappears on command." highlight="Returns when you need it." description="Madhyam DRP is not backup software. It is not disaster recovery. It is an instant business protection mechanism. Think of it as a time machine for your most critical business data." />

      {/* Interactive Protect/Retrieve Demo */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Live Demonstration</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">One Button. Instant Protection.</h2>
          </FadeUp>
          <FadeUp>
            <div className="bg-white/60 dark:bg-[#0a3525]/40 backdrop-blur-2xl rounded-2xl border border-gray-200/60 dark:border-[#b5e245]/10 shadow-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-100 dark:border-[#b5e245]/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] text-gray-400 font-mono">madhyam-drp-console</span>
              </div>
              <div className="p-6 min-h-[280px]">
                {/* File System View */}
                <div className="space-y-2 mb-6">
                  <p className="text-[10px] font-mono text-gray-400 mb-3">BUSINESS FILES</p>
                  {['Financial Reports 2024', 'Client Contracts', 'Strategic Plans', 'Employee Records', 'Board Minutes'].map((file, i) => (
                    <motion.div key={i}
                      animate={{
                        opacity: drpMode === 'hidden' || drpMode === 'retrieve' ? (i < 3 ? 0 : 1) : 1,
                        x: drpMode === 'hidden' || drpMode === 'retrieve' ? (i < 3 ? -20 : 0) : 0,
                        height: drpMode === 'hidden' || drpMode === 'retrieve' ? (i < 3 ? 0 : 'auto') : 'auto',
                      }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-[#051c14]/30 border border-gray-100/50 dark:border-[#b5e245]/5 overflow-hidden"
                    >
                      <Folder className={`w-4 h-4 flex-shrink-0 ${i < 3 ? 'text-[#e29cc3]' : 'text-gray-400'}`} />
                      <span className="text-[12px] font-medium text-gray-700 dark:text-gray-300">{file}</span>
                      {i < 3 && <span className="ml-auto text-[9px] px-2 py-0.5 rounded-full bg-[#e29cc3]/10 text-[#e29cc3] font-bold">CRITICAL</span>}
                    </motion.div>
                  ))}
                </div>

                {/* Status + Controls */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#051c14]/40 border border-gray-100 dark:border-[#b5e245]/5">
                  <div className="flex items-center gap-2">
                    <PulsingDot color={drpMode === 'hidden' ? '#e29cc3' : drpMode === 'restored' ? '#b5e245' : '#888'} />
                    <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">
                      {drpMode === 'idle' && 'DRP Ready'}
                      {drpMode === 'protect' && 'Protecting...'}
                      {drpMode === 'hidden' && 'Critical files hidden'}
                      {drpMode === 'retrieve' && 'Retrieving...'}
                      {drpMode === 'restored' && 'All files restored'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={triggerProtect} disabled={drpMode !== 'idle'} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-[#e29cc3]/10 text-[#e29cc3] hover:bg-[#e29cc3]/20 disabled:opacity-30 transition-all uppercase tracking-wider">Protect</button>
                    <button onClick={triggerRetrieve} disabled={drpMode !== 'hidden'} className="px-3 py-1.5 rounded-lg text-[10px] font-bold bg-[#b5e245]/10 text-[#b5e245] hover:bg-[#b5e245]/20 disabled:opacity-30 transition-all uppercase tracking-wider">Retrieve</button>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How DRP Works */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp className="mb-12"><p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Workflow</p>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Protect. Hide. Retrieve. Restore.</h2></FadeUp>
          <WorkflowSteps steps={[
            { label: 'Threat Detected', icon: AlertTriangle, desc: 'Or manually triggered' },
            { label: 'Press Protect', icon: Shield, desc: 'One-button operation' },
            { label: 'Data Disappears', icon: EyeOff, desc: 'Zero digital footprint' },
            { label: 'Threat Passes', icon: Clock, desc: 'Business continues' },
            { label: 'Press Retrieve', icon: RefreshCw, desc: 'Everything returns' },
          ]} />
        </div>
      </section>

      <FeatureCards title="Instant Business Protection" features={[
        { icon: Shield, title: 'Protect Mode', desc: 'One button press and critical folders instantly disappear from all visibility. No trace remains anywhere.' },
        { icon: RefreshCw, title: 'Retrieve Mode', desc: 'When the threat passes, press retrieve. Every file returns exactly where it was, exactly as it was.' },
        { icon: Smartphone, title: 'Mobile Control', desc: 'Protect and retrieve from anywhere using your authorized mobile device. Emergency protection from any location.' },
        { icon: Zap, title: 'Instant Operation', desc: 'Protection happens in seconds, not minutes. There is no delay between pressing the button and your data disappearing.' },
        { icon: EyeOff, title: 'Zero Digital Footprint', desc: 'When protected, there is no trace that the data ever existed. No file remnants, no metadata, no recovery artifacts.' },
        { icon: CheckCircle2, title: 'Business Continuity', desc: 'Non-critical operations continue normally while protected data is hidden. Your business never stops.' },
      ]} />

      <IndustryChips industries={[
        { icon: Landmark, name: 'Finance' }, { icon: Scale, name: 'Legal' }, { icon: Building2, name: 'Government' },
        { icon: HeartPulse, name: 'Healthcare' }, { icon: Factory, name: 'Manufacturing' }, { icon: Users, name: 'Enterprise' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT 6: MADHYAM AI SUITE
   ═══════════════════════════════════════════════════════════ */

function AIPage({ navigate, setProduct }: { navigate: (p: ActivePage) => void; setProduct: (id: ProductId) => void }) {
  const departments = [
    { icon: TrendingUp, name: 'Marketing AI', desc: 'Campaign analysis, content strategy, competitor intelligence, brand monitoring — all from your internal data.', color: '#b5e245' },
    { icon: Briefcase, name: 'Sales AI', desc: 'Proposal generation, CRM assistance, lead scoring, pipeline forecasting — powered by your actual sales history.', color: '#b5e245' },
    { icon: Users, name: 'HR AI', desc: 'Resume screening, policy questions, onboarding automation, employee satisfaction analysis — fully internal.', color: '#e29cc3' },
    { icon: Landmark, name: 'Finance AI', desc: 'Invoice processing, expense analysis, financial reporting, budget forecasting — from your actual financial data.', color: '#e29cc3' },
    { icon: Scale, name: 'Legal AI', desc: 'Contract review, compliance checking, legal research, clause extraction — using only your approved legal documents.', color: '#b5e245' },
    { icon: Settings, name: 'Operations AI', desc: 'Process optimization, supply chain analysis, quality monitoring, resource planning — from your operational data.', color: '#e29cc3' },
  ];

  const [activeDept, setActiveDept] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveDept(i => (i + 1) % departments.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ProductHero badge="Private Enterprise AI" headline="Your Entire Business." highlight="Powered by Private AI." description="Every department receives its own AI assistant that operates entirely inside your Madhyam infrastructure. No company data ever leaves your organization." />

      {/* Department AI Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#b5e245] mb-4">Department Intelligence</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">One AI For Every Department</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Each AI only accesses information it has permission to use. Marketing AI cannot see HR data. Finance AI cannot access legal documents.</p>
          </FadeUp>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerParent} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept, i) => {
              const Icon = dept.icon;
              const isActive = activeDept === i;
              return (
                <motion.div key={i} variants={staggerChild} onClick={() => setActiveDept(i)}
                  className={`group cursor-pointer bg-white dark:bg-[#0a3525]/30 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5 ${isActive ? 'border-[#b5e245]/30 shadow-lg shadow-[#b5e245]/5' : 'border-gray-100 dark:border-[#b5e245]/5 hover:border-[#b5e245]/20'}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: dept.color + '15' }}>
                      <Icon className="w-5 h-5" style={{ color: dept.color }} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-[14px] text-gray-900 dark:text-white">{dept.name}</h4>
                      {isActive && <PulsingDot color={dept.color} className="mt-1" />}
                    </div>
                  </div>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed">{dept.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <AISimulator />

      {/* Private AI Workflow */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e29cc3] mb-4">How Private AI Works</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">Your Data Never Leaves Your Infrastructure</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The RIGHT way */}
            <FadeUp delay={0.1}>
              <div className="bg-[#b5e245]/5 dark:bg-[#b5e245]/[0.03] rounded-2xl p-6 border border-[#b5e245]/15">
                <div className="flex items-center gap-2 mb-5"><Check className="w-4 h-4 text-[#b5e245]" /><span className="text-xs font-bold uppercase tracking-wider text-[#b5e245]">Madhyam AI</span></div>
                <div className="space-y-3">
                  {['Employee asks a question', 'Request goes to Private AI', 'AI searches Company Knowledge', 'AI checks Company Permissions', 'Response stays inside infrastructure'].map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#051c14]/20 border border-[#b5e245]/10"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#b5e245]/20 flex items-center justify-center text-[10px] font-bold text-[#b5e245]">{i + 1}</div>
                      <span className="text-[12px] text-gray-700 dark:text-gray-300">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* The WRONG way */}
            <FadeUp delay={0.2}>
              <div className="bg-gray-50 dark:bg-[#0a3525]/20 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-5"><XIcon className="w-4 h-4 text-red-400" /><span className="text-xs font-bold uppercase tracking-wider text-red-400">Public AI</span></div>
                <div className="space-y-3">
                  {['Employee asks a question', 'Data sent to the internet', 'Unknown AI processes it', 'Data stored on foreign servers', 'Business intelligence leaked'].map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-[#051c14]/30 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="w-6 h-6 rounded-full bg-red-400/10 flex items-center justify-center text-[10px] font-bold text-red-400">{i + 1}</div>
                      <span className="text-[12px] text-gray-500 dark:text-gray-400">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <FeatureCards title="Enterprise AI Capabilities" subtitle="Every capability runs inside your secure Madhyam infrastructure." features={[
        { icon: Lock, title: 'Private AI', desc: 'All AI processing happens inside your infrastructure. No data is ever sent to external AI providers or the public internet.' },
        { icon: Users, title: 'Role-Based AI', desc: 'Each department gets AI access limited to their authorized data. Marketing AI cannot see HR data. Finance AI cannot access legal documents.' },
        { icon: BookOpen, title: 'Document Intelligence', desc: 'AI reads and understands your business documents — contracts, policies, reports — and provides instant answers.' },
        { icon: Zap, title: 'Workflow Automation', desc: 'Automate repetitive processes across departments. Invoice processing, report generation, data entry — handled by AI.' },
        { icon: MessageSquare, title: 'Meeting Summaries', desc: 'AI captures meeting notes, action items, and decisions. Everyone stays aligned without manual note-taking.' },
        { icon: PenTool, title: 'Content Creation', desc: 'Proposals, presentations, reports, emails — AI drafts content using your business context and brand voice.' },
        { icon: Search, title: 'Internal Search', desc: 'Find anything across your entire organization in seconds. AI understands context, not just keywords.' },
        { icon: Database, title: 'Knowledge Base', desc: 'AI builds and maintains an intelligent knowledge base from your documents, processes, and institutional knowledge.' },
        { icon: BarChart3, title: 'Business Intelligence', desc: 'Ask questions about your business in plain language and get instant answers backed by your actual data.' },
      ]} />

      <ComparisonSection title="Public AI vs Madhyam AI" leftLabel="Public AI" rightLabel="Madhyam AI"
        leftItems={['Business data sent to external servers', 'Data used to train AI models', 'No access control over AI usage', 'Compliance violations risk', 'Generic responses without business context', 'Company intelligence leaked']}
        rightItems={['All data stays inside your infrastructure', 'Your data never trains any external model', 'Department-level AI access controls', 'Full compliance with data regulations', 'Responses powered by your actual business data', 'Complete data sovereignty maintained']}
      />

      <IndustryChips industries={[
        { icon: Scale, name: 'Legal' }, { icon: Landmark, name: 'Finance' }, { icon: HeartPulse, name: 'Healthcare' },
        { icon: Factory, name: 'Manufacturing' }, { icon: GraduationCap, name: 'Education' }, { icon: Users, name: 'Enterprise' },
        { icon: ShoppingBag, name: 'Retail' }, { icon: Building2, name: 'Government' },
      ]} />

      <ProductCTA navigate={navigate} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PRODUCTS VIEW — Tab Navigation + Active Page
   ═══════════════════════════════════════════════════════════ */

// Map URL-friendly slugs to internal ProductIds
const SLUG_TO_PRODUCT: Record<string, ProductId> = {
  vault: 'vault',
  stealth: 'stealth',
  'deviceless-workspace': 'deviceless',
  deviceless: 'deviceless',
  geobind: 'geo',
  geo: 'geo',
  drp: 'drp',
  'ai-suite': 'ai',
  ai: 'ai',
};

export default function ProductsView({ setActivePage, initialProduct }: { setActivePage: (page: ActivePage, subRoute?: string) => void; initialProduct?: string }) {
  const [activeProduct, setActiveProduct] = useState<ProductId>(() => {
    if (initialProduct && SLUG_TO_PRODUCT[initialProduct]) return SLUG_TO_PRODUCT[initialProduct];
    return 'overview';
  });
  const navigate = (page: ActivePage, subRoute?: string) => setActivePage(page, subRoute);

  // Sync with initialProduct prop when it changes (e.g., from navbar navigation)
  useEffect(() => {
    if (initialProduct && SLUG_TO_PRODUCT[initialProduct]) {
      setActiveProduct(SLUG_TO_PRODUCT[initialProduct]);
    }
  }, [initialProduct]);

  // Scroll to top when switching products
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeProduct]);

  const renderProduct = () => {
    switch (activeProduct) {
      case 'overview': return <OverviewPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'vault': return <VaultPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'stealth': return <StealthPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'deviceless': return <DevicelessPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'geo': return <GeoPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'drp': return <DRPPage navigate={navigate} setProduct={setActiveProduct} />;
      case 'ai': return <AIPage navigate={navigate} setProduct={setActiveProduct} />;
    }
  };

  return (
    <div className="w-full relative flex flex-col lg:flex-row min-h-screen">
      {/* Product Sub-Navigation — Sidebar on Desktop, Horizontal Swiper on Mobile */}
      <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-[#b5e245]/5 bg-white/85 dark:bg-[#051c14]/85 backdrop-blur-2xl p-2 lg:p-4 z-20 no-scrollbar">
        <div className="max-w-7xl mx-auto lg:mx-0 px-4 sm:px-6 lg:px-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 py-1 lg:py-0">
            {PRODUCT_NAV.map(prod => {
              const Icon = prod.icon;
              const isActive = activeProduct === prod.id;
              return (
                <button
                  key={prod.id}
                  onClick={() => setActiveProduct(prod.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-[13px] font-medium whitespace-nowrap rounded-xl transition-all duration-200 w-full text-left ${
                    isActive
                      ? 'text-[#104f37] dark:text-[#b5e245] bg-[#b5e245]/10 border border-[#b5e245]/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#0a3525]/30 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{prod.label}</span>
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
            key={activeProduct}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderProduct()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

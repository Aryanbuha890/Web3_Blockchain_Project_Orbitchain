import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Rocket, Wallet, Globe, Zap, Cpu, Radar, ArrowUpRight,
  ShieldCheck, Gauge, Layers, PlayCircle, Bot, Trophy, Coins,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Starfield } from "@/components/Starfield";
import { StatCounter } from "@/components/StatCounter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrbitChain — Mission Control for the Interplanetary Web3 Economy" },
      { name: "description", content: "OrbitChain is the visualization and monitoring layer for a decentralized, interplanetary financial network built on Ethereum and Arbitrum." },
      { property: "og:title", content: "OrbitChain — Mission Control for Web3" },
      { property: "og:description", content: "Monitor validators, mine blocks, and track markets across every colony." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionHQ,
});

const faqData = [
  {
    question: "What is OrbitChain?",
    answer: "OrbitChain is a real-time visualization and monitoring telemetry surface for interplanetary and terrestrial Web3 networks, integrating consensus state trackers, ledger validations, and market exchange rates."
  },
  {
    question: "How does the browser-based Mining Reactor simulation work?",
    answer: "The Mining Reactor utilizes the Web Crypto API to compute real SHA-256 hashes inside your browser. You can configure difficulty thresholds (e.g. difficulty 000 requiring three leading zeros), iterate nonces, and witness how altering block records breaks downstream block consensus in real-time."
  },
  {
    question: "Why unifies Ethereum L1 and Arbitrum L2?",
    answer: "Ethereum mainnet acts as a highly secure, decentralized settlement layer where blocks are cryptographically finalized. Arbitrum, an optimistic rollup, groups thousands of off-chain transactions, executes them at lightning speeds (~250ms soft finality) and posts compression proofs back to Ethereum, giving L1 security at fractional costs."
  },
  {
    question: "Are off-world validators simulated in the galaxy map?",
    answer: "Yes, the Galaxy Explorer simulates network parameters across orbital anchors, lunar hubs, and martian colonies, showcasing the effects of astronomical latency (up to several minutes of light-speed travel delay) on interplanetary transactions and block synchronization."
  }
];

function MissionHQ() {
  const [wordIdx, setWordIdx] = useState(0);
  const rotatingWords = [
    { text: "Web3 Economy", gradient: "from-cyan-400 to-blue-500 dark:from-cyan-300 dark:to-blue-400" },
    { text: "Ethereum L1", gradient: "from-emerald-400 to-cyan-500 dark:from-emerald-300 dark:to-cyan-400" },
    { text: "Arbitrum L2", gradient: "from-blue-400 to-indigo-600 dark:from-blue-300 dark:to-indigo-400" },
    { text: "Solana Node", gradient: "from-violet-400 to-indigo-500 dark:from-violet-300 dark:to-indigo-400" },
    { text: "Cosmic Telemetry", gradient: "from-cyan-400 to-indigo-500 dark:from-cyan-300 dark:to-indigo-400" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16 flex flex-col items-center min-h-[90vh] justify-center bg-gradient-to-b from-background via-background to-background/50">
        <Starfield />

        {/* Rotating Futuristic HUD concentric rings backdrop */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.08] pointer-events-none select-none z-0">
          <svg className="w-full h-full text-primary" viewBox="0 0 200 200" fill="none" stroke="currentColor">
            {/* Outer dotted ring */}
            <circle cx="100" cy="100" r="95" strokeWidth="0.35" strokeDasharray="1.5 3" className="hud-rotate-cw origin-center" />
            {/* Outer dashed ring */}
            <circle cx="100" cy="100" r="85" strokeWidth="0.5" strokeDasharray="8 12" className="hud-rotate-ccw origin-center" />
            {/* Middle telemetry rings */}
            <circle cx="100" cy="100" r="70" strokeWidth="0.35" strokeDasharray="30 6" className="hud-rotate-cw origin-center" />
            <circle cx="100" cy="100" r="58" strokeWidth="0.35" strokeDasharray="1 5" className="hud-rotate-ccw origin-center" />
            <circle cx="100" cy="100" r="42" strokeWidth="0.25" strokeDasharray="15 3" className="hud-rotate-cw origin-center" />
            {/* Inner target cross */}
            <line x1="100" y1="15" x2="100" y2="35" strokeWidth="0.35" />
            <line x1="100" y1="165" x2="100" y2="185" strokeWidth="0.35" />
            <line x1="15" y1="100" x2="35" y2="100" strokeWidth="0.35" />
            <line x1="165" y1="100" x2="185" y2="100" strokeWidth="0.35" />
          </svg>
        </div>

        {/* Scanlines & Grid overlays */}
        <div className="absolute inset-0 opacity-[0.04] cyber-grid-overlay pointer-events-none z-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay cyber-scanlines z-0" />

        {/* Ambient backglows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[720px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-[0.14] blur-3xl z-0" />
        <div className="pointer-events-none absolute top-40 -left-32 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--color-secondary),transparent)] opacity-[0.09] blur-3xl z-0" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-[450px] w-[450px] rounded-full bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-[0.06] blur-3xl z-0" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center flex flex-col items-center"
          >
            {/* Status indicator badge */}
            <div 
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold text-primary tracking-[0.15em] uppercase backdrop-blur shadow-sm select-none"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(22,163,74,0.8)]" />
              Network Status: Nominal · 12 colonies connected
            </div>

            {/* Rotating gradient heading */}
            <h1 
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              className="mt-8 text-4xl font-black leading-[1.08] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[80px] text-foreground uppercase"
            >
              Mission control for the
              <br />
              <span className="relative inline-flex items-center justify-center w-full h-[48px] sm:h-[68px] md:h-[78px] lg:h-[88px] overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ y: 24, opacity: 0, filter: "blur(6px)", rotateX: -70 }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)", rotateX: 0 }}
                    exit={{ y: -24, opacity: 0, filter: "blur(6px)", rotateX: 70 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: "bottom center",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    className={`absolute bg-clip-text text-transparent bg-gradient-to-r ${rotatingWords[wordIdx].gradient} font-black pb-2`}
                  >
                    {rotatingWords[wordIdx].text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Description using Outfit font for high premium feel */}
            <p 
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="mx-auto mt-8 max-w-2xl text-base sm:text-[17px] text-muted-foreground leading-relaxed font-light"
            >
              OrbitChain unifies Ethereum settlement, Arbitrum throughput, and off-world nodes
              into a single telemetry surface. Watch every block, every trade, every colony —
              in real time.
            </p>

            {/* Action buttons (Liquid and Space styles) */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Link to="/mission-control" className="btn-liquid">
                <span className="btn-liquid-inner">
                  <span className="liquid" />
                  <span className="bubble bubble-1" />
                  <span className="bubble bubble-2" />
                  <span className="bubble bubble-3" />
                  <span className="btn-liquid-txt">
                    <span className="boat-container">
                      <Rocket className="h-4.5 w-4.5 text-primary" />
                    </span>
                    Launch Mission
                    <ArrowRight className="h-4 w-4 shrink-0 relative z-10" />
                  </span>
                </span>
              </Link>

              <Link to="/galaxy" className="btn-space">
                <span className="btn-space-inner">
                  <span className="btn-space-strong">
                    <PlayCircle className="h-4.5 w-4.5 shrink-0" />
                    Explore Galaxy
                  </span>
                  <div id="container-stars">
                    <div id="stars" />
                  </div>
                  <div id="glow">
                    <div className="circle" />
                    <div className="circle" />
                  </div>
                </span>
              </Link>
            </div>

            {/* HUD Status Widgets */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
              {/* System Pulse Widget */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-4 flex items-center justify-between backdrop-blur transition-all duration-300 hover:border-success/30 hover:bg-card/60 hover:shadow-lg hover:-translate-y-0.5 select-none cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center h-9 w-9 rounded-xl bg-success/10 border border-success/20 text-success">
                    <span className="absolute flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                    </span>
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-muted-foreground uppercase">TELEMETRY // ORB</div>
                    <div className="text-xs font-semibold font-mono text-foreground tracking-wide mt-0.5 uppercase">PULSE: ACTIVE</div>
                  </div>
                </div>
                {/* Waveform Ticker */}
                <div className="flex items-end gap-0.5 h-6 select-none">
                  {[4, 12, 6, 16, 8, 4].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-success/70 rounded-full animate-pulse"
                      style={{
                        height: `${h}px`,
                        animationDuration: `${0.8 + i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Validator Mesh Widget */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-4 flex items-center justify-between backdrop-blur transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg hover:-translate-y-0.5 select-none cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Bot className="h-5 w-5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-muted-foreground uppercase">VALIDATOR MESH</div>
                    <div className="text-xs font-semibold font-mono text-foreground tracking-wide mt-0.5 uppercase">9,842 ONLINE</div>
                  </div>
                </div>
                <div className="flex gap-1 select-none pr-1">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-ping"
                      style={{
                        animationDuration: "1.5s",
                        animationDelay: `${idx * 200}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Consensus Accuracy Widget */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-4 flex items-center justify-between backdrop-blur transition-all duration-300 hover:border-secondary/30 hover:bg-card/60 hover:shadow-lg hover:-translate-y-0.5 select-none cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:rotate-12 transition-transform duration-300">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-muted-foreground uppercase">ACCURACY RATING</div>
                    <div className="text-xs font-semibold font-mono text-foreground tracking-wide mt-0.5 uppercase">99.98% SYNC</div>
                  </div>
                </div>
                <div className="relative h-7 w-7 flex items-center justify-center">
                  <svg className="h-7 w-7 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="var(--border)" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="var(--secondary)"
                      strokeWidth="3"
                      strokeDasharray="88"
                      strokeDashoffset={88 - 88 * 0.999}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[8px] font-mono font-bold text-secondary">99%</span>
                </div>
              </div>

              {/* ROI Savings Widget */}
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-4 flex items-center justify-between backdrop-blur transition-all duration-300 hover:border-primary/30 hover:bg-card/60 hover:shadow-lg hover:-translate-y-0.5 select-none cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:translate-y-[-2px] transition-transform duration-300">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-mono font-bold tracking-wider text-muted-foreground uppercase">GAS ROI SAVED</div>
                    <div className="text-xs font-semibold font-mono text-foreground tracking-wide mt-0.5 uppercase">$4.2M SAVED</div>
                  </div>
                </div>
                <svg className="h-5 w-12 text-primary" viewBox="0 0 50 20">
                  <path d="M0,16 Q10,12 20,13 T40,6 T50,2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M0,16 Q10,12 20,13 T40,6 T50,2 L50,20 L0,20 Z" fill="currentColor" opacity="0.12" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCounter label="Transactions Processed" target={48_293_104} increment={7} intervalMs={900} />
          <StatCounter label="Blocks Mined" target={1_248_301} increment={1} intervalMs={2400} />
          <StatCounter label="Active Validators" target={9_842} increment={1} intervalMs={8000} />
          <StatCounter label="Colonies Connected" target={12} increment={0} intervalMs={60000} />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Illustrative telemetry · simulation feed</p>
      </section>

      {/* Bento — Apple-style upgraded with Portmind glass styling */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Mission Modules</div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Every subsystem.<br />
            <span className="text-muted-foreground">One console.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Purpose-built modules that snap together into a single operating picture — from
            wallet custody to market telemetry to on-chain block production.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-[repeat(4,minmax(160px,auto))]">
          {/* Feature: Mission Control */}
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            eyebrow="Mission Control"
            title="Live markets, one glance."
            body="Streaming price feeds from Bitcoin, Ethereum, Arbitrum and Solana refresh every 45 seconds — with charts, top movers, and gas comparisons for every colony's operator."
            href="/mission-control"
            cta="Open dashboard"
            tone="primary"
          >
            <MarketVisual />
          </BentoCard>

          {/* Ethereum */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            eyebrow="Layer 1"
            title="Ethereum settles."
            body="Global consensus, cryptographic finality — the base layer every colony trusts."
            icon={Globe}
          >
            <Stat label="Validators securing L1" value="1M+" />
          </BentoCard>

          {/* Arbitrum */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            eyebrow="Layer 2"
            title="Arbitrum scales."
            body="Rollups batch thousands of transactions off-chain and post one proof back to Ethereum."
            icon={Zap}
          >
            <div className="mt-4 space-y-2">
              <MiniBar label="L1 fee" value="$3.20" width="100%" tone="muted" />
              <MiniBar label="L2 fee" value="$0.04" width="14%" tone="primary" />
            </div>
          </BentoCard>

          {/* Mining Reactor - large feature */}
          <BentoCard
            className="md:col-span-4 md:row-span-2"
            eyebrow="Mining Reactor"
            title="Real SHA-256, in your browser."
            body="Mine chained blocks with the Web Crypto API, adjust difficulty, and watch the chain break the instant you tamper with history."
            href="/mining-reactor"
            cta="Enter reactor"
            tone="secondary"
          >
            <HashVisual />
          </BentoCard>

          {/* Wallet */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            eyebrow="Custody"
            title="Wallet Satellite"
            body="Sign transactions offline. Public keys ship. Private keys stay planetside."
            icon={Wallet}
          />

          {/* Reliability */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            eyebrow="Uptime"
            title="99.98% synced"
            body="Cross-colony consensus across 12 orbital nodes, four planetary anchors."
            icon={ShieldCheck}
          />

          {/* Perf */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            eyebrow="Latency"
            title="~250ms finality"
            body="Sub-second confirmations on Arbitrum — before the next radar sweep."
            icon={Gauge}
          />
        </div>
      </section>

      {/* Why Layer 2 - Cyber Glass Panel Upgrade */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card/65 backdrop-blur-xl p-8 md:p-12 shadow-xl group">
          <div className="absolute -inset-24 rounded-full opacity-10 bg-[radial-gradient(circle,rgba(2,132,199,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />
          <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="grid gap-10 md:grid-cols-2 relative z-10">
            <div>
              <div className="eyebrow">Why Layer 2</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Ethereum settles. Arbitrum scales.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ethereum's mainnet is a global settlement layer — every node re-executes
                every transaction, which is what makes it trustworthy and what makes it
                slow. At interplanetary scale, that ceiling matters: a busy period can push
                gas fees above $20 and confirmation times past a minute.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Arbitrum is an optimistic rollup. It batches thousands of transactions
                off-chain, executes them in a cheaper environment, and posts a single
                cryptographic proof back to Ethereum. You inherit L1 security while
                paying L2 prices.
              </p>
            </div>
            <div className="grid gap-3 self-center">
              <Compare label="Median transaction fee" l1="$3.20" l2="$0.04" />
              <Compare label="Time to soft finality" l1="~12s" l2="~250ms" />
              <Compare label="Throughput (TPS)" l1="~15" l2="~4,000" />
              <div className="mt-2 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-primary">Concrete benefit:</span>{" "}
                Sending 100 USDC from a lunar wallet costs pennies on Arbitrum instead of
                several dollars on mainnet — and confirms before the next radar sweep.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </SiteLayout>
  );
}

function Compare({ label, l1, l2 }: { label: string; l1: string; l2: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-xl border border-border/70 bg-background/40 p-3.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-muted-foreground line-through">{l1}</span>
      <span className="font-mono font-semibold text-primary">{l2}</span>
    </div>
  );
}

type BentoTone = "default" | "primary" | "secondary";
function BentoCard({
  className = "",
  eyebrow,
  title,
  body,
  icon: Icon,
  href,
  cta,
  tone = "default",
  children,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  body: string;
  icon?: typeof Wallet;
  href?: string;
  cta?: string;
  tone?: BentoTone;
  children?: React.ReactNode;
}) {
  const accentGlow =
    tone === "primary"
      ? "rgba(2, 132, 199, 0.12)"
      : tone === "secondary"
        ? "rgba(124, 58, 237, 0.12)"
        : "rgba(255, 255, 255, 0.03)";
  const accentBorder =
    tone === "primary"
      ? "group-hover:border-primary/45"
      : tone === "secondary"
        ? "group-hover:border-secondary/45"
        : "group-hover:border-foreground/20";
        
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[24px] border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default",
        "border-border bg-card/65 backdrop-blur-xl",
        accentBorder,
        className
      )}
    >
      {/* Dynamic glow corner */}
      <div
        className="absolute -inset-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`
        }}
      />
      {/* Top border sheen */}
      <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 group-hover:via-white/20" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="eyebrow">{eyebrow}</div>
          {Icon && (
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-muted border border-border/60 text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20">
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl transition-colors group-hover:text-primary">{title}</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base leading-relaxed">{body}</p>
      </div>
      {children && <div className="mt-6 relative z-10">{children}</div>}
      {href && cta && (
        <Link
          to={href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2 transition-all relative z-10"
        >
          {cta} <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 flex items-baseline gap-3">
      <span className="font-display text-4xl font-bold text-foreground sm:text-5xl">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function MiniBar({ label, value, width, tone }: { label: string; value: string; width: string; tone: "primary" | "muted" }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
        <div
          className={cn("h-full rounded-full", tone === "primary" ? "bg-primary" : "bg-muted-foreground/50")}
          style={{ width }}
        />
      </div>
    </div>
  );
}

function MarketVisual() {
  const rows = [
    { name: "BTC", price: "$67,240", ch: "+2.14%", up: true },
    { name: "ETH", price: "$3,482", ch: "+1.02%", up: true },
    { name: "ARB", price: "$0.821", ch: "-0.45%", up: false },
    { name: "SOL", price: "$174.20", ch: "+3.87%", up: true },
  ];
  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 p-4 backdrop-blur shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Live feed
        </span>
        <span className="font-mono">CoinGecko · 45s</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {rows.map((r) => (
          <div key={r.name} className="rounded-xl bg-foreground/5 p-3 border border-border/40">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold">{r.name}</span>
              <span className={cn("font-mono", r.up ? "text-success" : "text-destructive")}>{r.ch}</span>
            </div>
            <div className="mt-1 font-mono text-sm font-semibold">{r.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HashVisual() {
  return (
    <div className="rounded-2xl border border-border/60 bg-background/60 p-4 font-mono text-xs backdrop-blur shadow-sm">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="eyebrow">Block #2</span>
        <span className="inline-flex items-center gap-1.5 text-success">
          <Layers className="h-3.5 w-3.5" /> Valid
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        <div className="truncate text-secondary">000a4f2b91e7d3c85b6a2f19d8e0c47a5b3f6...</div>
        <div className="truncate text-muted-foreground">nonce · 48,271</div>
        <div className="h-px bg-border/60" />
        <div className="truncate text-primary">0009c1de8ab72f45e63d9c1a7b40e2f8c5d3...</div>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden py-24 border-t border-border/80 bg-background/25 backdrop-blur-sm">
      {/* Dynamic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-4xl px-6 relative z-10 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          FAQ
        </div>

        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Frequently asked questions
        </h2>

        <div className="mt-16 max-w-3xl mx-auto flex flex-col border-t border-border text-left">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-border py-6 sm:py-7">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer bg-transparent border-none p-0 outline-none"
                >
                  <span className="text-base sm:text-xl font-semibold text-foreground/90 group-hover:text-primary transition-colors duration-200 tracking-tight">
                    {item.question}
                  </span>
                  <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                    {/* Horizontal line */}
                    <div className="absolute w-4.5 h-[1.5px] bg-muted-foreground group-hover:bg-primary transition-colors duration-200" />
                    {/* Vertical line */}
                    <motion.div
                      className="absolute w-[1.5px] h-4.5 bg-muted-foreground group-hover:bg-primary transition-colors duration-200"
                      animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1, scaleY: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[95%] font-normal">
                    {item.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}



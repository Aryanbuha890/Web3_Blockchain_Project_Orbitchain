import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Rocket, Wallet, Globe, Zap, Cpu, Radar,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Starfield } from "@/components/Starfield";
import { StatCounter } from "@/components/StatCounter";

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

const modules = [
  { icon: Wallet, title: "Wallet Satellite", desc: "Custody keys and sign transactions from any colony, offline-first." },
  { icon: Globe, title: "Ethereum Planet", desc: "Settlement layer providing global consensus and finality." },
  { icon: Zap, title: "Arbitrum Express", desc: "L2 rollup delivering sub-second transactions at fractional cost." },
  { icon: Cpu, title: "Mining Reactor", desc: "Interactive proof-of-work simulator with real SHA-256 hashing." },
  { icon: Radar, title: "Mission Control", desc: "Live telemetry across markets, gas, and network throughput." },
];

function MissionHQ() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Starfield />
        <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Network status: nominal · 12 colonies online
            </div>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Mission control for the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                interplanetary
              </span>{" "}
              Web3 economy.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              OrbitChain unifies Ethereum settlement, Arbitrum throughput, and off-world nodes
              into a single telemetry surface. Watch every block, every trade, every colony —
              in real time.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/mission-control"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Rocket className="h-4 w-4" /> Launch Mission
              </Link>
              <Link
                to="/galaxy"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-card"
              >
                Explore Galaxy <ArrowRight className="h-4 w-4" />
              </Link>
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

      {/* Modules */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Mission Modules</div>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Every subsystem, one console.</h2>
          <p className="mt-3 text-muted-foreground">
            Compose your operating picture from focused modules. Each speaks a common protocol
            so operators can pivot from ledger settlement to hash telemetry in a single glance.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="surface group p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <m.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Layer 2 */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="surface overflow-hidden">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="eyebrow">Why Layer 2</div>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Ethereum settles. Arbitrum scales.</h2>
              <p className="mt-4 text-muted-foreground">
                Ethereum's mainnet is a global settlement layer — every node re-executes
                every transaction, which is what makes it trustworthy and what makes it
                slow. At interplanetary scale, that ceiling matters: a busy period can push
                gas fees above $20 and confirmation times past a minute.
              </p>
              <p className="mt-3 text-muted-foreground">
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
              <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm">
                <span className="font-semibold text-primary">Concrete benefit:</span>{" "}
                Sending 100 USDC from a lunar wallet costs pennies on Arbitrum instead of
                several dollars on mainnet — and confirms before the next radar sweep.
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Compare({ label, l1, l2 }: { label: string; l1: string; l2: string }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-lg border border-border/70 bg-background/40 p-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-muted-foreground line-through">{l1}</span>
      <span className="font-mono font-semibold text-primary">{l2}</span>
    </div>
  );
}

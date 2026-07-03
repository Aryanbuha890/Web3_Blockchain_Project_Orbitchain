import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe2, Network, Key, KeyRound, Database, Coins, Bitcoin, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/galaxy")({
  head: () => ({
    meta: [
      { title: "Galaxy Explorer — OrbitChain" },
      { name: "description", content: "Reference explainers for Web3 fundamentals: Web2 vs Web3, Ethereum vs Bitcoin, keys, and blockchains vs databases." },
      { property: "og:title", content: "Galaxy Explorer — OrbitChain" },
      { property: "og:description", content: "Concept comparisons for the interplanetary Web3 economy." },
    ],
  }),
  component: GalaxyExplorer,
});

type Side = { icon: LucideIcon; title: string; points: string[] };
type Comparison = { eyebrow: string; matters: string; left: Side; right: Side };

const comparisons: Comparison[] = [
  {
    eyebrow: "Architecture",
    matters: "Ownership shifts from platforms to people — a prerequisite for cross-colony trust.",
    left: {
      icon: Server,
      title: "Web2",
      points: [
        "Centralized servers owned by corporations",
        "Users rent accounts; platforms can revoke them",
        "Data siloed behind private APIs",
        "Trust is placed in the operator",
      ],
    },
    right: {
      icon: Network,
      title: "Web3",
      points: [
        "Distributed nodes running open protocols",
        "Users hold cryptographic keys to their assets",
        "State is public and permissionless to read",
        "Trust is placed in code and math",
      ],
    },
  },
  {
    eyebrow: "Base Layers",
    matters: "Bitcoin optimizes for hard money; Ethereum optimizes for programmable value.",
    left: {
      icon: Bitcoin,
      title: "Bitcoin",
      points: [
        "Fixed supply of 21M BTC — designed as digital gold",
        "Proof-of-Work secured by miners",
        "Scripting is intentionally limited",
        "Optimized for censorship-resistant value transfer",
      ],
    },
    right: {
      icon: Coins,
      title: "Ethereum",
      points: [
        "Uncapped supply with fee-burn deflation pressure",
        "Proof-of-Stake secured by validators",
        "Turing-complete smart contracts (EVM)",
        "Optimized for programmable applications and L2s",
      ],
    },
  },
  {
    eyebrow: "Cryptography",
    matters: "Share the public key freely; guard the private key like your life depends on it — because your funds do.",
    left: {
      icon: Key,
      title: "Public Key",
      points: [
        "Derived mathematically from the private key",
        "Safe to share — becomes your address",
        "Used by others to send you funds",
        "Verifies signatures you produce",
      ],
    },
    right: {
      icon: KeyRound,
      title: "Private Key",
      points: [
        "A secret 256-bit number — never share it",
        "Authorizes every outgoing transaction",
        "Whoever holds it controls the assets",
        "Loss is permanent — no recovery button",
      ],
    },
  },
  {
    eyebrow: "State",
    matters: "Databases prioritize speed and control; blockchains prioritize verifiability and openness.",
    left: {
      icon: Database,
      title: "Traditional Database",
      points: [
        "One administrator with full write access",
        "Optimized for read/write throughput",
        "History can be silently rewritten",
        "Access controlled by credentials",
      ],
    },
    right: {
      icon: Globe2,
      title: "Blockchain",
      points: [
        "Thousands of nodes replicate the same state",
        "Append-only — history is cryptographically sealed",
        "Anyone can independently audit every entry",
        "Access controlled by cryptographic signatures",
      ],
    },
  },
];

function GalaxyExplorer() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="eyebrow">Reference Library</div>
        <h1 className="mt-2 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Galaxy Explorer.
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Field notes on the primitives that keep OrbitChain running. Short, side-by-side
          comparisons for operators onboarding to the interplanetary Web3 stack.
        </p>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 pb-16 sm:px-6 lg:px-8">
        {comparisons.map((c, i) => (
          <motion.article
            key={c.eyebrow}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card/65 backdrop-blur-xl shadow-xl group"
          >
            <span className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-300 group-hover:via-white/20" />
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-4 relative z-10">
              <div className="eyebrow font-sans uppercase text-[10px] tracking-wider text-muted-foreground">{c.eyebrow}</div>
              <div className="text-xs text-muted-foreground font-mono">Comparison {String(i + 1).padStart(2, "0")}</div>
            </div>
            <div className="grid divide-y md:divide-y-0 divide-border md:grid-cols-2 md:divide-x relative z-10">
              <ComparisonSide side={c.left} tint="primary" />
              <ComparisonSide side={c.right} tint="secondary" />
            </div>
            <div className="border-t border-border/60 bg-background/30 px-6 py-4 text-sm relative z-10 leading-relaxed">
              <span className="eyebrow mr-2 inline font-sans uppercase text-[10px] tracking-wider text-muted-foreground">Why it matters</span>
              <span className="text-muted-foreground">{c.matters}</span>
            </div>
          </motion.article>
        ))}
      </section>
    </SiteLayout>
  );
}

function ComparisonSide({ side, tint }: { side: Side; tint: "primary" | "secondary" }) {
  const color = tint === "primary"
    ? "text-primary bg-primary/10 border-primary/20"
    : "text-secondary bg-secondary/10 border-secondary/20";
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${color}`}>
          <side.icon className="h-4.5 w-4.5" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{side.title}</h3>
      </div>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {side.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tint === "primary" ? "bg-primary" : "bg-secondary"}`} />
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

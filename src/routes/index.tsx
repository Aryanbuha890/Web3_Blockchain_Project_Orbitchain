import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Rocket, Wallet, Globe, Zap, Cpu, Radar, ArrowUpRight,
  ShieldCheck, Gauge, Layers, PlayCircle, Bot, Trophy, Coins,
  Terminal, Activity, Wifi, CheckCircle2, AlertCircle, RefreshCw,
  Compass, Database, Server, Radio, Network, Landmark, ChevronLeft,
  ChevronRight, ArrowRightLeft, ShieldAlert, Sparkles, MapPin, Eye,
  CloudSun, FileText, UserCheck, HelpCircle
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Starfield } from "@/components/Starfield";
import { StatCounter } from "@/components/StatCounter";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

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

// Interactive Telemetry Command Center Mockup
function CommandCenter() {
  const [activeTab, setActiveTab] = useState<"telemetry" | "validators" | "relay">("telemetry");
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Terminal initialized. All links operating.",
    "[MESH] OrbitChain Validator Mesh version 1.0.0-orbit online.",
    "[CONN] Connection established: 12 colonies active."
  ]);
  const [pingerColony, setPingerColony] = useState<string | null>(null);
  const [pingerStatus, setPingerStatus] = useState<"idle" | "pinging" | "success">("idle");
  const [pingerTime, setPingerTime] = useState<number>(0);
  const [safeMode, setSafeMode] = useState<boolean>(false);
  const [simulatingTx, setSimulatingTx] = useState<boolean>(false);
  const [onlineNodes, setOnlineNodes] = useState<number>(9842);
  const [consensusRate, setConsensusRate] = useState<number>(99.98);
  const [chartData, setChartData] = useState(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 5}s`,
      tps: 150,
      gas: 0.08
    }));
  });

  const consoleEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev.slice(-20), `[${time}] ${msg}`]);
  }, []);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    // Populate client-side dynamic values on mount to prevent SSR mismatch
    setChartData(Array.from({ length: 12 }, (_, i) => ({
      time: `${i * 5}s`,
      tps: Math.floor(Math.random() * 80) + 120,
      gas: parseFloat((Math.random() * 0.1 + 0.05).toFixed(3))
    })));

    const interval = setInterval(() => {
      const colonyNames = ["Mars Anchor", "Luna Hub", "Orbital Station Beta", "Titan Station", "Earth Central"];
      const randomColony = colonyNames[Math.floor(Math.random() * colonyNames.length)];
      const events = [
        `Received batch validation proof from ${randomColony}`,
        `Optimistic compression finalized on L1 for ${randomColony} block`,
        `Gas optimizer updated: ARB fees normalized.`,
        `Consensus checkpoint verified at index #${Math.floor(Math.random() * 1000) + 1248000}`
      ];
      addLog(events[Math.floor(Math.random() * events.length)]);
      
      setChartData((prev) => {
        const next = [...prev.slice(1)];
        next.push({
          time: `${Date.now() % 100}s`,
          tps: Math.floor(Math.random() * 100) + 110,
          gas: parseFloat((Math.random() * 0.08 + 0.06).toFixed(3))
        });
        return next;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [addLog]);

  const handlePingColony = async (colony: string, defaultDelay: number) => {
    if (pingerStatus === "pinging") return;
    
    setPingerColony(colony);
    setPingerStatus("pinging");
    addLog(`[PING] Pinging ${colony} Anchor Hub. Measuring packet transit duration...`);
    
    let steps = 15;
    let stepCount = 0;
    setPingerTime(0);
    
    const interval = setInterval(() => {
      stepCount++;
      setPingerTime(() => Math.round((defaultDelay / steps) * stepCount));
      if (stepCount >= steps) {
        clearInterval(interval);
        setPingerStatus("success");
        addLog(`[PING] Echo returned from ${colony}: Round Trip Time ${defaultDelay}ms (100% validator alignment).`);
      }
    }, defaultDelay / steps);
  };

  const handleSyncMesh = () => {
    addLog("[MESH] Requesting complete validator mesh alignment check...");
    setTimeout(() => {
      setOnlineNodes((n) => Math.min(10000, n + Math.floor(Math.random() * 8) + 1));
      setConsensusRate(99.99);
      addLog("[MESH] Node mesh synced. 9,848 online. Shard consistency 99.99%.");
    }, 1200);
  };

  const handleSimulateTx = () => {
    if (simulatingTx) return;
    setSimulatingTx(true);
    addLog("[RELAY] Initiating transaction burst simulator. Launching 2,500 payload iterations...");
    
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      const colonies = ["Earth L1", "Mars L2", "Luna Anchor", "Titan station"];
      const from = colonies[Math.floor(Math.random() * colonies.length)];
      const to = colonies.filter(c => c !== from)[Math.floor(Math.random() * (colonies.length - 1))];
      const amount = (Math.random() * 150 + 5).toFixed(2);
      addLog(`[TX] Broadcast complete: ${from} ➔ ${to} transfer of ${amount} ORB [Success]`);
      
      if (counter >= 8) {
        clearInterval(interval);
        setSimulatingTx(false);
        addLog("[RELAY] Shard burst complete. Block successfully verified in Arbitrum soft rollups (~250ms).");
      }
    }, 250);
  };

  const handleToggleSafe = () => {
    const next = !safeMode;
    setSafeMode(next);
    if (next) {
      addLog("[WARNING] Emergency safe mode protocol active. Gas limits capped. Validator delays set to default.");
    } else {
      addLog("[SUCCESS] Safe mode deactivated. Full processing capacity re-established.");
    }
  };

  return (
    <div className="relative mx-auto max-w-5xl w-full">
      <div className="relative rounded-[24px] p-[1.5px] bg-gradient-to-br from-white/20 via-primary/20 to-white/5 shadow-2xl dark:shadow-slate-950/70 overflow-hidden">
        <div className="absolute -inset-24 -z-10 rounded-[44px] blur-3xl opacity-20 dark:opacity-30 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,rgba(124,58,237,0.15)_70%)] animate-pulse pointer-events-none" />

        <div className="overflow-hidden rounded-[23px] bg-card/90 dark:bg-[#070914]/95 backdrop-blur-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 dark:bg-slate-950/40 px-4 py-3">
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="h-3 w-3 rounded-full bg-destructive/85 shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)] cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-amber-500/85 shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)] cursor-pointer" />
              <span className="h-3 w-3 rounded-full bg-success/85 shadow-[inset_0_-1px_0_rgba(0,0,0,0.3)] cursor-pointer" />
            </div>

            <div className="mx-auto flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-1 text-[11px] font-mono text-muted-foreground shadow-inner">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              orbitchain.net/command?colony=all
            </div>

            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-muted-foreground w-[20%] justify-end">
              <span className="hidden items-center gap-1 md:inline-flex text-success">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                SYNC NOMINAL
              </span>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-12 gap-px bg-border/40">
            {/* Sidebar */}
            <aside className="col-span-12 md:col-span-3 bg-muted/20 dark:bg-[#05060f]/45 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
              <button
                onClick={() => setActiveTab("telemetry")}
                className={cn(
                  "flex items-center gap-2 w-full text-left rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "telemetry"
                    ? "bg-primary/10 text-primary border border-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Activity className="h-4.5 w-4.5" />
                Telemetry Monitor
              </button>
              <button
                onClick={() => setActiveTab("validators")}
                className={cn(
                  "flex items-center gap-2 w-full text-left rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "validators"
                    ? "bg-primary/10 text-primary border border-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Server className="h-4.5 w-4.5" />
                Consensus Mesh
              </button>
              <button
                onClick={() => setActiveTab("relay")}
                className={cn(
                  "flex items-center gap-2 w-full text-left rounded-xl px-3 py-2.5 text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap",
                  activeTab === "relay"
                    ? "bg-primary/10 text-primary border border-primary/25"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Radio className="h-4.5 w-4.5" />
                Interplanetary Relay
              </button>
            </aside>

            {/* Contents Panel */}
            <div className="col-span-12 md:col-span-9 bg-card/60 p-4 sm:p-6 flex flex-col justify-between min-h-[460px]">
              {activeTab === "telemetry" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Real-time Shard Telemetry</h4>
                      <p className="text-xs text-muted-foreground">Monitoring active processing limits across networks</p>
                    </div>
                    <span className="text-xs font-mono bg-success/10 border border-success/20 text-success rounded-full px-2 py-0.5 animate-pulse">
                      Live Input Rate: Nominal
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="border border-border/80 bg-background/40 rounded-xl p-3.5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Network Load (TPS)</span>
                      <div className="mt-2 font-display text-2xl font-bold text-foreground">
                        {chartData[chartData.length - 1]?.tps} <span className="text-[10px] text-muted-foreground font-mono">TX/s</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-border mt-3 overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${(chartData[chartData.length - 1]?.tps / 300) * 100}%` }} />
                      </div>
                    </div>

                    <div className="border border-border/80 bg-background/40 rounded-xl p-3.5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Consensus Accuracy</span>
                      <div className="mt-2 font-display text-2xl font-bold text-foreground">{consensusRate}%</div>
                      <span className="text-[9px] font-mono text-success mt-3 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Fully synced anchors
                      </span>
                    </div>

                    <div className="border border-border/80 bg-background/40 rounded-xl p-3.5 flex flex-col justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Average L2 Gas Fee</span>
                      <div className="mt-2 font-display text-2xl font-bold text-foreground">
                        ${chartData[chartData.length - 1]?.gas} <span className="text-[10px] text-muted-foreground font-mono">USD</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-border mt-3 overflow-hidden">
                        <div className="bg-success h-full rounded-full transition-all duration-500" style={{ width: `${(chartData[chartData.length - 1]?.gas / 0.2) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="h-40 border border-border/70 rounded-xl bg-background/50 p-2 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="tpsGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={9} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={9} />
                        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: 10 }} />
                        <Area type="monotone" dataKey="tps" stroke="var(--primary)" strokeWidth={1.5} fill="url(#tpsGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === "validators" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Consensus Validator Hubs</h4>
                      <p className="text-xs text-muted-foreground">Active nodes participating in shard voting blocks</p>
                    </div>
                    <button
                      onClick={handleSyncMesh}
                      className="inline-flex items-center gap-1.5 border border-primary/30 hover:border-primary bg-primary/5 text-primary text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer transition-all hover:bg-primary/10"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Sync Shards
                    </button>
                  </div>

                  <div className="border border-border/70 rounded-xl bg-background/30 overflow-hidden">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground">
                          <th className="p-3 font-semibold">Hub Anchor</th>
                          <th className="p-3 font-semibold text-center">Status</th>
                          <th className="p-3 font-semibold text-right">Ping (RTT)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40 text-foreground/80 font-mono">
                        <tr>
                          <td className="p-3 flex items-center gap-1.5 font-sans font-medium"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Earth Colony Anchor</td>
                          <td className="p-3 text-center"><span className="text-[10px] border border-success/30 bg-success/5 text-success px-2 py-0.5 rounded-full">ACTIVE</span></td>
                          <td className="p-3 text-right">2.4 ms</td>
                        </tr>
                        <tr>
                          <td className="p-3 flex items-center gap-1.5 font-sans font-medium"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Luna Crater Station</td>
                          <td className="p-3 text-center"><span className="text-[10px] border border-success/30 bg-success/5 text-success px-2 py-0.5 rounded-full">ACTIVE</span></td>
                          <td className="p-3 text-right">1.28 s</td>
                        </tr>
                        <tr>
                          <td className="p-3 flex items-center gap-1.5 font-sans font-medium"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Mars Prime Relay</td>
                          <td className="p-3 text-center"><span className="text-[10px] border border-success/30 bg-success/5 text-success px-2 py-0.5 rounded-full">SYNCING</span></td>
                          <td className="p-3 text-right">4.36 m</td>
                        </tr>
                        <tr>
                          <td className="p-3 flex items-center gap-1.5 font-sans font-medium"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Titan Hydro-hub</td>
                          <td className="p-3 text-center"><span className="text-[10px] border border-amber-500/30 bg-amber-50/5 text-amber-500 px-2 py-0.5 rounded-full">LATENT</span></td>
                          <td className="p-3 text-right">79.20 m</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 p-3 bg-muted/20 border border-border/80 rounded-xl text-xs text-muted-foreground justify-between">
                    <span className="flex items-center gap-1.5">
                      <Network className="h-4 w-4 text-primary" /> Active Online Nodes: <strong className="text-foreground">{onlineNodes}</strong>
                    </span>
                    <span>Global Consensus Hash Rate: <strong className="text-foreground">42.84 Thash/s</strong></span>
                  </div>
                </div>
              )}

              {activeTab === "relay" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Colony Latency Pinger</h4>
                      <p className="text-xs text-muted-foreground">Measure real speed of light delay (RTT) across planetary systems</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { name: "Earth L1 Hub", delay: 20 },
                      { name: "Luna Crater", delay: 1280 },
                      { name: "Mars Prime", delay: 2400 },
                      { name: "Titan Anchor", delay: 4800 }
                    ].map((colony) => (
                      <button
                        key={colony.name}
                        onClick={() => handlePingColony(colony.name, colony.delay)}
                        disabled={pingerStatus === "pinging"}
                        className={cn(
                          "rounded-xl border p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-muted/30 select-none",
                          pingerColony === colony.name && pingerStatus === "pinging"
                            ? "border-primary bg-primary/5 animate-pulse"
                            : "border-border bg-background/50 hover:border-primary/50"
                        )}
                      >
                        <Compass className="h-5 w-5 mb-1.5 text-muted-foreground" />
                        <span className="text-[11px] font-semibold text-foreground leading-tight">{colony.name}</span>
                        <span className="text-[9px] text-muted-foreground font-mono mt-1">Est: {colony.delay}ms</span>
                      </button>
                    ))}
                  </div>

                  {/* Ping telemetric output */}
                  <div className="border border-border/70 bg-background/50 rounded-xl p-4 min-h-[100px] flex flex-col justify-center items-center">
                    {pingerStatus === "idle" && (
                      <div className="text-center">
                        <Wifi className="h-6 w-6 text-muted-foreground/60 mx-auto animate-bounce" />
                        <p className="text-xs text-muted-foreground mt-2">Select a colony node above to calculate ping roundtrip</p>
                      </div>
                    )}

                    {pingerStatus === "pinging" && (
                      <div className="text-center w-full">
                        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
                        <p className="text-xs font-semibold text-foreground mt-3">PINGING: {pingerColony}</p>
                        <div className="text-xs font-mono text-muted-foreground mt-1 tracking-wider">
                          Transit elapsed: <strong className="text-primary">{pingerTime} ms</strong>
                        </div>
                      </div>
                    )}

                    {pingerStatus === "success" && (
                      <div className="text-center">
                        <div className="h-8 w-8 rounded-full bg-success/10 border border-success/20 text-success flex items-center justify-center mx-auto scale-in duration-300">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-bold text-foreground mt-2.5">ECHO RECEIVED FROM {pingerColony?.toUpperCase()}</p>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Roundtrip transit: {pingerTime}ms</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Console Logs Footer */}
              <div className="mt-5 border-t border-border/40 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="font-mono tracking-wide">SHARD OPERATING SYSTEM TERMINAL</span>
                  </div>
                  
                  {/* Actions buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSimulateTx}
                      disabled={simulatingTx}
                      className="text-[10px] font-semibold border border-primary/20 bg-primary/5 hover:bg-primary/10 transition text-primary hover:border-primary px-2.5 py-1 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      {simulatingTx ? "Relaying..." : "Inject Tx"}
                    </button>
                    <button
                      onClick={handleToggleSafe}
                      className={cn(
                        "text-[10px] font-semibold border px-2.5 py-1 rounded-md cursor-pointer transition-all",
                        safeMode
                          ? "border-destructive bg-destructive/10 text-destructive hover:bg-destructive/15"
                          : "border-border bg-muted/40 text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {safeMode ? "Emergency Active" : "Safe Mode"}
                    </button>
                  </div>
                </div>

                <div className="h-32 rounded-xl bg-slate-950 p-3 font-mono text-[10px] text-emerald-400 overflow-y-auto leading-relaxed border border-border/40 select-text">
                  <div className="space-y-1">
                    {logs.map((log, idx) => (
                      <div key={idx} className={cn(
                        "break-all",
                        log.includes("[WARNING]") && "text-amber-400 font-bold",
                        log.includes("[SYSTEM]") && "text-sky-400",
                        log.includes("[CONN]") && "text-success",
                        log.includes("[PING]") && "text-pink-400"
                      )}>
                        {log}
                      </div>
                    ))}
                    <div ref={consoleEndRef} />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Custom Ecosystem SVG Node Map Component (Portmind adaptation)
function EcosystemSection() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 0,
      title: "Earth settlement L1",
      index: "01",
      icon: Globe,
      color: "#3B82F6",
      coreCode: "ETH-L1",
      description: "Settles consensus blocks with ultimate cryptographic security on Mainnet.",
      metrics: [
        { label: "Active Stakers", value: "1.2M+ Validators" },
        { label: "Finality Guarantee", value: "100% Cryptographic" },
        { label: "Value Locked", value: "$45B settlement" }
      ],
      agents: ["L1 Settlement Agent", "Mempool Inspector", "Block Finalizer Daemon"]
    },
    {
      id: 1,
      title: "Luna Station Anchor",
      index: "02",
      icon: Radar,
      color: "#8B5CF6",
      coreCode: "LUNA",
      description: "Low-latency settlement relay routing transactions between Earth and Mars.",
      metrics: [
        { label: "Channel Ping", value: "RTT 1.28 seconds" },
        { label: "Relay Shards", value: "8 Active lanes" },
        { label: "Uptime SLA", value: "99.998% Sync rate" }
      ],
      agents: ["Lunar Relay Sequencer", "Tidal Gravity Watcher", "Channel Buffer Bot"]
    },
    {
      id: 2,
      title: "Mars Prime Colony",
      index: "03",
      icon: Compass,
      color: "#10B981",
      coreCode: "MARS",
      description: "Isolated Martian shard managing smart contracts for off-world miners.",
      metrics: [
        { label: "Astronomical Delay", value: "4m to 20m delay" },
        { label: "Local TPS Cap", value: "2,000 tx/sec" },
        { label: "Consensus Anchor", value: "PoS local checkpoint" }
      ],
      agents: ["Martian Ledger Sync", "Light-speed Delay Adapter", "Laser Telemetry Bot"]
    },
    {
      id: 3,
      title: "Titan Hydro-Station",
      index: "04",
      icon: ShieldAlert,
      color: "#EF4444",
      coreCode: "TITAN",
      description: "Highly latent node processing asset reserves on Saturnian outposts.",
      metrics: [
        { label: "Light-speed Lag", value: "RTT ~79 minutes" },
        { label: "State Checkpoint", value: "Committed hourly" },
        { label: "Thermal Safeguard", value: "Methane cooling nominal" }
      ],
      agents: ["Titan Ledger Buffer", "Reserve Compliance Agent", "Cryo cooling watcher"]
    },
    {
      id: 4,
      title: "Arbitrum Scaling L2",
      index: "05",
      icon: Zap,
      color: "#F59E0B",
      coreCode: "ARB-L2",
      description: "Optimistic rollup compression sequencing engine for micro-cost values.",
      metrics: [
        { label: "Gas Savings", value: "98.8% vs Mainnet" },
        { label: "Average Fee", value: "$0.04 Per payload" },
        { label: "Finality Soft Speed", value: "~250ms confirmation" }
      ],
      agents: ["Sequencer Rollup Bot", "Fraud Prover Agent", "Mempool Batch Packer"]
    },
    {
      id: 5,
      title: "Consensus Shard Mesh",
      index: "06",
      icon: Network,
      color: "#EC4899",
      coreCode: "SHARDS",
      description: "Distributed shard validation mesh auditing ledger blocks.",
      metrics: [
        { label: "Active Nodes", value: "9,842 Synced" },
        { label: "Validation speed", value: "12ms average" },
        { label: "Mesh Security", value: "Aggregate signatures" }
      ],
      agents: ["BLS Signature Aggregator", "Malicious Node Slasher", "Mesh Integrity Guard"]
    }
  ];

  // SVG paths connecting nodes to the center
  const paths = [
    { d: "M 480 350 C 400 350, 320 110, 260 110", dur: "4.2s" }, // Card 1
    { d: "M 480 350 C 400 362, 320 338, 260 350", dur: "3.6s" }, // Card 2
    { d: "M 480 350 C 400 350, 320 590, 260 590", dur: "4.8s" }, // Card 3
    { d: "M 480 350 C 560 350, 640 110, 700 110", dur: "4.0s" }, // Card 4
    { d: "M 480 350 C 560 338, 640 362, 700 350", dur: "3.8s" }, // Card 5
    { d: "M 480 350 C 560 350, 640 590, 700 590", dur: "4.5s" }  // Card 6
  ];

  const activeNodeData = activeNode !== null ? nodes[activeNode] : null;
  const themeColor = activeNodeData ? activeNodeData.color : "#0284c7";

  return (
    <section className="border-t border-border/40 py-28 overflow-hidden bg-background/30 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none cyber-grid-overlay" />
      
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: activeNodeData
            ? `radial-gradient(closest-side, ${activeNodeData.color}15, transparent)`
            : "radial-gradient(closest-side, rgba(2,132,199,0.1), transparent)"
        }}
      />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow text-primary">Interplanetary Grid</div>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">One agentic mesh. Every colony aligned.</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            OrbitChain connects terrestrial settlement with astronomical anchors into a single self-arbitrating digital ecosystem.
          </p>
        </div>

        <div className="relative min-h-[720px] lg:min-h-[700px] flex items-center justify-center">
          <div className="w-full relative">
            
            {/* SVG Connections Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" viewBox="0 0 960 700" fill="none">
              {paths.map((p, idx) => {
                const card = nodes[idx];
                const isActive = activeNode === idx;
                return (
                  <g key={idx}>
                    {isActive && (
                      <path d={p.d} stroke={card.color} strokeWidth="5" strokeLinecap="round" className="opacity-20" style={{ filter: `drop-shadow(0 0 8px ${card.color})` }} />
                    )}
                    <path d={p.d} stroke={isActive ? card.color : "var(--color-border)"} strokeWidth={isActive ? 2 : 1.5} strokeLinecap="round" className="transition-all duration-300" opacity={isActive ? 0.8 : 0.2} />
                    <path d={p.d} stroke={isActive ? card.color : "var(--color-primary)"} strokeWidth={isActive ? 2.5 : 1.5} strokeLinecap="round" fill="none" className={isActive ? "laser-flow-path-active" : "laser-flow-path"} opacity={isActive ? 1 : 0.25} />
                    <circle r={isActive ? 4.5 : 3} fill={isActive ? card.color : "var(--color-primary)"} opacity={isActive ? 1 : 0.4} style={{ filter: isActive ? `drop-shadow(0 0 6px ${card.color})` : "none" }}>
                      <animateMotion dur={isActive ? "2.s" : p.dur} repeatCount="indefinite" path={p.d} />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Central AI Core Wrapper */}
            <div className="eco-core-wrapper">
              <svg className="absolute w-[220px] h-[220px] pointer-events-none z-0" viewBox="0 0 220 220" fill="none">
                <circle cx="110" cy="110" r="82" fill="none" stroke={themeColor} strokeWidth="1" strokeDasharray="45 25 15 25" className="hud-core-rotate-cw" opacity="0.3" style={{ filter: `drop-shadow(0 0 2px ${themeColor})` }} />
                <circle cx="110" cy="110" r="82" fill="none" stroke={themeColor} strokeWidth="1" strokeDasharray="6 12" className="hud-core-rotate-ccw" opacity="0.2" />
                <g className="hud-core-rotate-cw">
                  <path d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" stroke={themeColor} strokeWidth="1.2" fill="none" opacity="0.35" className="transition-colors duration-500" />
                  <circle r="3" fill={themeColor}><animateMotion dur="6s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" /></circle>
                </g>
                <g className="hud-core-rotate-ccw">
                  <path d="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" stroke={themeColor} strokeWidth="1.2" fill="none" opacity="0.35" className="transition-colors duration-500" />
                  <circle r="3" fill={themeColor}><animateMotion dur="4s" repeatCount="indefinite" path="M 35 110 A 75 28 0 1 0 185 110 A 75 28 0 1 0 35 110" /></circle>
                </g>
              </svg>

              <div className="eco-core-glow-bg transition-all duration-500" style={{ background: activeNodeData ? `radial-gradient(circle, ${activeNodeData.color}33 0%, ${activeNodeData.color}11 50%, transparent 70%)` : "radial-gradient(circle, rgba(2, 132, 199, 0.22) 0%, rgba(124, 58, 237, 0.12) 50%, transparent 70%)" }} />
              <div className="eco-core-sphere transition-all duration-500 cursor-pointer group" style={{ borderColor: activeNodeData ? activeNodeData.color : "rgba(2, 132, 199, 0.4)", boxShadow: activeNodeData ? `inset 0 4px 15px rgba(255, 255, 255, 0.2), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 35px ${activeNodeData.color}50` : "inset 0 4px 15px rgba(255, 255, 255, 0.25), inset 0 -8px 25px rgba(0, 0, 0, 0.8), 0 0 45px rgba(2, 132, 199, 0.4)" }}>
                <div className="eco-core-inner-glow" />
                <div className="z-10 text-center flex flex-col items-center select-none">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">ORB-OS</span>
                  <span className="font-display text-sm font-black tracking-tight text-white transition-all duration-300">{activeNodeData ? activeNodeData.coreCode : "CORE"}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mt-1 block" />
                </div>
              </div>
            </div>

            {/* Cards container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:block gap-6">
              {nodes.map((c, idx) => {
                const Icon = c.icon;
                const isActive = activeNode === idx;

                return (
                  <div
                    key={c.title}
                    className="eco-glass-card transition-all duration-300 group cursor-pointer"
                    style={{
                      borderColor: isActive ? c.color : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? `0 12px 35px rgba(0, 0, 0, 0.5), 0 0 20px ${c.color}25, 0 1px 0 rgba(255, 255, 255, 0.08) inset`
                        : "0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
                      transform: isActive ? "translateY(-4px)" : "none"
                    }}
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div className="eco-card-header">
                      <div className="eco-card-title-group">
                        <span
                          className="eco-card-title-icon transition-colors"
                          style={{
                            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                            backgroundColor: isActive ? c.color : "rgba(255, 255, 255, 0.05)",
                            borderColor: isActive ? c.color : "rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <span className="eco-card-title block">{c.title}</span>
                          <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono block">
                            Status: Online
                          </span>
                        </div>
                      </div>
                      <span className="eco-card-index">{c.index}</span>
                    </div>

                    <div className="eco-card-divider" />

                    <div className="relative min-h-[72px] flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {!isActive ? (
                          <motion.div
                            key="metrics"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="eco-card-body"
                          >
                            {c.metrics.map((m) => (
                              <div key={m.label} className="eco-card-metric">
                                <span className="eco-metric-label">{m.label}</span>
                                <span className="eco-metric-value">{m.value}</span>
                              </div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="details"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col gap-2 text-left"
                          >
                            <p className="text-[11px] leading-normal text-white/70">
                              {c.description}
                            </p>
                            <div className="flex flex-col gap-1">
                              <span className="text-[8px] uppercase tracking-widest font-mono text-white/40 block">
                                Orchestrated Agents
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {c.agents.map((agent, i) => (
                                  <span key={i} className="text-[8.5px] font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-white/80 whitespace-nowrap">
                                    {agent}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Trust / Partner scrolling marquee component
function PartnerMarquee() {
  const leftLogoItems = [
    { label: "Ethereum L1", desc: "Settlement Anchor" },
    { label: "Arbitrum L2", desc: "Rollup Scale Engine" },
    { label: "Optimism", desc: "Superchain Relay" },
    { label: "Solana Node", desc: "High TPS Shard" },
    { label: "Ledger", desc: "Secure Custody" },
    { label: "Uniswap", desc: "Liquidity Telemetry" },
    { label: "Polygon", desc: "Aggregated Layer" },
    { label: "MetaMask", desc: "Wallet Interface" },
    { label: "CoinGecko", desc: "Market Exchange Feed" }
  ];

  const logoCarousel = [...leftLogoItems, ...leftLogoItems];

  const stats = [
    { num: 48, suffix: "M+", label: "Transactions Processed", color: "text-cyan-400" },
    { num: 99.98, suffix: "%", label: "Consensus Accuracy", color: "text-emerald-400" },
    { num: 9842, suffix: "", label: "Active Validators", color: "text-cyan-400" },
    { num: 12, suffix: "", label: "Connected Colonies", color: "text-emerald-400" }
  ];

  return (
    <section className="bg-background/20 py-24 overflow-hidden relative border-y border-border/60">
      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-rtl {
          animation: marquee-rtl 35s linear infinite;
        }
      `}</style>

      <div className="mx-auto max-w-4xl px-6 text-center mb-16">
        <div className="eyebrow text-primary">Protocol Alliances</div>
        <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Secured by the global Web3 stack.</h2>
        <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
          Watch settlement finality settle on terrestrial mainnets, rollup sequencers, and decentralized hardware nodes.
        </p>
      </div>

      <div className="mt-8 relative w-full flex items-center justify-center py-5">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-8 animate-marquee-rtl">
          {logoCarousel.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start gap-1 rounded-2xl border border-white/5 bg-card/40 px-6 py-4 backdrop-blur shadow-sm select-none hover:border-primary/20 transition-all duration-300">
              <span className="text-sm font-bold text-white tracking-wide">{item.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, i) => (
          <div key={i} className="border border-border/80 bg-background/50 rounded-2xl p-5 hover:border-primary/30 transition-all duration-300 text-center relative overflow-hidden group">
            <div className="absolute -inset-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle,rgba(2,132,199,0.06)_0%,transparent_70%)] pointer-events-none blur-xl" />
            <div className="relative z-10">
              <div className={cn("text-3xl sm:text-4xl font-extrabold font-display leading-none", st.color)}>
                {st.num}{st.suffix}
              </div>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider font-semibold">{st.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// JourneySection: Transaction Phases snap-scroll timeline
function JourneySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const journeyCards = [
    {
      badge: "PHASE 01",
      title: "Mempool Broadcast",
      subtitle: "Off-world validator anchor receives signed colony value iteration signals from deep space laser relays.",
      phase: "Input Ingestion Shards"
    },
    {
      badge: "PHASE 02",
      title: "Consensus Checkpoint",
      subtitle: "Aggregate shard node checks signatures via BLS validation routines, proving zero-knowledge integrity.",
      phase: "ZKP Prover Pipelines"
    },
    {
      badge: "PHASE 03",
      title: "L2 Batch Compression",
      subtitle: "Sequencer groups thousands of verification shards, creating soft finality proofs in ~250 milliseconds.",
      phase: "Optimistic Sequencers"
    },
    {
      badge: "PHASE 04",
      title: "L1 Settlement Finality",
      subtitle: "Compression batch posted to mainnet contracts, cryptographically sealing block state for perpetuity.",
      phase: "Ethereum Mainnet Settlement"
    },
    {
      badge: "PHASE 05",
      title: "Colony Mesh Sync",
      subtitle: "Laser telemetries broadcast updated ledger parameters to Mars, Luna, and Titan anchors.",
      phase: "Relay Synchronization"
    }
  ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 340; // Card width + gap
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-24 bg-background/10 overflow-hidden border-t border-border/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.04),transparent_50%)] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow text-primary">System Phases</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Stages of Interplanetary Value Flow
            </h2>
          </div>
          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:bg-accent transition cursor-pointer shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:bg-accent transition cursor-pointer shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scroll containers */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {journeyCards.map((card, idx) => (
            <div
              key={card.title}
              className="flex-shrink-0 w-[285px] sm:w-[320px] snap-start rounded-[24px] border border-border/80 bg-card/50 p-6 transition-all duration-300 hover:border-primary/45 hover:shadow-2xl cursor-default flex flex-col justify-between h-[280px]"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2 block">{card.badge}</span>
                <h3 className="text-lg font-bold tracking-tight text-white font-display uppercase">{card.title}</h3>
                <p className="text-xs mt-2.5 leading-relaxed text-muted-foreground font-light leading-relaxed">{card.subtitle}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                <span>Phase core</span>
                <span className="text-primary font-bold">{card.phase}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// HowItWorks steps adapted for Web3
function HowItWorks() {
  const steps = [
    {
      n: "01",
      cat: "BROADCAST",
      t: "Mempool Listener",
      d: "Ingesting raw transaction broadcasts across laser communication networks from colonies.",
      icon: Database
    },
    {
      n: "02",
      cat: "PROVE",
      t: "Zero-Knowledge Check",
      d: "Verifying mathematical signatures and shard hashes on local CPU validator cards.",
      icon: Eye
    },
    {
      n: "03",
      cat: "COMPRESS",
      t: "Rollup Sequencer",
      d: "Arbitrum optimistic rollups package thousands of transaction queues into compressed bytes.",
      icon: Layers
    },
    {
      n: "04",
      cat: "SETTLE",
      t: "L1 Block Settlement",
      d: "Ethereum L1 finalized validators secure the proof, closing the consensus block.",
      icon: ShieldCheck
    },
    {
      n: "05",
      cat: "SYNC",
      t: "Laser Shard Sync",
      d: "Broadcasting finalized states back to deep space nodes to balance ledger balances.",
      icon: Cpu
    }
  ];

  return (
    <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map(({ n, cat, t, d, icon: Icon }, idx) => (
        <li
          key={n}
          className="relative group overflow-hidden rounded-[24px] h-[340px] p-[1.5px] bg-gradient-to-br from-white/10 via-primary/10 to-transparent transition-all duration-300 hover:shadow-[0_0_35px_rgba(2,132,199,0.25)] hover:-translate-y-1 hover:from-white/40 hover:via-primary/30 hover:to-transparent cursor-default select-none"
        >
          <div className="relative w-full h-full rounded-[22.5px] overflow-hidden flex flex-col justify-between p-6 bg-[#05060F]/90">
            {/* Numeral background effect */}
            <div className="absolute top-4 right-6 text-7xl font-black text-muted-foreground/5 select-none tracking-widest font-display">
              {n}
            </div>

            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
              <Icon className="h-5 w-5" />
            </div>

            <div className="text-left mt-auto">
              <div className="text-[9px] font-bold tracking-[0.22em] text-primary uppercase mb-2">
                {cat}
              </div>
              <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
                {t}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-4">
                {d}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Pricing tickets styled component
function PricingSection() {
  const tiers = [
    {
      badge: "Dev Ticket",
      title: "Developer Shard",
      price: "$199",
      period: "Month",
      desc: "Perfect for testing settlement logic on local testnets or orbital satellites.",
      details: [
        { label: "Telemetry", value: "2 Node Streams" },
        { label: "Latency SLA", value: "Standard RTT" },
        { label: "Scheduler", value: "Local Mocking" },
        { label: "Support", value: "Forum Access" }
      ],
      barcodeId: "OC-01-DEV",
      seatNum: "01",
      accentColor: "#0284c7",
      accentGlow: "rgba(2, 132, 199, 0.25)",
      cardBg: "#0b121f",
      cardBgLight: "#131d31"
    },
    {
      badge: "Pro Ticket",
      title: "Consensus Pro",
      price: "$499",
      period: "Month",
      desc: "Full pipeline optimization for active validators, rollups, and local colonies.",
      details: [
        { label: "Telemetry", value: "12 Node Streams" },
        { label: "Latency SLA", value: "Speed of Light" },
        { label: "Scheduler", value: "Optimized Rollup" },
        { label: "Support", value: "24/7 Channel Support" }
      ],
      barcodeId: "OC-02-PRO",
      seatNum: "02",
      accentColor: "#7c3aed",
      accentGlow: "rgba(124, 58, 237, 0.35)",
      cardBg: "#140c24",
      cardBgLight: "#201438"
    },
    {
      badge: "VIP Ticket",
      title: "Colony Scale",
      price: "Custom",
      period: "Enterprise",
      desc: "Complete telemetry mesh for multi-colony systems and galactic scaling rollups.",
      details: [
        { label: "Telemetry", value: "Unlimited Hubs" },
        { label: "Latency SLA", value: "Multi-path Laser" },
        { label: "Scheduler", value: "Agentic Mesh" },
        { label: "Support", value: "Dedicated TAM Link" }
      ],
      barcodeId: "OC-03-VIP",
      seatNum: "99",
      accentColor: "#ef4444",
      accentGlow: "rgba(239, 68, 68, 0.25)",
      cardBg: "#220c18",
      cardBgLight: "#331224"
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden bg-background/25 border-t border-border/40">
      <style>{`
        .ticket-canvas {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1em 0;
        }
        .ticket-wrapper {
          font-size: 11px;
          perspective: 1000px;
          display: inline-block;
          width: 100%;
          max-width: 27em;
        }
        .ticket {
          position: relative;
          width: 100%;
          color: var(--t-text-main, #f8fafc);
          font-family: "Space Grotesk", sans-serif;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s ease;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
          background: transparent;
          filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
          text-align: left;
        }
        .ticket-wrapper:hover .ticket {
          transform: rotateX(5deg) rotateY(-10deg) scale(1.02);
          box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1), -5px -5px 20px var(--t-accent-glow);
        }
        .ticket::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.5em;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 60%, transparent 100%);
          z-index: 10;
          background-size: 250% 250%;
          background-position: 100% 100%;
          transition: background-position 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          mix-blend-mode: overlay;
        }
        .ticket-wrapper:hover .ticket::after {
          background-position: 0% 0%;
        }
        .t-main {
          padding: 2.2em;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at bottom left, transparent 1.2em, var(--t-bg) 1.25em), radial-gradient(circle at bottom right, transparent 1.2em, var(--t-bg) 1.25em);
          background-size: 51% 100%;
          background-position: bottom left, bottom right;
          background-repeat: no-repeat;
          border-top-left-radius: 1.5em;
          border-top-right-radius: 1.5em;
          min-height: 29.5em;
        }
        .t-main::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(var(--t-accent-glow) 1px, transparent 1px), linear-gradient(90deg, var(--t-accent-glow) 1px, transparent 1px);
          background-size: 2em 2em;
          opacity: 0.15;
          z-index: 0;
          pointer-events: none;
          transform: perspective(500px) rotateX(20deg) scale(1.5);
          animation: grid-scroll 25s linear infinite;
        }
        @keyframes grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 4em; }
        }
        .t-content {
          position: relative;
          z-index: 1;
        }
        .t-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2em;
        }
        .t-logo {
          display: flex;
          align-items: center;
          gap: 0.5em;
          font-weight: 900;
          font-size: 1.1em;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .t-logo svg {
          width: 1.4em;
          height: 1.4em;
          fill: var(--t-accent);
          filter: drop-shadow(0 0 5px var(--t-accent));
        }
        .t-type {
          font-size: 0.7em;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--t-accent);
          border: 1.5px solid var(--t-accent);
          padding: 0.35em 0.85em;
          border-radius: 99em;
          font-weight: 800;
        }
        .t-title {
          font-size: 2.6em;
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .t-subtitle {
          color: var(--t-text-muted, #94a3b8);
          font-size: 0.95em;
          margin-bottom: 2.2em;
          min-height: 3.5em;
          line-height: 1.4;
        }
        .t-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.4em;
          margin-bottom: 0.5em;
        }
        .t-detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25em;
        }
        .t-label {
          font-size: 0.65em;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--t-text-muted, #94a3b8);
        }
        .t-value {
          font-size: 1.05em;
          font-weight: 700;
          color: var(--t-text-main, #f8fafc);
        }
        .t-perforation {
          display: flex;
          justify-content: space-between;
          height: 1em;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .t-perf-line {
          flex-grow: 1;
          height: 0;
          border-top: 2px dashed rgba(255, 255, 255, 0.18);
          margin: 0 1.5em;
        }
        .t-stub {
          padding: 2em;
          background: radial-gradient(circle at top left, transparent 1.2em, var(--t-bg-light) 1.25em), radial-gradient(circle at top right, transparent 1.2em, var(--t-bg-light) 1.25em);
          background-size: 51% 100%;
          background-position: top left, top right;
          background-repeat: no-repeat;
          border-bottom-left-radius: 1.5em;
          border-bottom-right-radius: 1.5em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .t-barcode-container {
          display: flex;
          flex-direction: column;
          gap: 0.5em;
        }
        .t-barcode {
          width: 10em;
          height: 3em;
          background: repeating-linear-gradient(90deg, #fff 0, #fff 2px, transparent 2px, transparent 4px, #fff 4px, #fff 5px, transparent 5px, transparent 8px, #fff 8px, #fff 12px, transparent 12px, transparent 15px, #fff 15px, #fff 16px, transparent 16px, transparent 18px);
          opacity: 0.85;
        }
        .t-barcode-id {
          font-family: monospace;
          font-size: 0.7em;
          color: var(--t-text-muted, #94a3b8);
          letter-spacing: 0.18em;
          text-align: left;
        }
        .t-admit {
          text-align: right;
          text-decoration: none;
        }
        .t-admit-text {
          font-size: 0.7em;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--t-text-muted, #94a3b8);
          transition: color 0.3s ease;
        }
        .t-admit-num {
          font-size: 2.8em;
          font-weight: 900;
          line-height: 1;
          color: var(--t-accent);
          text-shadow: 0 0 15px var(--t-accent-glow);
          transition: transform 0.3s ease;
        }
        .ticket-wrapper:hover .ticket {
          transform: rotateX(5deg) rotateY(-10deg) scale(1.02);
        }
        .ticket-wrapper:active .ticket {
          transform: rotateX(15deg) rotateY(-5deg) scale(0.98);
        }
        .t-admit:hover .t-admit-num {
          transform: scale(1.08);
        }
      `}</style>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow text-primary">Consensus access pass</div>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Automated telemetry logs. Transparent cost bounds.</h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Select a validation node ticket pass below to access streaming telemetry feeds. Upgrade or scale anytime.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
          {tiers.map((t, idx) => (
            <div key={idx} className="ticket-canvas w-full">
              <div
                className="ticket-wrapper"
                style={{
                  "--t-bg": t.cardBg,
                  "--t-bg-light": t.cardBgLight,
                  "--t-accent": t.accentColor,
                  "--t-accent-glow": t.accentGlow,
                  "--t-text-main": "#f8fafc",
                  "--t-text-muted": "#94a3b8"
                } as React.CSSProperties}
              >
                <div className="ticket">
                  <div className="t-main">
                    <div className="t-content">
                      <div className="t-header">
                        <div className="t-logo">
                          <Rocket className="h-5 w-5 text-primary" style={{ color: t.accentColor, filter: `drop-shadow(0 0 5px ${t.accentColor})` }} />
                          ORBITCHAIN
                        </div>
                        <div className="t-type">{t.badge}</div>
                      </div>
                      
                      <div className="t-title">
                        {t.price}
                        {t.price !== "Custom" && (
                          <span className="text-[14px] lowercase font-normal text-white/50 tracking-normal ml-1">
                            / {t.period}
                          </span>
                        )}
                      </div>
                      
                      <div className="t-subtitle">{t.desc}</div>
                      
                      <div className="t-details">
                        {t.details.map((detail, dIdx) => (
                          <div key={dIdx} className="t-detail-item">
                            <span className="t-label">{detail.label}</span>
                            <span className="t-value">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div
                      className="t-perforation"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        transform: "translateY(50%)"
                      }}
                    >
                      <div className="t-perf-line"></div>
                    </div>
                  </div>
                  
                  <div className="t-stub">
                    <div className="t-barcode-container">
                      <div className="t-barcode"></div>
                      <div className="t-barcode-id">{t.barcodeId}</div>
                    </div>
                    
                    {t.price === "Custom" ? (
                      <a href="mailto:hello@orbitchain.net" className="t-admit">
                        <div className="t-admit-text">Access</div>
                        <div className="t-admit-num font-mono">{t.seatNum}</div>
                      </a>
                    ) : (
                      <Link to="/mission-control" className="t-admit">
                        <div className="t-admit-text">Access</div>
                        <div className="t-admit-num font-mono">{t.seatNum}</div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <circle cx="100" cy="100" r="95" strokeWidth="0.35" strokeDasharray="1.5 3" className="hud-rotate-cw origin-center" />
            <circle cx="100" cy="100" r="85" strokeWidth="0.5" strokeDasharray="8 12" className="hud-rotate-ccw origin-center" />
            <circle cx="100" cy="100" r="70" strokeWidth="0.35" strokeDasharray="30 6" className="hud-rotate-cw origin-center" />
            <circle cx="100" cy="100" r="58" strokeWidth="0.35" strokeDasharray="1 5" className="hud-rotate-ccw origin-center" />
            <circle cx="100" cy="100" r="42" strokeWidth="0.25" strokeDasharray="15 3" className="hud-rotate-cw origin-center" />
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

        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center flex flex-col items-center w-full"
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

            {/* CommandCenter Interactive tabbed dashboard */}
            <div className="mt-16 w-full">
              <CommandCenter />
            </div>

          </motion.div>
        </div>
      </section>

      {/* Partner scroll strip & stats cards */}
      <PartnerMarquee />

      {/* 5 steps of the pipeline */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow text-primary">Consensus pipeline</span>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Five steps to rollup settlement.
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            Witness how telemetry shards route transactions from mempool listeners to Ethereum L1 state logs.
          </p>
        </div>
        <HowItWorks />
      </section>

      {/* Journey carousel snap shelf */}
      <JourneySection />

      {/* SVG Interactive network node mesh */}
      <EcosystemSection />

      {/* Bento grid */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Mission Modules</div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Every subsystem.<br />
            <span className="text-muted-foreground">One console.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground text-sm sm:text-base leading-relaxed">
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

          {/* Uptime Reliability */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            eyebrow="Uptime"
            title="99.98% synced"
            body="Cross-colony consensus across 12 orbital nodes, four planetary anchors."
            icon={ShieldCheck}
          />

          {/* Performance */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            eyebrow="Latency"
            title="~250ms finality"
            body="Sub-second confirmations on Arbitrum — before the next radar sweep."
            icon={Gauge}
          />
        </div>
      </section>

      {/* Ticket Pricing Passes */}
      <PricingSection />

      {/* FAQ Accordion */}
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
  icon?: any;
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
      <div
        className="absolute -inset-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(circle, ${accentGlow} 0%, transparent 70%)`
        }}
      />
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

const faqData = [
  {
    question: "What is OrbitChain?",
    answer: "OrbitChain is a real-time visualization, telemetry, and monitoring console designed for interplanetary Web3 economies. We integrate live telemetry indicators, validator consensus sync states, optimistic rollup L2 sequencing pipelines, and proof-of-work simulation models into a unified mission control cockpit."
  },
  {
    question: "How does the Interplanetary Relay compute speed-of-light delays?",
    answer: "Our relay calculates the physical speed-of-light RTT (Round Trip Time) between Earth and planetary anchors based on current orbital distances. For instance, Luna crater pings return in ~1.28 seconds, Mars Prime relays take between 4 to 20 minutes depending on alignment, and Titan stations require roughly 79 minutes."
  },
  {
    question: "What consensus mechanism is used by colony shards?",
    answer: "Colony shards run local Proof-of-Stake consensus with aggregate BLS multi-signatures. Shard blocks are compressed and sequencers pack them into optimistic rollups, ensuring local operations remain fast and responsive even during high solar radiation interference."
  },
  {
    question: "How are transactions settled on Ethereum L1?",
    answer: "Compressions are batched off-chain and posted via rollups to smart contracts on Ethereum Mainnet. This ensures every transaction—regardless of whether it originated on Earth, Mars, or Titan—is secured by Ethereum's ultimate cryptographic security SLA."
  },
  {
    question: "Are transaction fees higher for off-world colony anchors?",
    answer: "No. Thanks to L2 rollup batch compression, transaction fees remain low and uniform—averaging just $0.04 USD per payload. However, highly latent outer anchors utilize optimistic relay buffers to queues state changes before finalizing."
  }
];

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
                    <div className="absolute w-4.5 h-[1.5px] bg-muted-foreground group-hover:bg-primary transition-colors duration-200" />
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

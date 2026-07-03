import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, RefreshCw, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SiteLayout } from "@/components/SiteLayout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mission-control")({
  head: () => ({
    meta: [
      { title: "Mission Control — Live Markets · OrbitChain" },
      { name: "description", content: "Live crypto market telemetry — Bitcoin, Ethereum, Arbitrum and Solana prices, market cap, volume and charts." },
      { property: "og:title", content: "Mission Control — OrbitChain" },
      { property: "og:description", content: "Real-time crypto market dashboard powered by CoinGecko." },
    ],
  }),
  component: MissionControl,
});

type Coin = { id: string; symbol: string; name: string };
const COINS: Coin[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "arbitrum", symbol: "ARB", name: "Arbitrum" },
  { id: "solana", symbol: "SOL", name: "Solana" },
];

type Price = {
  usd: number;
  usd_24h_change: number;
  usd_market_cap: number;
  usd_24h_vol: number;
};
type PriceMap = Record<string, Price>;
type Timeframe = "1" | "7" | "30";

function MissionControl() {
  const [prices, setPrices] = useState<PriceMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [selected, setSelected] = useState<string>("bitcoin");
  const [timeframe, setTimeframe] = useState<Timeframe>("1");
  const [chart, setChart] = useState<{ t: number; p: number }[] | null>(null);
  const [chartLoading, setChartLoading] = useState(false);

  const fetchPrices = useCallback(async () => {
    setError(null);
    try {
      const ids = COINS.map((c) => c.id).join(",");
      const r = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
      );
      if (!r.ok) throw new Error(`Feed error ${r.status}`);
      const data = (await r.json()) as PriceMap;
      setPrices(data);
      setLastUpdated(Date.now());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchChart = useCallback(async (id: string, days: Timeframe) => {
    setChartLoading(true);
    try {
      const r = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
      );
      if (!r.ok) throw new Error("Chart feed error");
      const data = (await r.json()) as { prices: [number, number][] };
      setChart(data.prices.map(([t, p]) => ({ t, p })));
    } catch {
      setChart(null);
    } finally {
      setChartLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const id = setInterval(fetchPrices, 45_000);
    return () => clearInterval(id);
  }, [fetchPrices]);

  useEffect(() => {
    fetchChart(selected, timeframe);
  }, [selected, timeframe, fetchChart]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const secondsAgo = lastUpdated ? Math.max(0, Math.floor((now - lastUpdated) / 1000)) : null;

  const summary = useMemo(() => {
    if (!prices) return null;
    const rows = COINS.map((c) => ({ ...c, ch: prices[c.id]?.usd_24h_change ?? 0 }));
    const gainer = rows.reduce((a, b) => (a.ch > b.ch ? a : b));
    const loser = rows.reduce((a, b) => (a.ch < b.ch ? a : b));
    return { gainer, loser };
  }, [prices]);

  const selectedCoin = COINS.find((c) => c.id === selected)!;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
          <div className="min-w-0">
            <div className="eyebrow">Mission Control</div>
            <h1 className="mt-2 truncate text-4xl font-bold tracking-tight sm:text-5xl">Live market telemetry.</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Streaming price data from every colony's exchange feed via CoinGecko.
              Auto-refreshes every 45 seconds.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right text-xs text-muted-foreground sm:block">
              {error ? (
                <span className="text-destructive">Feed error</span>
              ) : lastUpdated ? (
                <>Updated {secondsAgo}s ago</>
              ) : (
                <>Connecting…</>
              )}
            </div>
            <button
              onClick={fetchPrices}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      {summary && (
        <section className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <div className="surface flex flex-wrap items-center justify-between gap-4 px-5 py-3 text-sm">
            <div className="flex items-center gap-4">
              <span className="eyebrow">Top gainer</span>
              <span className="font-semibold">{summary.gainer.name}</span>
              <span className="font-mono text-success">+{summary.gainer.ch.toFixed(2)}%</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="eyebrow">Top loser</span>
              <span className="font-semibold">{summary.loser.name}</span>
              <span className="font-mono text-destructive">{summary.loser.ch.toFixed(2)}%</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="eyebrow">Gas (illustrative)</span>
              <span className="font-mono">ETH L1: ~24 gwei</span>
              <span className="font-mono text-primary">ARB L2: ~0.1 gwei</span>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {error && !prices && (
          <div className="surface flex items-center gap-3 border-destructive/40 p-6 text-sm">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div className="flex-1">
              <div className="font-semibold">Signal lost.</div>
              <div className="text-muted-foreground">{error}. Retry to re-establish contact.</div>
            </div>
            <button onClick={fetchPrices} className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
              Retry
            </button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading && !prices
            ? COINS.map((c) => <SkeletonCard key={c.id} />)
            : COINS.map((c, i) => (
                <PriceCard
                  key={c.id}
                  coin={c}
                  data={prices?.[c.id]}
                  selected={selected === c.id}
                  onSelect={() => setSelected(c.id)}
                  delay={i * 0.04}
                />
              ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="surface p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="eyebrow">Trajectory</div>
              <h2 className="mt-1 truncate text-xl font-semibold">
                {selectedCoin.name} <span className="text-muted-foreground">/ USD</span>
              </h2>
            </div>
            <div className="flex shrink-0 rounded-full border border-border bg-card p-1 text-xs font-medium">
              {(["1", "7", "30"] as Timeframe[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    "rounded-full px-3 py-1 transition",
                    timeframe === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t === "1" ? "24H" : t === "7" ? "7D" : "30D"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-72">
            {chartLoading || !chart ? (
              <div className="skeleton-shimmer h-full w-full rounded-lg" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="t"
                    tickFormatter={(t) => {
                      const d = new Date(t);
                      return timeframe === "1"
                        ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : d.toLocaleDateString([], { month: "short", day: "numeric" });
                    }}
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    minTickGap={40}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickFormatter={(v) => `$${Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    width={70}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "var(--foreground)",
                    }}
                    labelFormatter={(t) => new Date(t as number).toLocaleString()}
                    formatter={(v: number) => [`$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, "Price"]}
                  />
                  <Area type="monotone" dataKey="p" stroke="var(--primary)" strokeWidth={2} fill="url(#priceFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function PriceCard({
  coin, data, selected, onSelect, delay,
}: { coin: Coin; data?: Price; selected: boolean; onSelect: () => void; delay: number }) {
  const up = (data?.usd_24h_change ?? 0) >= 0;
  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "surface group text-left p-5 transition-all hover:-translate-y-0.5",
        selected ? "border-primary/60 glow-primary" : "hover:border-primary/30",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{coin.name}</div>
          <div className="text-xs text-muted-foreground">{coin.symbol}</div>
        </div>
        {data && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 font-mono text-xs",
              up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}
          >
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {data.usd_24h_change.toFixed(2)}%
          </span>
        )}
      </div>
      <div className="mt-4 font-mono text-2xl font-semibold tabular-nums">
        {data ? `$${data.usd.toLocaleString(undefined, { maximumFractionDigits: data.usd < 10 ? 3 : 2 })}` : "—"}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div>
          <div className="eyebrow">Market cap</div>
          <div className="mt-0.5 font-mono">{data ? formatCompact(data.usd_market_cap) : "—"}</div>
        </div>
        <div>
          <div className="eyebrow">24h vol</div>
          <div className="mt-0.5 font-mono">{data ? formatCompact(data.usd_24h_vol) : "—"}</div>
        </div>
      </div>
    </motion.button>
  );
}

function SkeletonCard() {
  return (
    <div className="surface space-y-4 p-5">
      <div className="skeleton-shimmer h-4 w-24 rounded" />
      <div className="skeleton-shimmer h-8 w-32 rounded" />
      <div className="grid grid-cols-2 gap-2">
        <div className="skeleton-shimmer h-8 rounded" />
        <div className="skeleton-shimmer h-8 rounded" />
      </div>
    </div>
  );
}

function formatCompact(n: number) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

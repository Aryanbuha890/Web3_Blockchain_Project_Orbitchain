import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Pickaxe, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mining-reactor")({
  head: () => ({
    meta: [
      { title: "Mining Reactor — SHA-256 Blockchain Simulator · OrbitChain" },
      { name: "description", content: "Interactive proof-of-work simulator: mine blocks with real SHA-256 hashing in your browser and watch chain integrity break in real time." },
      { property: "og:title", content: "Mining Reactor — OrbitChain" },
      { property: "og:description", content: "Real SHA-256 proof-of-work in the browser." },
    ],
  }),
  component: MiningReactor,
});

const GENESIS = "0".repeat(64);

async function sha256(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type BlockState = {
  data: string;
  nonce: number;
  hash: string;
  mined: boolean;
  mining: boolean;
  attempt: string;
  attemptNonce: number;
};

function makeInitial(data: string): BlockState {
  return { data, nonce: 0, hash: "", mined: false, mining: false, attempt: "", attemptNonce: 0 };
}

function MiningReactor() {
  const [difficulty, setDifficulty] = useState<"0" | "00" | "000" | "0000">("000");
  const [block1, setBlock1] = useState<BlockState>(() => makeInitial("Colony Alpha → Colony Beta: 42 ORB"));
  const [block2, setBlock2] = useState<BlockState>(() => makeInitial("Mars ↔ Luna settlement batch #7"));
  const cancelRef = useRef<{ b1: boolean; b2: boolean }>({ b1: false, b2: false });

  const prev1 = GENESIS;
  const prev2 = block1.hash || GENESIS;

  const mine = useCallback(
    async (which: "b1" | "b2") => {
      const target = difficulty;
      const setter = which === "b1" ? setBlock1 : setBlock2;
      const state = which === "b1" ? block1 : block2;
      const prev = which === "b1" ? prev1 : prev2;

      cancelRef.current[which] = false;
      setter((s) => ({ ...s, mining: true, mined: false, hash: "" }));

      let nonce = 0;
      let hash = "";
      const start = performance.now();
      let lastPaint = start;

      while (!cancelRef.current[which]) {
        hash = await sha256(state.data + prev + nonce);
        if (hash.startsWith(target)) break;
        nonce++;
        const nowT = performance.now();
        if (nowT - lastPaint > 40) {
          lastPaint = nowT;
          setter((s) => ({ ...s, attempt: hash, attemptNonce: nonce }));
          await new Promise((r) => setTimeout(r, 0));
        }
      }

      if (cancelRef.current[which]) {
        setter((s) => ({ ...s, mining: false }));
        return;
      }
      setter((s) => ({ ...s, mining: false, mined: true, hash, nonce, attempt: hash, attemptNonce: nonce }));
    },
    [block1, block2, difficulty, prev1, prev2],
  );

  const chainBroken = block2.mined && block2.hash && !block2.hash.startsWith(difficulty);
  // If block1 changes after block2 mined, block2's stored hash was computed with the old prev; recompute check
  const [block2Valid, setBlock2Valid] = useState(true);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!block2.mined) {
        setBlock2Valid(true);
        return;
      }
      const recomputed = await sha256(block2.data + (block1.hash || GENESIS) + block2.nonce);
      if (!cancelled) setBlock2Valid(recomputed === block2.hash && recomputed.startsWith(difficulty));
    })();
    return () => { cancelled = true; };
  }, [block1.hash, block2.data, block2.nonce, block2.hash, block2.mined, difficulty]);

  const block1Valid = !block1.mined || block1.hash.startsWith(difficulty);

  useEffect(() => {
    return () => {
      cancelRef.current.b1 = true;
      cancelRef.current.b2 = true;
    };
  }, []);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <div className="eyebrow">Reactor Core</div>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Mining Reactor.</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Real SHA-256 proof-of-work, computed in your browser via the Web Crypto API.
              Edit a mined block and watch the downstream chain break instantly.
            </p>
          </div>
          <div className="shrink-0">
            <label className="eyebrow block mb-1">Difficulty</label>
            <div className="flex rounded-full border border-border bg-card p-1 text-xs font-medium">
              {(["0", "00", "000", "0000"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-full px-3 py-1 font-mono",
                    difficulty === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {d}…
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-4 px-4 pb-16 sm:px-6 lg:px-8">
        <BlockCard
          index={1}
          block={block1}
          prev={prev1}
          difficulty={difficulty}
          valid={block1Valid}
          onDataChange={(v) => setBlock1((s) => ({ ...s, data: v, mined: false, hash: "" }))}
          onNonceChange={(v) => setBlock1((s) => ({ ...s, nonce: v, mined: false, hash: "" }))}
          onMine={() => mine("b1")}
        />
        <BlockCard
          index={2}
          block={block2}
          prev={prev2}
          difficulty={difficulty}
          valid={block2Valid && !chainBroken}
          chainBroken={!block2Valid && block2.mined}
          onDataChange={(v) => setBlock2((s) => ({ ...s, data: v, mined: false, hash: "" }))}
          onNonceChange={(v) => setBlock2((s) => ({ ...s, nonce: v, mined: false, hash: "" }))}
          onMine={() => mine("b2")}
        />
      </section>
    </SiteLayout>
  );
}

function BlockCard({
  index, block, prev, difficulty, valid, chainBroken, onDataChange, onNonceChange, onMine,
}: {
  index: number;
  block: BlockState;
  prev: string;
  difficulty: string;
  valid: boolean;
  chainBroken?: boolean;
  onDataChange: (v: string) => void;
  onNonceChange: (v: number) => void;
  onMine: () => void;
}) {
  const status = block.mining
    ? { label: "Mining…", tone: "muted" as const }
    : chainBroken
      ? { label: "Invalid — chain broken", tone: "danger" as const }
      : block.mined && valid
        ? { label: "Valid", tone: "success" as const }
        : { label: "Unmined", tone: "muted" as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "surface p-6 transition-colors",
        chainBroken && "border-destructive/60",
        block.mined && valid && !chainBroken && "border-success/40",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <div className="eyebrow">Block #{index}</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">
            target: hash starts with <span className="text-foreground">{difficulty}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className="eyebrow mb-1 block">Block Data</label>
          <textarea
            value={block.data}
            onChange={(e) => onDataChange(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-3">
          <div>
            <label className="eyebrow mb-1 block">Previous Hash</label>
            <div className="rounded-md border border-border bg-background/40 px-3 py-2 font-mono text-xs break-all text-muted-foreground">
              {prev}
            </div>
          </div>
          <div>
            <label className="eyebrow mb-1 block">Nonce</label>
            <input
              type="number"
              value={block.mining ? block.attemptNonce : block.nonce}
              onChange={(e) => onNonceChange(Number(e.target.value) || 0)}
              className="w-full rounded-md border border-border bg-background/60 px-3 py-2 font-mono text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="eyebrow mb-1 block">
          {block.mining ? "Current hash attempt" : "Block Hash"}
        </label>
        <div
          className={cn(
            "rounded-md border px-3 py-2 font-mono text-xs break-all",
            chainBroken
              ? "border-destructive/40 bg-destructive/5 text-destructive"
              : block.mined && valid
                ? "border-success/40 bg-success/5 text-success"
                : "border-border bg-background/40 text-muted-foreground",
          )}
        >
          {block.mining ? block.attempt || "…" : block.hash || "—"}
        </div>
      </div>

      {chainBroken && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Chain integrity compromised. This block's stored hash no longer matches its
            recomputed hash against the current previous block. Re-mine to restore validity.
          </span>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {block.mining ? (
            <>Nonce iterations: <span className="font-mono text-foreground">{block.attemptNonce.toLocaleString()}</span></>
          ) : block.mined ? (
            <>Solved at nonce <span className="font-mono text-foreground">{block.nonce.toLocaleString()}</span></>
          ) : (
            "Ready to mine."
          )}
        </div>
        <button
          onClick={onMine}
          disabled={block.mining}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {block.mining ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Mining…</>
          ) : (
            <><Pickaxe className="h-4 w-4" /> Mine Block</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: { label: string; tone: "success" | "danger" | "muted" } }) {
  const tone = status.tone;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        tone === "success" && "border-success/40 bg-success/10 text-success",
        tone === "danger" && "border-destructive/40 bg-destructive/10 text-destructive",
        tone === "muted" && "border-border bg-card text-muted-foreground",
      )}
    >
      {tone === "success" && <CheckCircle2 className="h-3.5 w-3.5" />}
      {tone === "danger" && <XCircle className="h-3.5 w-3.5" />}
      {tone === "muted" && <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />}
      {status.label}
    </span>
  );
}

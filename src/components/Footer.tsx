import { Link } from "@tanstack/react-router";
import { Github, Twitter, Orbit } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <Orbit className="h-5 w-5 text-primary" />
              OrbitChain
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Mission control for the interplanetary Web3 economy.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              All systems operational
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Modules</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Mission HQ</Link></li>
              <li><Link to="/galaxy" className="hover:text-foreground">Galaxy Explorer</Link></li>
              <li><Link to="/mission-control" className="hover:text-foreground">Mission Control</Link></li>
              <li><Link to="/mining-reactor" className="hover:text-foreground">Mining Reactor</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Crew</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Built by: Your Name</li>
              <li>Cohort: Batch 00</li>
              <li>Version: 1.0.0-orbit</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Signals</div>
            <div className="flex gap-3">
              <a href="#" aria-label="GitHub" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} OrbitChain — a mission simulation.</span>
          <span>Ethereum L1 · Arbitrum L2 · Off-world nodes: 12</span>
        </div>
      </div>
    </footer>
  );
}

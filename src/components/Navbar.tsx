import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Orbit, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Mission HQ" },
  { to: "/galaxy", label: "Galaxy Explorer" },
  { to: "/mission-control", label: "Mission Control" },
  { to: "/mining-reactor", label: "Mining Reactor" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <motion.header
      initial={false}
      animate={{
        paddingTop: scrolled ? 10 : 18,
        paddingBottom: scrolled ? 10 : 18,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
    >
      <motion.div
        initial={false}
        animate={{
          maxWidth: scrolled ? 860 : 1180,
          paddingLeft: scrolled ? 16 : 24,
          paddingRight: scrolled ? 8 : 12,
          paddingTop: scrolled ? 6 : 10,
          paddingBottom: scrolled ? 6 : 10,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className={cn(
          "relative mx-auto flex items-center justify-between rounded-full border backdrop-blur-2xl transition-shadow duration-300",
          theme === "dark"
            ? "border-white/15 bg-slate-950/75 shadow-[0_20px_60px_-20px_rgba(2,6,23,0.85),inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_-1px_0_0_rgba(255,255,255,0.04)]"
            : "border-slate-200/80 bg-white/75 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(255,255,255,0.6)]"
        )}
      >
        {/* Top gloss reflection sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-0 h-1/2 rounded-t-full opacity-60"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Soft colorful background glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{
            background: theme === "dark"
              ? "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0) 55%)"
              : "radial-gradient(120% 80% at 10% 0%, rgba(2,132,199,0.08) 0%, rgba(2,132,199,0) 55%), radial-gradient(120% 80% at 90% 100%, rgba(124,58,237,0.06) 0%, rgba(124,58,237,0) 55%)",
          }}
        />

        {/* Gradient border ring */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-full"
          style={{
            background: theme === "dark"
              ? "linear-gradient(120deg, rgba(56,189,248,0.55), rgba(124,58,237,0.4), rgba(99,102,241,0.5))"
              : "linear-gradient(120deg, rgba(2,132,199,0.45), rgba(124,58,237,0.3), rgba(2,132,199,0.3))",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            opacity: scrolled ? 0.85 : 0.4,
          }}
        />

        {/* Logo */}
        <Link to="/" className="relative flex shrink-0 items-center gap-2.5 font-display font-bold tracking-tight">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(2,132,199,0.2)]">
            <Orbit className="h-4.5 w-4.5 text-primary animate-pulse" strokeWidth={2.2} />
          </div>
          <span className={cn("transition-all text-foreground", scrolled ? "text-sm" : "text-base")}>
            OrbitChain
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="relative hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-full font-medium transition-all px-4 py-1.5 text-[13.5px]",
                  active
                    ? "bg-primary/10 text-primary border border-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground border border-transparent hover:bg-muted/50",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Theme Toggle & Launch */}
        <div className="relative hidden md:flex md:items-center md:gap-3">
          <button
            onClick={toggleTheme}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:bg-muted hover:text-foreground cursor-pointer shadow-sm",
              scrolled ? "h-8 w-8" : "h-9 w-9",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <Link
            to="/mission-control"
            className={cn(
              "group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full font-semibold text-white shadow-md transition-all hover:-translate-y-px hover:shadow-lg",
              scrolled ? "px-4.5 py-1.5 text-xs h-8" : "px-6 py-2 h-9.5 text-sm",
            )}
            style={{
              backgroundImage: "linear-gradient(120deg, var(--color-primary) 0%, var(--color-secondary) 110%)",
            }}
          >
            <span className="relative z-10">Launch</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-750 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile menu toggle & Theme toggle */}
        <div className="flex items-center gap-1.5 md:hidden relative z-10">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <button
            className="rounded-full p-2 text-muted-foreground cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl border shadow-2xl flex flex-col gap-2.5 md:hidden z-50",
                theme === "dark" ? "bg-slate-950/95 border-white/10" : "bg-white/95 border-slate-200"
              )}
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => {
                  const active = pathname === l.to;
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"
                      )}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-2 border-t border-border/50">
                <Link
                  to="/mission-control"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-full items-center justify-center rounded-xl text-sm font-semibold text-white"
                  style={{
                    backgroundImage: "linear-gradient(120deg, var(--color-primary) 0%, var(--color-secondary) 110%)",
                  }}
                >
                  Launch Console
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

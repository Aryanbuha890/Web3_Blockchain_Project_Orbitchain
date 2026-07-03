import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Orbit, Sun, Moon } from "lucide-react";
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
    <div className="sticky top-0 z-50 flex justify-center px-3 pt-3 sm:px-6">
      <header
        className={cn(
          "w-full transition-all duration-300 ease-out",
          "rounded-full border border-border/60 bg-background/70 backdrop-blur-xl",
          scrolled
            ? "max-w-3xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
            : "max-w-6xl",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300 ease-out",
            scrolled ? "h-12 px-3 sm:px-4" : "h-16 px-4 sm:px-6",
          )}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display font-bold tracking-tight">
            <Orbit
              className={cn("text-primary transition-all", scrolled ? "h-4 w-4" : "h-5 w-5")}
              strokeWidth={2.2}
            />
            <span className={cn("transition-all", scrolled ? "text-sm" : "text-lg")}>OrbitChain</span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "rounded-full font-medium transition-all",
                    scrolled ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Mode Theme Toggle and Launch Button */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <button
              onClick={toggleTheme}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all hover:bg-muted hover:text-foreground cursor-pointer shadow-sm",
                scrolled ? "h-7 w-7" : "h-9 w-9",
              )}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className={cn("transition-all", scrolled ? "h-3.5 w-3.5" : "h-4.5 w-4.5")} />
              ) : (
                <Moon className={cn("transition-all", scrolled ? "h-3.5 w-3.5" : "h-4.5 w-4.5")} />
              )}
            </button>
            <Link
              to="/mission-control"
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:scale-[1.03]",
                scrolled ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm",
              )}
            >
              Launch
            </Link>
          </div>

          {/* Mobile Theme Toggle and Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              className="rounded-full p-2 text-muted-foreground cursor-pointer"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-border/60 md:hidden">
            <nav className="flex flex-col gap-1 px-3 py-3">
              {links.map((l) => {
                const active = pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium",
                      active ? "bg-primary/15 text-primary" : "text-muted-foreground",
                    )}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

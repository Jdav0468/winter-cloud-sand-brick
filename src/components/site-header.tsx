import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { Mark } from "@/components/mark";
import { COMPANY } from "@/lib/content";
import { cn } from "@/lib/cn";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/quote", label: "Request a truck" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-visible px-5 py-3 md:px-8">
        <Link to="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Mark />
        </Link>

        <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                path === link.to ? "font-display text-base tracking-widest text-pine" : "font-display text-base tracking-widest text-muted hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/videos"
            className={cn(
              "font-display text-base tracking-widest transition-colors duration-200",
              path === "/videos" ? "text-pine" : "text-muted hover:text-ink",
            )}
          >
            Videos
          </Link>
          <a
            href={COMPANY.news.href}
            target="_blank"
            rel="noreferrer"
            className="font-display text-base tracking-widest text-muted transition-colors duration-200 hover:text-ink"
          >
            {COMPANY.news.label}
          </a>
          <a
            href={COMPANY.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 bg-pine px-4 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-pine-deep"
          >
            <Phone className="size-4" aria-hidden="true" />
            {COMPANY.phone}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-cream px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex min-h-11 items-center text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/videos"
                className="flex min-h-11 items-center text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                Videos
              </Link>
            </li>
            <li>
              <a
                href={COMPANY.news.href}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center text-base font-medium text-ink"
              >
                {COMPANY.news.label}
              </a>
            </li>
            <li>
              <a href={COMPANY.phoneHref} className="flex min-h-11 items-center gap-2 font-semibold text-pine">
                <Phone className="size-4" aria-hidden="true" />
                Call {COMPANY.phone}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { Mark } from "@/components/mark";
import { COMPANY } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-16">
        <div className="md:col-span-5">
          <Mark className="h-24 md:h-28" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-mist">
            {COMPANY.legal}. {COMPANY.dba}. A freight brokerage covering the contiguous United States.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-mist">Visit</p>
          <address className="mt-3 text-sm not-italic leading-6">
            {COMPANY.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-mist">Desk</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <a href={COMPANY.phoneHref} className="inline-flex min-h-11 items-center font-semibold">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="inline-flex min-h-11 items-center break-all">
                {COMPANY.email}
              </a>
            </li>
            <li className="pt-2 text-mist">MC {COMPANY.mc} · Licensed, bonded & insured</li>
          </ul>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Footer">
            <Link to="/" className="underline decoration-copper underline-offset-4">
              Home
            </Link>
            <Link to="/services" className="underline decoration-copper underline-offset-4">
              Services
            </Link>
            <Link to="/about" className="underline decoration-copper underline-offset-4">
              About
            </Link>
            <Link
              to="/quote"
              search={{ origin: "", destination: "", equipment: "", commodity: "" }}
              className="underline decoration-copper underline-offset-4"
            >
              Request a truck
            </Link>
            <a href="/#videos" className="underline decoration-copper underline-offset-4">
              Videos
            </a>
            <a
              href={COMPANY.news.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-copper underline-offset-4"
            >
              {COMPANY.news.label}
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-mist md:px-8">
          © {new Date().getFullYear()} {COMPANY.legal}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

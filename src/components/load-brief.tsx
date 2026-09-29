import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { COMPANY } from "@/lib/content";

const fieldClass =
  "mt-2 w-full border border-line bg-paper px-3 py-3 text-base text-ink outline-none";

export function LoadBrief() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [mailto, setMailto] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setError("Add your name.");
      setMailto("");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Use a real email so the brief can reach you.");
      setMailto("");
      return;
    }
    const body = [
      "Please sign me up for Daily Logistics News — The Ro-Mac Brief.",
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      company.trim() ? `Company: ${company.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    setError("");
    setMailto(
      `mailto:${COMPANY.email}?subject=${encodeURIComponent("Sign up for The Ro-Mac Brief")}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <form className="border border-line bg-cream p-5 md:p-7" onSubmit={onSubmit} noValidate>
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">The Ro-Mac Brief</p>
          <h2 className="mt-2 font-display text-3xl text-ink">Sign up for the news</h2>
        </div>
        <a
          href={COMPANY.news.href}
          target="_blank"
          rel="noreferrer"
          className="hidden text-right text-xs font-semibold uppercase tracking-widest text-ink underline decoration-copper underline-offset-4 sm:block"
        >
          Read it
        </a>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
        Daily Logistics News, in plain language. Leave your name and email. We will add you from the desk.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input
            className={fieldClass}
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            className={fieldClass}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink sm:col-span-2">
          Company <span className="font-normal text-muted">(optional)</span>
          <input
            className={fieldClass}
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            autoComplete="organization"
          />
        </label>
      </div>

      {error ? <p className="mt-4 text-sm text-pine">{error}</p> : null}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-6 text-muted">
          This opens an email to {COMPANY.email}. It is not sent until you press send.
        </p>
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-pine px-5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-pine-deep"
        >
          Sign me up
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>

      {mailto ? (
        <a
          href={mailto}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email my signup
        </a>
      ) : null}
    </form>
  );
}

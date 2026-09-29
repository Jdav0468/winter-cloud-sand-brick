import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { COMPANY, TEAM, TIMELINE } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ro-Mac Logistics" },
      {
        name: "description",
        content:
          "Founded in 1991. Ro-Mac Transportation, Inc. is a licensed, bonded, and insured freight brokerage.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="About the company"
        title="A small desk, on purpose."
        lede="Founded in 1991, Ro-Mac Transportation has handled full-service brokerage for large and small shippers. MC 273349. Licensed, bonded, insured, and still more interested in keeping its word than in looking big."
      />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
          <blockquote className="md:col-span-5">
            <span className="block h-1 w-10 bg-copper" aria-hidden="true" />
            <p className="mt-6 font-display text-4xl leading-tight text-ink">“My word is my bond.”</p>
            <footer className="mt-4 text-sm text-muted">Jennifer Rowe, founder · 1991–2021</footer>
          </blockquote>
          <div className="md:col-span-7 md:border-l md:border-line md:pl-10">
            <p className="text-lg leading-relaxed text-ink">
              Jennifer came out of air freight and started the company because she wanted a freight house
              that behaved itself. She believed the strength of Ro-Mac was in hard-working, honest people —
              not in headcount or bells and whistles.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted">
              She died in 2021 and is missed by the people who hauled for her and shipped with her. The
              company stayed open to keep the things she stood for, under Jason Davis, who has run the desk
              since long before then.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">The line of the company</p>
          <ol className="mt-8">
            {TIMELINE.map((item) => (
              <li key={item.year} className="grid gap-2 border-t border-line py-6 md:grid-cols-12 md:gap-6">
                <p className="font-display text-2xl text-ink md:col-span-2">{item.year}</p>
                <h2 className="font-display text-2xl md:col-span-4">{item.title}</h2>
                <p className="text-sm leading-6 text-muted md:col-span-6">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">The desk today</p>
          <h2 className="mt-3 font-display text-4xl">People, not a call tree.</h2>
          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {TEAM.map((person) => (
              <li key={person.name} className="border border-line bg-cream p-6">
                <p className="font-display text-5xl text-pine/30" aria-hidden="true">
                  {initials(person.name)}
                </p>
                <h3 className="mt-4 font-display text-2xl text-ink">{person.name}</h3>
                <p className="mt-1 text-sm font-semibold text-pine">
                  {person.role} · {person.since}
                </p>
                <p className="mt-4 text-sm leading-6 text-muted">{person.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-sand text-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-mist">Authority</p>
            <h2 className="mt-3 font-display text-4xl">MC {COMPANY.mc}</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-mist">
              {COMPANY.legal}, doing business as {COMPANY.name}, is fully licensed, bonded, and insured.
              Brokerage only — your freight moves with carriers we have already screened.
            </p>
          </div>
          <address className="not-italic">
            <p className="text-xs font-semibold uppercase tracking-widest text-mist">Office</p>
            <p className="mt-3 font-display text-3xl">
              {COMPANY.address[0]}
              <br />
              {COMPANY.address[1]}
            </p>
            <p className="mt-4 text-sm">
              <a href={COMPANY.phoneHref} className="underline decoration-copper underline-offset-4">
                {COMPANY.phone}
              </a>
            </p>
            <p className="mt-2 text-sm">
              <a href={`mailto:${COMPANY.email}`} className="underline decoration-copper underline-offset-4">
                {COMPANY.email}
              </a>
            </p>
          </address>
        </div>
      </section>
    </SiteShell>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

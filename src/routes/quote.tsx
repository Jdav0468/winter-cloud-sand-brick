import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { LoadBrief } from "@/components/load-brief";
import { QuoteForm } from "@/components/quote-form";
import { SiteShell } from "@/components/site-shell";

type QuoteSearch = {
  origin: string;
  destination: string;
  equipment: string;
  commodity: string;
};

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): QuoteSearch => ({
    origin: typeof search.origin === "string" ? search.origin : "",
    destination: typeof search.destination === "string" ? search.destination : "",
    equipment: typeof search.equipment === "string" ? search.equipment : "",
    commodity: typeof search.commodity === "string" ? search.commodity : "",
  }),
  head: () => ({
    meta: [
      { title: "The Ro-Mac Brief — Ro-Mac Logistics" },
      {
        name: "description",
        content:
          "Sign up for Daily Logistics News, The Ro-Mac Brief. Or send a load to dispatch@ro-mactransport.com.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  const search = Route.useSearch();
  return (
    <SiteShell>
      <PageIntro
        kicker="The Ro-Mac Brief"
        title="Sign up for the news."
        lede="Daily Logistics News, in plain language. Leave your name and email and we will add you from the desk. If you need a truck today, call — the load form is still underneath."
      />
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <LoadBrief />
          <div className="mt-16">
            <QuoteForm
              origin={search.origin}
              destination={search.destination}
              equipment={search.equipment}
              commodity={search.commodity}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

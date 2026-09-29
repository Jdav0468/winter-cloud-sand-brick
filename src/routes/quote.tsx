import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
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
      { title: "Request a truck — Ro-Mac Logistics" },
      {
        name: "description",
        content:
          "Send a load brief to Ro-Mac dispatch, or call (816) 505-4405. Nothing is booked until we confirm a carrier and a rate.",
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
        kicker="Request a truck"
        title="Put the load in writing."
        lede="Prepare a brief for dispatch@ro-mactransport.com. If the pickup is today, skip the form and call the desk — a website cannot book your truck."
      />
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <QuoteForm
            origin={search.origin}
            destination={search.destination}
            equipment={search.equipment}
            commodity={search.commodity}
          />
        </div>
      </section>
    </SiteShell>
  );
}

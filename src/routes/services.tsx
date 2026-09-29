import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { EQUIPMENT, MOVES, READY, SERVICES } from "@/lib/content";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ro-Mac Logistics" },
      {
        name: "description",
        content:
          "40-foot flatbed hotshots, flatbeds, step decks, box trucks, and expedited Sprinter vans. Ro-Mac finds the carrier, negotiates the rate, and stays on the shipment.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Services"
        title="We find the truck. You keep the line running."
        lede="Ro-Mac is a business-to-business freight brokerage. We do not pretend to be a trucking company with a thousand doors. We are the desk that sources a vetted carrier and stays responsible for the load."
      />

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-2 md:px-8 md:py-20 lg:grid-cols-3">
          {MOVES.map((move) => (
            <figure key={move.title} className="border border-line bg-paper">
              <img src={move.image} alt={move.alt} className="aspect-[9/16] w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm font-semibold text-ink">{move.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-b border-line">
        <ol className="mx-auto max-w-6xl divide-y divide-line px-5 md:px-8">
          {SERVICES.map((service) => (
            <li key={service.index} className="grid gap-4 py-10 md:grid-cols-12 md:py-12">
              <p className="font-display text-3xl text-copper md:col-span-2">{service.index}</p>
              <h2 className="font-display text-3xl text-ink md:col-span-4">{service.title}</h2>
              <p className="text-base leading-relaxed text-muted md:col-span-6">{service.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Equipment we arrange</p>
            <h2 className="mt-3 font-display text-4xl">Tell us the freight. We’ll name the trailer.</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {EQUIPMENT.filter((item) => item.id !== "other").map((item) => (
                <li key={item.id} className="py-4">
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{equipmentNote(item.id)}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted">
              If the freight needs permits, temperature control, or a trailer we have not listed, say so on
              the first call. We will tell you plainly whether we can cover it.
            </p>
          </div>
          <div className="border border-line bg-paper p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Have this ready</p>
            <h2 className="mt-3 font-display text-3xl">Five things that make the first call short.</h2>
            <ol className="mt-6 space-y-4">
              {READY.map((item, index) => (
                <li key={item} className="flex gap-4 text-sm leading-6">
                  <span className="font-display text-xl text-pine">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
            <Link
              to="/quote"
              search={{ origin: "", destination: "", equipment: "dry-van", commodity: "" }}
              className="mt-8 inline-flex min-h-11 items-center gap-2 bg-pine px-5 text-sm font-semibold text-cream"
            >
              Start a load brief
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function equipmentNote(id: string) {
  if (id === "flatbed") return "Flatbeds behind a tandem-axle sleeper, for pipe, machinery, and freight that loads from the side or the top.";
  if (id === "hotshot") return "A one-ton dually pickup and a 40-foot flatbed, including pieces like a generator.";
  if (id === "step-deck") return "A true 53-foot step deck. The deck drops once so a taller piece can still clear.";
  if (id === "rgn") return "Removable gooseneck for equipment that has to drive on.";
  if (id === "lowboy") return "The lowest deck we book, for the heavy and the tall.";
  if (id === "oversized") return "When the piece needs permits or a special path, say so on the first call.";
  if (id === "sprinter") return "Expedited Sprinter vans when the freight is small and the clock is not.";
  if (id === "box-truck") return "A conventional straight truck with a hood, not a cabover, when a trailer is too much truck.";
  if (id === "dry-van") return "Palletized and general freight that loads from a dock and wants to stay dry.";
  return "Describe the piece. We will tell you what it needs.";
}

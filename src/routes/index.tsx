import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { LoadBrief } from "@/components/load-brief";
import { SiteShell } from "@/components/site-shell";
import { COMPANY, MOVES, PRINCIPLES, REGIONS, STEPS, VIDEOS } from "@/lib/content";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ro-Mac Logistics — The invisible engine behind your products" },
      {
        name: "description",
        content:
          "Freight brokerage across the contiguous United States. Ro-Mac finds the truck, negotiates the rate, and stays on the load. MC 273349.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <Facts />
      <Principles />
      <Moves />
      <Process />
      <Coverage />
      <Videos />
      <Close />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 py-12 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-6">
          <span className="block h-1 w-10 bg-copper" aria-hidden="true" />
          <p className="mt-5 font-display text-xs font-semibold tracking-widest text-pine">
            Moving your future forward
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none text-ink md:text-6xl">
            The invisible engine behind your products.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            We don’t just move freight. We find the truck, negotiate the rate, and stay with the load — so
            your supply chain is in a known pair of hands.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/quote"
              search={{ origin: "MO", destination: "", equipment: "dry-van", commodity: "" }}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-pine px-5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-pine-deep"
            >
              Request a truck
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href="#how"
              className="inline-flex min-h-11 items-center justify-center border border-line bg-cream px-5 text-sm font-semibold text-ink"
            >
              How a load moves
            </a>
          </div>
        </div>
        <figure className="md:col-span-6">
          <img
            src="/media/highway.jpg"
            alt="A black tractor pulling a tarped flatbed on a highway at sunset"
            width={1792}
            height={1008}
            className="aspect-hero w-full object-cover"
          />
          <figcaption className="mt-3 flex items-center justify-between text-xs font-medium uppercase tracking-widest text-muted">
            <span>Contiguous United States</span>
            <span>MC {COMPANY.mc}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Facts() {
  const facts = [
    ["1991", "Founded"],
    [`MC ${COMPANY.mc}`, "Broker authority"],
    ["Bonded", "Licensed and insured"],
    ["Lower 48", "Where we concentrate"],
  ];
  return (
    <section className="border-b border-line bg-cream" aria-label="Company facts">
      <dl className="mx-auto grid max-w-6xl sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([value, label], index) => (
          <div
            key={label}
            className={cn(
              "border-line px-5 py-6 md:px-8",
              index > 0 && "sm:border-l",
              index > 1 && "border-t sm:border-t-0",
              index === 2 && "lg:border-t-0",
              index === 3 && "border-t sm:border-t lg:border-t-0",
            )}
          >
            <dt className="font-display text-3xl text-ink">{value}</dt>
            <dd className="mt-1 text-sm text-muted">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Principles() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Why the desk exists</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Shipping should not be the stressful part of the business.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Ro-Mac Transportation is a brokerage, not a truck line with a slogan. We are the bridge between
            your dock and the receiver.
          </p>
        </div>
        <ol className="mt-12 grid gap-px bg-line md:grid-cols-3">
          {PRINCIPLES.map((item) => (
            <li key={item.index} className="bg-paper p-6 md:p-8">
              <p className="font-display text-2xl text-copper">{item.index}</p>
              <h3 className="mt-4 font-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Moves() {
  return (
    <section className="border-b border-line bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">What we move</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Name the piece. We’ll name the truck.</h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/services" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink">
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/quote"
              search={{ origin: "", destination: "", equipment: "hotshot", commodity: "" }}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink"
            >
              Describe a load
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOVES.map((move) => (
            <article key={move.title} className="border border-line bg-paper">
              <img src={move.image} alt={move.alt} className="aspect-[9/16] w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">{move.kicker}</p>
                <h3 className="mt-2 font-display text-3xl">{move.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{move.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="how" className="border-b border-line scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">How a load moves</p>
          <h2 className="mt-3 font-display text-4xl text-ink">Three calls, not a portal.</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            You talk to the desk. The desk talks to a vetted carrier. You hear back from the same people.
          </p>
        </div>
        <ol className="lg:col-span-8">
          {STEPS.map((step) => (
            <li key={step.index} className="grid grid-cols-12 gap-4 border-t border-line py-6">
              <p className="col-span-3 font-display text-3xl text-ink sm:col-span-2">{step.index}</p>
              <div className="col-span-9 sm:col-span-10">
                <h3 className="font-display text-2xl">{step.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Coverage() {
  const [active, setActive] = useState<(typeof REGIONS)[number]["id"]>("midwest");
  const region = REGIONS.find((item) => item.id === active) ?? REGIONS[0];

  return (
    <section id="coverage" className="border-b border-line bg-cream scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Coverage</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Precision logistics across the USA.</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We concentrate on the contiguous United States.
            </p>
            <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Regions">
              {REGIONS.map((item) => {
                const selected = item.id === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(item.id)}
                    className={cn(
                      "min-h-11 px-4 text-sm font-semibold transition-colors duration-200",
                      selected ? "bg-pine text-cream" : "border border-line bg-paper text-ink",
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="border border-line bg-paper p-6 md:p-8 lg:col-span-7" role="tabpanel">
            <h3 className="font-display text-3xl">{region.name}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{region.summary}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {region.lanes.map((lane) => (
                <li key={lane} className="flex items-center justify-between py-3 text-sm">
                  <span>{lane}</span>
                  <span className="text-xs uppercase tracking-widest text-muted">Example</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <LoadBrief />
        </div>
      </div>
    </section>
  );
}

function Videos() {
  return (
    <section id="videos" className="border-b border-line scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">YouTube</p>
        <h2 className="mt-3 font-display text-4xl text-ink">Ro-Mac on film.</h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Commercials and clips from the desk. They play here.
        </p>
        {VIDEOS.length > 0 ? (
          <ul className="mt-10 grid gap-8 lg:grid-cols-2">
            {VIDEOS.map((video) => (
              <li key={video.id}>
                <div className="aspect-video w-full overflow-hidden border border-line bg-ink">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <p className="mt-3 font-display text-2xl text-ink">{video.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 flex aspect-video w-full flex-col items-center justify-center gap-3 border border-line bg-ink text-cream">
            <Play className="size-8 text-copper" aria-hidden="true" />
            <p className="font-display text-3xl">YouTube videos go here.</p>
            <p className="max-w-md px-6 text-center text-sm leading-6 text-cream/70">
              Send the links and they will play in this spot.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="relative min-h-80">
      <img
        src="/media/night.jpg"
        alt="Night highway with streaks of headlights and taillights"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-xs font-semibold tracking-widest text-pine">The desk</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl text-ink md:text-5xl">
          Call if it has to move. Write if it can wait until morning.
        </h2>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={COMPANY.phoneHref}
            className="inline-flex min-h-11 items-center justify-center bg-pine px-5 text-sm font-semibold text-paper"
          >
            {COMPANY.phone}
          </a>
          <Link
            to="/quote"
            search={{ origin: "", destination: "", equipment: "", commodity: "" }}
            className="inline-flex min-h-11 items-center justify-center border border-ink/40 px-5 text-sm font-semibold text-ink"
          >
            Send a load brief
          </Link>
        </div>
      </div>
    </section>
  );
}

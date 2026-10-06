import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/page-intro";
import { SiteShell } from "@/components/site-shell";
import { SpotPlayer } from "@/components/spot-player";
import { COMPANY, VIDEOS } from "@/lib/content";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Videos — Ro-Mac Logistics" },
      {
        name: "description",
        content:
          "The October spot, plus commercials and clips from Ro-Mac. Never left in the dark.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="October"
        title="Don't look away."
        lede="The nights get longer. Something is riding with the freight. The scare is a load nobody is watching."
      />
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <SpotPlayer />
          <h2 className="mt-16 font-display text-4xl text-ink">The rest of the reel</h2>
          <ul className="mt-8 grid gap-8 lg:grid-cols-2">
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
          <p className="mt-10 text-sm text-muted">
            <a
              href={COMPANY.youtube}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink underline decoration-copper underline-offset-4"
            >
              Watch the channel
            </a>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}

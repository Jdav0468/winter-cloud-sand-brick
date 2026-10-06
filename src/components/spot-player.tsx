import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { DURATION, beatAt, beats, formatClock, visualAt, type Visual } from "@/commercial/spot";

const STILLS: Record<Exclude<Visual, "film">, { src: string; alt: string }> = {
  dock: {
    src: "/commercial/dock.jpg",
    alt: "A freight dock at night, jack-o-lanterns along the edge, a trailer at the door.",
  },
  flatbed: {
    src: "/commercial/flatbed.jpg",
    alt: "A flatbed truck hauling steel through a foggy Missouri field under a harvest moon.",
  },
  hero: {
    src: "/commercial/hero.jpg",
    alt: "An American semi facing camera on a foggy Halloween highway, headlights on.",
  },
};

type Status = "idle" | "playing" | "paused" | "ended";

export function SpotPlayer() {
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState(0);
  const [voiceOn, setVoiceOn] = useState(true);
  const [bedOn, setBedOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const startedAt = useRef(0);
  const elapsed = useRef(0);
  const raf = useRef(0);
  const voiceOnRef = useRef(voiceOn);
  const statusRef = useRef(status);

  useEffect(() => {
    voiceOnRef.current = voiceOn;
  }, [voiceOn]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !bedOn;
    video.volume = 0.22;
  }, [bedOn]);

  useEffect(() => {
    const voice = voiceRef.current;
    if (!voice) return;
    voice.muted = !voiceOn;
    voice.volume = 1;
  }, [voiceOn]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(raf.current);
      voiceRef.current?.pause();
    };
  }, []);

  function stopClock() {
    cancelAnimationFrame(raf.current);
  }

  function finish() {
    setStatus("ended");
    statusRef.current = "ended";
    videoRef.current?.pause();
    voiceRef.current?.pause();
  }

  function tick() {
    if (statusRef.current !== "playing") return;
    const voice = voiceRef.current;
    const hasVoice = Boolean(voice && voice.readyState >= 1);
    const next = hasVoice
      ? Math.min(DURATION, voice!.currentTime)
      : Math.min(DURATION, (performance.now() - startedAt.current) / 1000);
    elapsed.current = next;
    setTime(next);
    const video = videoRef.current;
    if (video && visualAt(next) === "film") {
      if (video.paused) void video.play().catch(() => undefined);
    } else if (video && !video.paused) {
      video.pause();
    }
    if ((hasVoice && voice!.ended) || next >= DURATION - 0.05) {
      finish();
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }

  function startClock(from: number) {
    elapsed.current = from;
    startedAt.current = performance.now() - from * 1000;
    stopClock();
    raf.current = requestAnimationFrame(tick);
  }

  function play(from = elapsed.current) {
    const video = videoRef.current;
    const voice = voiceRef.current;
    if (from <= 0.05 && video) video.currentTime = 0;
    if (voice) {
      if (Math.abs(voice.currentTime - from) > 0.2) voice.currentTime = from;
      voice.muted = !voiceOnRef.current;
      void voice.play().catch(() => undefined);
    }
    setStatus("playing");
    statusRef.current = "playing";
    setTime(from);
    startClock(from);
    if (video && visualAt(from) === "film") void video.play().catch(() => undefined);
  }

  function pause() {
    stopClock();
    const voice = voiceRef.current;
    if (voice) elapsed.current = voice.currentTime;
    setStatus("paused");
    statusRef.current = "paused";
    videoRef.current?.pause();
    voice?.pause();
  }

  function replay() {
    elapsed.current = 0;
    setTime(0);
    play(0);
  }

  function onFrameClick() {
    if (status === "playing") pause();
    else play(status === "ended" ? 0 : elapsed.current);
  }

  const shown = status === "idle" ? 0 : time;
  const beat = beatAt(shown);
  const visual = status === "idle" ? "hero" : visualAt(shown);
  const still = visual === "film" ? null : STILLS[visual];
  const progress = status === "idle" ? 0 : Math.min(1, shown / DURATION);

  return (
    <section className="flex flex-col gap-4 [&_img]:outline-none" aria-label="Halloween commercial">
      <audio ref={voiceRef} src="/commercial/narration.mp3?v=horror" preload="auto" />
      <div className="relative overflow-hidden rounded-sm bg-sand">
        <div
          role="button"
          tabIndex={0}
          onClick={onFrameClick}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onFrameClick();
            }
          }}
          className="relative block aspect-video w-full overflow-hidden text-left"
          aria-label={status === "playing" ? "Pause the spot" : "Play the spot"}
        >
          <img
            src="/commercial/highway.jpg"
            alt=""
            className={`absolute inset-0 h-full w-full object-cover ${
              visual === "film" && status !== "idle" ? "opacity-100" : "opacity-0"
            }`}
          />
          <video
            ref={videoRef}
            src="/commercial/film.mp4"
            poster="/commercial/highway.jpg"
            playsInline
            preload="metadata"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              visual === "film" && status !== "idle" ? "opacity-100" : "opacity-0"
            }`}
          />
          {still ? (
            <img
              key={still.src}
              src={still.src}
              alt={still.alt}
              className={`ken absolute inset-0 h-full w-full object-cover ${
                status === "idle" ? "" : "super-in"
              }`}
            />
          ) : null}
          <div className="grain pointer-events-none absolute inset-0 opacity-50" />
          <div className="stage-vignette pointer-events-none absolute inset-0" />
          <div className="scrim pointer-events-none absolute inset-x-0 bottom-0 h-2/3" />

          {status === "idle" ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="font-display text-lg tracking-widest text-pine">Halloween spot</p>
              <p className="font-display text-5xl leading-none text-ink sm:text-7xl">Never left in the dark</p>
              <p className="max-w-md font-sans italic text-base text-muted sm:text-lg">
                October. The nights get longer. Something is riding with the freight.
              </p>
              <span className="mt-2 inline-flex h-12 items-center gap-2 bg-pine px-5 font-display text-xl tracking-wide text-paper">
                <Play className="size-5 fill-current" aria-hidden />
                Play the spot
              </span>
            </div>
          ) : (
            <div key={beat.id} className="super-in absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-8 sm:pb-8">
              <div className="flex max-w-xl gap-3 sm:gap-4">
                <span className="w-1 shrink-0 self-stretch bg-pine" aria-hidden />
                <div>
                  <p className="font-display text-base tracking-widest text-pine sm:text-lg">{beat.kicker}</p>
                  <p className="font-sans text-3xl leading-none text-ink italic sm:text-5xl">{beat.title}</p>
                  <p className="mt-2 font-sans italic text-base text-ink sm:text-xl">
                    {beat.id === "sign" ? (
                      <a
                        href="tel:+18165054405"
                        onClick={(event) => event.stopPropagation()}
                        className="pointer-events-auto text-pine underline decoration-copper underline-offset-4"
                      >
                        {beat.body}
                      </a>
                    ) : (
                      beat.body
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="h-1 bg-line" aria-hidden>
          <div className="h-full bg-pine" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {status === "playing" ? (
          <button
            type="button"
            onClick={pause}
            className="inline-flex h-11 items-center gap-2 bg-ink px-4 font-display text-lg tracking-wide text-paper"
          >
            <Pause className="size-4 fill-current" aria-hidden />
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => play(status === "ended" ? 0 : elapsed.current)}
            className="inline-flex h-11 items-center gap-2 bg-pine px-4 font-display text-lg tracking-wide text-paper"
          >
            <Play className="size-4 fill-current" aria-hidden />
            {status === "idle" ? "Play" : status === "ended" ? "Play again" : "Resume"}
          </button>
        )}
        <button
          type="button"
          onClick={replay}
          className="inline-flex h-11 items-center gap-2 border border-line px-4 font-display text-lg tracking-wide text-ink"
        >
          <RotateCcw className="size-4" aria-hidden />
          Replay
        </button>
        <button
          type="button"
          onClick={() => setBedOn((on) => !on)}
          aria-pressed={bedOn}
          className="inline-flex h-11 items-center gap-2 border border-line px-4 font-display text-lg tracking-wide text-ink"
        >
          {bedOn ? <Volume2 className="size-4" aria-hidden /> : <VolumeX className="size-4" aria-hidden />}
          Picture
        </button>
        <button
          type="button"
          onClick={() => setVoiceOn((on) => !on)}
          aria-pressed={voiceOn}
          className="inline-flex h-11 items-center gap-2 border border-line px-4 font-display text-lg tracking-wide text-ink"
        >
          Voice {voiceOn ? "on" : "off"}
        </button>
        <p className="ml-auto font-display text-lg tracking-widest text-mist" aria-live="polite">
          {formatClock(status === "idle" ? 0 : shown)} / {formatClock(DURATION)}
        </p>
      </div>

      <ol className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-6">
        {beats.map((item) => {
          const active = status !== "idle" && beat.id === item.id;
          return (
            <li key={item.id} className={active ? "bg-sand" : "bg-paper"}>
              <button
                type="button"
                onClick={() => {
                  const voice = voiceRef.current;
                  if (voice) {
                    voice.currentTime = item.at;
                    voice.pause();
                  }
                  elapsed.current = item.at;
                  const video = videoRef.current;
                  if (video && visualAt(item.at) === "film") video.currentTime = item.at;
                  setTime(item.at);
                  setStatus("paused");
                  statusRef.current = "paused";
                  video?.pause();
                  stopClock();
                }}
                className="flex h-11 w-full items-center justify-center px-2 font-display text-sm tracking-wide text-ink sm:text-base"
              >
                <span className={active ? "text-pine" : "text-muted"}>{item.mark}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

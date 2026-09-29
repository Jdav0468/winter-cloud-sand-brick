export function PageIntro({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <span className="block h-1 w-10 bg-copper" aria-hidden="true" />
        <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-ink md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      </div>
    </header>
  );
}

export function JournalHero() {
  return (
    <div className="animate-fade-up mb-20 flex flex-col justify-between md:flex-row md:items-end">
      <div className="max-w-2xl">
        <span className="mb-4 block text-xs font-bold tracking-[0.4em] text-primary uppercase">
          Journal &amp; Archive
        </span>
        <h1 className="font-display text-[8vw] leading-[0.9] font-extrabold tracking-tighter md:text-[6vw]">
          READS &amp;
          <br />
          <span className="text-zinc-600 italic">REFLECTIONS.</span>
        </h1>
      </div>
      <div className="mt-8 md:mt-0 md:text-right">
        <p className="max-w-xs text-sm leading-relaxed font-light text-zinc-400">
          An open digital shelf where I document my explorations in frontend,
          creative systems, and the intersection of technology and human
          experience.
        </p>
      </div>
    </div>
  );
}

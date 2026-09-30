type Y2kMarqueeProps = {
  items: string[];
  tone?: "yellow" | "pink" | "cyan" | "black";
};

const TONE = {
  yellow: "bg-yellow-300 text-black",
  pink: "bg-pink-400 text-white",
  cyan: "bg-cyan-300 text-black",
  black: "bg-black text-white",
};

export function Y2kMarquee({ items, tone = "yellow" }: Y2kMarqueeProps) {
  const loop = [...items, ...items];

  return (
    <div
      className={`relative z-10 w-full overflow-hidden border-y-3 sm:border-y-4 border-black ${TONE[tone]}`}
    >
      <div className="flex w-max animate-marquee gap-6 sm:gap-10 py-1 font-black text-[10px] sm:text-xs uppercase tracking-widest">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-6 sm:gap-10 shrink-0">
            <span aria-hidden>★</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

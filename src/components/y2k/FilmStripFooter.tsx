import { Zap } from "lucide-react";

export function FilmStripFooter({
  text = "NO APP NEEDED • FREE FOREVER",
}: {
  text?: string;
}) {
  return (
    <footer className="relative z-10 w-full shrink-0 px-3 pb-2 pt-1">
      <div className="mx-auto max-w-6xl bg-black p-1.5 sm:p-2 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-between overflow-hidden">
        <div className="flex gap-1.5 sm:gap-2 opacity-50 shrink-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded border-2 border-black" />
          ))}
        </div>
        <div className="text-white font-mono text-[9px] sm:text-xs font-bold tracking-wider px-2 text-center flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
          <span>{text}</span>
        </div>
        <div className="flex gap-1.5 sm:gap-2 opacity-50 shrink-0">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded border-2 border-black" />
          ))}
        </div>
      </div>
    </footer>
  );
}

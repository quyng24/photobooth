import { Heart, Sparkles, Star } from "lucide-react";

type Y2kShellProps = {
  children: React.ReactNode;
  className?: string;
  showStickers?: boolean;
};

export function Y2kShell({
  children,
  className = "",
  showStickers = true,
}: Y2kShellProps) {
  return (
    <main
      className={`relative min-h-screen min-h-dvh w-full overflow-x-hidden bg-[#fff0f6] text-black font-sans flex flex-col selection:bg-pink-400 selection:text-white ${className}`}
    >
      <div className="fixed inset-0 bg-[radial-gradient(#ff85c0_2px,transparent_2px)] bg-size-[20px_20px] sm:bg-size-[24px_24px] opacity-60 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-size-[2rem_2rem] sm:bg-size-[4rem_4rem] pointer-events-none" />

      {showStickers && (
        <>
          <div className="fixed top-12 left-4 text-cyan-400 animate-bounce pointer-events-none drop-shadow-[2px_2px_0px_#000] z-0">
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2} fill="currentColor" />
          </div>
          <div className="fixed top-1/4 right-4 text-yellow-300 -rotate-12 pointer-events-none drop-shadow-[3px_3px_0px_#000] z-0">
            <Star className="w-7 h-7 sm:w-9 sm:h-9" strokeWidth={2} fill="currentColor" />
          </div>
          <div className="fixed bottom-16 left-6 text-pink-500 rotate-12 pointer-events-none drop-shadow-[2px_2px_0px_#000] z-0 hidden sm:block">
            <Heart className="w-7 h-7" strokeWidth={2} fill="currentColor" />
          </div>
        </>
      )}

      <div className="relative z-10 flex w-full flex-1 flex-col">
        {children}
      </div>
    </main>
  );
}

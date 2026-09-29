import Link from "next/link";
import { Camera, Sparkles, Star, Heart, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 overflow-hidden bg-pink-50 bg-[radial-gradient(#ff9ecd_3px,transparent_3px)] bg-size-[32px_32px]">
      <div className="absolute top-20 left-10 md:left-32 text-cyan-400 animate-bounce">
        <Sparkles size={48} strokeWidth={1.5} fill="currentColor" />
      </div>
      <div className="absolute bottom-24 right-10 md:right-32 text-pink-500 animate-pulse">
        <Star size={56} strokeWidth={1.5} fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-10 md:right-40 text-yellow-400 rotate-12">
        <Zap size={40} fill="currentColor" />
      </div>

      <div className="relative z-10 bg-white pt-12 pb-8 px-8 md:px-12 rounded-3xl text-center max-w-md w-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="absolute top-0 left-0 w-full h-8 bg-black rounded-t-2xl flex items-center px-4 gap-2 border-b-4 border-black">
          <div className="w-3 h-3 rounded-full bg-pink-500 border border-white"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
          <div className="w-3 h-3 rounded-full bg-cyan-400 border border-white"></div>
          <span className="text-white text-[10px] font-bold font-mono ml-2 tracking-widest opacity-80">
            PHOTOBOOTH.EXE
          </span>
        </div>

        <div className="mt-4">
          <div className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 tracking-wider -rotate-3">
            #Life4Cut #Y2K_Vibe
          </div>

          <h1
            className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500"
            style={{ textShadow: "4px 4px 0px #000" }}
          >
            Snap &<br />
            Share
          </h1>

          <p className="mb-8 font-medium text-black text-base border-2 border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
            Tạo ra những bức ảnh 4-cut phong cách{" "}
            <span className="text-pink-500 font-bold">Y2K</span> cực chất ngay
            trên trình duyệt của bạn! 📸✨
          </p>

          <Link href="/setup">
            <button className="group flex items-center justify-center w-full gap-3 bg-cyan-400 text-black px-8 py-4 rounded-2xl font-black text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1.5 hover:translate-x-1.5 hover:shadow-none transition-all active:bg-pink-400">
              <Camera size={26} className="group-hover:animate-pulse" />
              BẮT ĐẦU CHỤP NGAY
              <Heart
                size={20}
                fill="currentColor"
                className="text-pink-500 drop-shadow-md"
              />
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 flex gap-4 w-full justify-center opacity-20 pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="w-16 h-16 bg-black rounded-lg border-4 border-dashed border-white"
          ></div>
        ))}
      </div>
    </main>
  );
}

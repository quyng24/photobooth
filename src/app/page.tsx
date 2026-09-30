import Link from "next/link";
import {
  Camera,
  Sparkles,
  Heart,
  Zap,
  Smile,
  Image as ImageIcon,
  Flame,
  ArrowRight,
  Timer,
  Palette,
  Download,
} from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

const STEPS = [
  { n: "01", title: "Chọn khung", desc: "2-cut hoặc 4-cut", icon: ImageIcon, bg: "bg-cyan-300" },
  { n: "02", title: "Say cheese", desc: "Countdown + retake", icon: Timer, bg: "bg-pink-400" },
  { n: "03", title: "Decor & save", desc: "Filter, chữ ký, PNG", icon: Palette, bg: "bg-yellow-300" },
];

export default function Home() {
  return (
    <Y2kShell showStickers={false}>
      <div className="pointer-events-none absolute top-14 left-6 z-0 text-cyan-400 drop-shadow-[2px_2px_0px_#000]">
        <Sparkles className="h-7 w-7" fill="currentColor" />
      </div>
      <div className="pointer-events-none absolute top-20 right-8 z-0 -rotate-12 text-yellow-300 drop-shadow-[3px_3px_0px_#000]">
        <Flame className="h-8 w-8" fill="currentColor" />
      </div>

      <header className="mx-auto mt-2 flex w-[calc(100%-1.5rem)] max-w-6xl shrink-0 items-center justify-between rounded-xl border-3 border-black bg-white p-2.5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-pink-500 text-xs font-black text-white shadow-[2px_2px_0px_0px_#000]">
            Y2K
          </div>
          <span className="font-mono text-lg font-black tracking-wider uppercase">
            SNAP<span className="text-pink-500">BOOTH</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border-2 border-black bg-yellow-300 px-2.5 py-1 font-mono text-[10px] font-bold shadow-[2px_2px_0px_0px_#000]">
          <span className="h-2 w-2 animate-ping rounded-full border border-black bg-green-500" />
          READY
        </div>
      </header>

      <Y2kMarquee
        items={["Y2K PHOTOBOOTH", "LIFE 4 CUT", "NO APP NEEDED", "RETAKE UNLIMITED", "SAY CHEESE ★"]}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-6 px-4 py-4 sm:py-6">
        <Y2kWindow
          title="C:\\LIFE_4_CUT.EXE"
          badge={<Smile size={16} className="text-yellow-400" />}
          className="w-full max-w-lg"
          bodyClassName="flex flex-col items-center p-4 text-center sm:p-5"
        >
          <div className="mb-2 flex flex-wrap justify-center gap-1.5">
            <span className="-rotate-2 rounded-full border-2 border-black bg-yellow-300 px-2.5 py-0.5 text-[10px] font-black">
              #Life4Cut
            </span>
            <span className="rotate-2 rounded-full border-2 border-black bg-pink-400 px-2.5 py-0.5 text-[10px] font-black text-white">
              #Y2K_Vibe
            </span>
            <span className="rounded-full border-2 border-black bg-cyan-300 px-2.5 py-0.5 text-[10px] font-black">
              #Retro
            </span>
          </div>

          <h1 className="mb-2 text-4xl font-black tracking-tight uppercase leading-none drop-shadow-[2px_2px_0px_#ff69b4] sm:text-5xl">
            SNAP &{" "}
            <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              SHARE
            </span>
          </h1>

          <p className="mb-3 rounded-xl border-2 border-black bg-pink-50 px-3 py-2 text-xs font-semibold leading-relaxed shadow-[2px_2px_0px_0px_#000] sm:text-sm">
            Ảnh 4 ô phong cách{" "}
            <span className="rounded border border-black bg-yellow-300 px-1 font-extrabold text-pink-600">
              Y2K chuẩn Hàn
            </span>{" "}
            ngay trên trình duyệt! 📸
          </p>

          <div className="mb-3 grid w-full grid-cols-3 gap-2">
            {[
              { k: "3s", v: "Countdown" },
              { k: "∞", v: "Retake" },
              { k: "PNG", v: "Export" },
            ].map((stat) => (
              <div key={stat.v} className="rounded-xl border-2 border-black bg-white py-1.5 shadow-[2px_2px_0px_0px_#000]">
                <p className="text-lg font-black leading-none">{stat.k}</p>
                <p className="text-[9px] font-bold uppercase text-zinc-500">{stat.v}</p>
              </div>
            ))}
          </div>

          <div className="mb-3 grid w-full grid-cols-3 gap-2">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className={`${step.bg} rounded-xl border-2 border-black p-2 text-left shadow-[2px_2px_0px_0px_#000]`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="rounded bg-black px-1.5 font-mono text-[9px] font-black text-white">
                    {step.n}
                  </span>
                  <step.icon size={14} />
                </div>
                <p className="text-[11px] font-black uppercase leading-tight">{step.title}</p>
                <p className="text-[10px] font-semibold leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>

          <Link href="/setup" className="group w-full">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-3 border-black bg-cyan-400 px-4 py-3 text-base font-black shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400"
            >
              <Camera className="h-5 w-5" />
              BẮT ĐẦU CHỤP NGAY
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </Y2kWindow>

        <div className="relative hidden w-52 shrink-0 rotate-2 lg:block">
          <div className="flex flex-col gap-2 rounded-xl border-3 border-black bg-black p-3 shadow-[8px_8px_0px_0px_#ff4081]">
            <div className="rounded border-2 border-white bg-pink-400 py-0.5 text-center text-[10px] font-black tracking-wider text-white uppercase">
              ★ STRIP PREVIEW ★
            </div>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative flex h-12 items-center justify-center overflow-hidden rounded-lg border-2 border-white bg-pink-100"
              >
                <ImageIcon className="h-5 w-5 text-pink-300" />
                <div className="absolute right-1 bottom-1 rounded border border-black bg-yellow-300 px-1 text-[9px] font-black">
                  0{item}
                </div>
              </div>
            ))}
            <div className="border-t-2 border-dashed border-gray-600 pt-1 text-center font-mono text-[9px] font-bold tracking-widest text-white">
              LIFE 4 CUT
            </div>
          </div>
          <div className="absolute -top-3 -right-3 -rotate-12 rounded-full border-2 border-black bg-yellow-300 p-1.5 text-[10px] font-black shadow-[2px_2px_0px_0px_#000]">
            COOL!
          </div>
        </div>
      </section>

      <div className="mx-auto mb-1 hidden w-full max-w-6xl shrink-0 grid-cols-4 gap-2 px-4 sm:grid">
        {[
          { icon: Zap, label: "Chụp trên web" },
          { icon: Heart, label: "Vibe Y2K Hàn" },
          { icon: Timer, label: "Retake từng ô" },
          { icon: Download, label: "Xuất PNG" },
        ].map((perk) => (
          <div
            key={perk.label}
            className="flex items-center gap-2 rounded-xl border-2 border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_0px_#000]"
          >
            <perk.icon size={14} />
            <span className="text-[11px] font-black uppercase">{perk.label}</span>
          </div>
        ))}
      </div>

      <FilmStripFooter />
    </Y2kShell>
  );
}

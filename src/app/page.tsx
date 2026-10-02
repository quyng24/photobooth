import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";
import { HomeMascot } from "@/components/y2k/HomeMascot";

export default function Home() {
  return (
    <Y2kShell showStickers={false}>
      <header className="mx-auto mt-2 flex w-[calc(100%-1.5rem)] max-w-6xl shrink-0 items-center justify-between rounded-xl border-3 border-black bg-white p-2.5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-pink-500 text-xs font-black text-white shadow-[2px_2px_0px_0px_#000]">
            Y2K
          </div>
          <span className="font-mono text-lg font-black tracking-wider uppercase">
            SNAP<span className="text-pink-500">BOOTH</span>
          </span>
        </div>
      </header>

      <Y2kMarquee
        items={["Y2K PHOTOBOOTH", "LIFE 4 CUT", "NO APP NEEDED", "RETAKE UNLIMITED", "SAY CHEESE ★"]}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-6 px-4 py-4 sm:py-6">
        <Y2kWindow
          title="C:\\LIFE_4_CUT.EXE"
          className="w-full max-w-lg"
          bodyClassName="flex flex-col items-center p-3 text-center sm:p-5"
          frameFromSm
        >
          <h1 className="mb-2 text-4xl font-black tracking-tight uppercase leading-none drop-shadow-[2px_2px_0px_#ff69b4] sm:text-5xl">
            SNAP &{" "}
            <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              SHARE
            </span>
          </h1>

          <p className="mb-4 max-w-sm text-sm font-semibold leading-relaxed text-zinc-700 sm:text-base">
            Tạo dải ảnh Y2K ngay trên trình duyệt. Chọn khung, tạo dáng và lưu ảnh của bạn.
          </p>

          <div className="flex w-full items-center gap-2">
            <div className="shrink-0">
              <HomeMascot />
            </div>
            <Link
              href="/setup"
              className="group flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-3 border-black bg-cyan-400 px-2 py-3 text-xs font-black shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400 sm:gap-2 sm:px-4 sm:text-base"
            >
              <Camera className="h-5 w-5" />
              BẮT ĐẦU CHỤP NGAY
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Y2kWindow>
      </section>

      <FilmStripFooter />
    </Y2kShell>
  );
}

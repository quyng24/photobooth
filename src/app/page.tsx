import Link from "next/link";
import { ArrowRight, Camera, Wand2, Download, Sparkles } from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";
import { HomeMascot } from "@/components/y2k/HomeMascot";

const SAMPLE_PHOTOS = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
];

export default function Home() {
  return (
    <Y2kShell showStickers={true}>
      {/* HEADER */}
      <header className="relative z-10 mx-auto mt-4 flex w-[calc(100%-2rem)] max-w-6xl shrink-0 items-center justify-between rounded-xl border-3 border-black bg-white p-2.5 shadow-[4px_4px_0px_0px_#000]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-pink-500 text-xs font-black text-white shadow-[2px_2px_0px_0px_#000]">
            Y2K
          </div>
          <span className="font-mono text-lg font-black tracking-wider uppercase">
            SNAP<span className="text-pink-500">BOOTH</span>
          </span>
        </div>
        <div className="hidden sm:flex gap-1.5 opacity-40">
          <div className="w-3 h-3 rounded-full bg-black"></div>
          <div className="w-3 h-3 rounded-full bg-black"></div>
        </div>
      </header>

      <div className="my-6">
        <Y2kMarquee
          items={[
            "Y2K PHOTOBOOTH",
            "LIFE 4 CUT",
            "NO APP NEEDED",
            "RETAKE UNLIMITED",
            "SAY CHEESE ★",
          ]}
          tone="cyan"
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-12 pt-2">
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          <Y2kWindow
            title="C:\\LIFE_4_CUT.EXE"
            className="w-full max-w-lg lg:max-w-xl z-10"
            bodyClassName="flex flex-col items-center lg:items-start p-6 text-center lg:text-left sm:p-8"
            frameFromSm
          >
            <div className="inline-block bg-yellow-300 text-black border-2 border-black font-black text-xs px-3 py-1 rounded-full uppercase mb-4 transform -rotate-2 shadow-[2px_2px_0px_#000]">
              <Sparkles className="inline-block w-3 h-3 mr-1" /> Web Photobooth
              Đỉnh Nhất
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-tight uppercase leading-none drop-shadow-[2px_2px_0px_#ff69b4] sm:text-6xl text-black">
              SNAP &{" "}
              <span className="bg-linear-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                SHARE
              </span>
            </h1>

            <p className="mb-8 max-w-sm text-sm font-bold leading-relaxed text-zinc-700 sm:text-base">
              Tạo dải ảnh 4-cut chuẩn phong cách Hàn Quốc ngay trên trình duyệt
              máy tính của bạn. Hoàn toàn miễn phí!
            </p>

            <div className="flex w-full items-center justify-center lg:justify-start gap-4">
              <div className="shrink-0 -mt-4">
                <HomeMascot />
              </div>
              <Link
                href="/setup"
                className="group flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-3 border-black bg-cyan-400 px-5 py-4 text-sm font-black shadow-[6px_6px_0px_0px_#000] hover:bg-pink-400 sm:text-base transition-all hover:-translate-y-1 hover:-translate-x-1"
              >
                <Camera className="h-5 w-5" />
                VÀO BUỒNG CHỤP NGAY
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Y2kWindow>
        </div>
        

        {/* Visual Proof */}
          <div className="hidden md:flex relative group w-40 lg:w-48 shrink-0">
            <div className="absolute inset-0 bg-black rounded-lg transform rotate-6 translate-x-2.5 translate-y-2.5"></div>

            <div className="relative bg-white p-2 pb-9 lg:pb-10 border-3 border-black rounded-lg shadow-xl transform rotate-3 transition-transform duration-300 group-hover:rotate-0 z-10 w-full flex flex-col gap-1.5 lg:gap-2">
              {SAMPLE_PHOTOS.map((src, i) => (
                <div
                  key={i}
                  className="w-full aspect-[4/3] bg-zinc-200 border-2 border-black overflow-hidden grayscale contrast-125"
                >
                  <img
                    src={src}
                    alt="Sample"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="absolute bottom-2.5 left-0 w-full text-center">
                <span className="font-black text-xs lg:text-sm uppercase tracking-tighter text-pink-500">
                  SNAPBOOTH
                </span>
              </div>
            </div>

            <div className="absolute -right-3 top-8 bg-yellow-300 border-2 border-black font-black text-[10px] lg:text-xs px-2 py-1 transform rotate-12 z-20 shadow-[2px_2px_0px_#000]">
              Y2K VIBE!
            </div>
          </div>

          {/* FEATURES SECTION */}
        <Y2kWindow
          title="C:\\TINH_NANG_CUC_SLAY.TXT"
          className="w-full mx-auto"
          bodyClassName="p-4 sm:p-6 bg-zinc-50"
          frameFromSm
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-pink-200 border-3 border-black p-4 sm:p-5 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_#000]">
                <Camera className="w-5 h-5 text-pink-500" />
              </div>
              <h3 className="font-black text-lg uppercase mb-1">
                1. Chụp Thả Ga
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                Webcam xịn xò, đếm ngược 3 giây chuẩn photobooth thật.
              </p>
            </div>

            <div className="bg-cyan-200 border-3 border-black p-4 sm:p-5 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_#000]">
                <Wand2 className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="font-black text-lg uppercase mb-1">
                2. Decor Cực Slay
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                Đổi màu viền, áp filter film retro và viết chữ ký kỷ niệm.
              </p>
            </div>

            <div className="bg-yellow-200 border-3 border-black p-4 sm:p-5 rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_#000]">
                <Download className="w-5 h-5 text-yellow-500" />
              </div>
              <h3 className="font-black text-lg uppercase mb-1">
                3. Xuất Ảnh HD
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                Lưu ngay dải ảnh 4-cut chất lượng cao về máy để up Story.
              </p>
            </div>
          </div>
        </Y2kWindow>
      </section>

      <FilmStripFooter />
    </Y2kShell>
  );
}

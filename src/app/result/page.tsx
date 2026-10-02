"use client";

import { usePhotoStore } from "@/stores/photoStore";
import Link from "next/link";
import {
  Download,
  Share2,
  Home,
  Camera,
  CheckCircle2,
  PartyPopper,
  Sparkles,
  Heart,
} from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

export default function ResultPage() {
  const { finalImage, clearSession } = usePhotoStore();

  const handleDownload = () => {
    if (!finalImage) {
      alert("Chưa có ảnh để tải xuống.");
      return;
    }

    const link = document.createElement("a");
    link.href = finalImage;
    link.download = `photobooth-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!finalImage) {
      alert("Chưa có ảnh để chia sẻ.");
      return;
    }

    try {
      const response = await fetch(finalImage);
      const blob = await response.blob();
      const file = new File([blob], `photobooth-${Date.now()}.png`, {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Photo Booth",
          text: "Check out my photo!",
          files: [file],
        });
        return;
      }

      alert("Trình duyệt không hỗ trợ chia sẻ trực tiếp. Bạn có thể tải ảnh xuống trước.");
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") {
        return;
      }
      console.error("Share failed:", error);
      alert("Không thể chia sẻ ảnh.");
    }
  };

  return (
    <Y2kShell className="flex flex-col items-center" showStickers>
      <div className="mt-4 mb-2 sm:mt-6 sm:mb-4">
        <Y2kMarquee
          tone="black"
          items={[
            "TA-DA",
            "STRIP READY",
            "DOWNLOAD PNG",
            "SHARE THE VIBE",
            "Y2K FOREVER",
          ]}
        />
      </div>

      <div className="z-10 flex w-full max-w-5xl flex-1 flex-col items-center gap-6 px-4 pb-12 pt-2 mx-auto">
        {/* TITLE */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <PartyPopper
            className="h-8 w-8 shrink-0 text-pink-500"
            fill="currentColor"
          />
          <h1 className="text-center text-3xl font-black uppercase tracking-tight drop-shadow-[2px_2px_0px_#22d3ee] sm:text-5xl text-black">
            Hoàn Tất! 🎉
          </h1>
          <PartyPopper
            className="h-8 w-8 shrink-0 text-cyan-500 transform scale-x-[-1]"
            fill="currentColor"
          />
        </div>

         {/* MAIN LAYOUT */}
        <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="relative flex flex-col items-center shrink-0 w-full lg:w-1/2 justify-center mt-4">
            {finalImage ? (
              <div className="relative group">
                <Sparkles
                  className="absolute -top-6 -left-6 text-yellow-400 w-12 h-12 animate-pulse z-20 drop-shadow-[2px_2px_0px_#000]"
                  fill="currentColor"
                />
                <Heart
                  className="absolute -bottom-6 -right-6 text-pink-500 w-10 h-10 rotate-12 z-20 drop-shadow-[2px_2px_0px_#000]"
                  fill="currentColor"
                />

                <div className="relative bg-pink-100 p-4 sm:p-5 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 z-10">
                  <div className="bg-white p-2 rounded-xl border-2 border-black shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={finalImage}
                      alt="Final Photo Booth"
                      className="block h-auto max-h-[65vh] w-64 rounded-lg object-contain sm:w-72"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <span className="font-black text-xl uppercase tracking-widest text-black">
                      Y2K_SNAP
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0px_0px_#000] w-full max-w-sm">
                <div className="bg-zinc-100 p-4 rounded-full border-2 border-black mb-4">
                  <Camera size={40} className="text-zinc-400" />
                </div>
                <p className="mb-2 text-2xl font-black uppercase">
                  Chưa có ảnh
                </p>
                <p className="mb-6 text-sm font-bold text-zinc-500">
                  Oops! Có vẻ bạn chưa chụp tấm nào. Hãy quay lại buồng chụp
                  nhé.
                </p>
                <Link
                  href="/setup"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-3 border-black bg-cyan-400 px-6 py-3 text-sm font-black uppercase shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400 hover:-translate-y-1 transition-all"
                >
                  <Camera size={18} />
                  VÀO BUỒNG CHỤP
                </Link>
              </div>
            )}
          </div>

          <div className="flex w-full max-w-md flex-col justify-center lg:sticky lg:top-12 lg:w-1/2 pt-4 lg:pt-10">
            <Y2kWindow
              title="EXPORT_SUCCESS.EXE"
              bodyClassName="flex flex-col gap-4 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 bg-lime-100 border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_#000]">
                <div className="bg-lime-400 rounded-full text-black">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase">
                    Xử lý hoàn tất!
                  </h4>
                  <p className="text-xs font-bold text-zinc-600">
                    Dải ảnh đã sẵn sàng để tải về.
                  </p>
                </div>
              </div>

              <div className="h-0.5 w-full bg-black/10 my-1 rounded"></div>

              <button
                onClick={handleDownload}
                disabled={!finalImage}
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-3 border-black bg-lime-400 px-5 py-4 font-black text-lg text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:bg-lime-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={22} className="group-hover:animate-bounce" />
                TẢI ẢNH VỀ MÁY
              </button>

              <button
                onClick={handleShare}
                disabled={!finalImage}
                className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-3 border-black bg-cyan-400 px-5 py-4 font-black text-lg text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:bg-cyan-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#000] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Share2
                  size={22}
                  className="group-hover:rotate-12 transition-transform"
                />
                CHIA SẺ NGAY
              </button>

              <div className="h-0.5 w-full my-1 rounded border-t-2 border-dashed border-zinc-300 bg-transparent"></div>

              <Link
                href="/"
                onClick={clearSession}
                className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-black bg-zinc-100 px-5 py-3 font-bold text-sm text-black transition-all hover:bg-pink-300 shadow-[2px_2px_0px_0px_#000]"
              >
                <Home size={18} />
                CHỤP LẠI TỪ ĐẦU
              </Link>
            </Y2kWindow>
          </div>
        </div>
      </div>

      <div className="pb-4 sm:pb-6 pt-2 w-full">
        <FilmStripFooter text="SAVE • SHARE • REPEAT" />
      </div>
    </Y2kShell>
  );
}

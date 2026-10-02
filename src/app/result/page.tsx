"use client";

import { usePhotoStore } from "@/stores/photoStore";
import Link from "next/link";
import {
  Download,
  Share2,
  Home,
  Camera,
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
      <Y2kMarquee
        tone="black"
        items={["TA-DA", "STRIP READY", "DOWNLOAD PNG", "SHARE THE VIBE", "Y2K FOREVER"]}
      />

      <div className="my-4 px-3 text-center sm:my-6">
        <h1 className="text-2xl font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[3px_3px_0px_#000] sm:text-4xl">
          Ta-da! Hoàn tất
        </h1>
      </div>

      <div className="z-10 mb-8 flex w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 sm:px-6 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center shrink-0">
          {finalImage ? (
            <div className="rounded-2xl border-4 border-black bg-white p-3 shadow-[6px_6px_0px_0px_#000] sm:p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={finalImage}
                alt="Final Photo Booth"
                className="block h-auto max-h-[75vh] w-64 rounded-lg object-contain sm:w-72 md:w-80"
              />
            </div>
          ) : (
            <div className="flex h-80 w-64 flex-col items-center justify-center rounded-2xl border-4 border-black bg-white p-6 text-center shadow-[6px_6px_0px_0px_#000] sm:h-96 sm:w-80">
              <p className="mb-2 text-xl font-black uppercase">Chưa có ảnh</p>
              <p className="mb-4 text-sm font-bold text-zinc-500">
                Vui lòng quay lại studio chụp ảnh nhé.
              </p>
              <Link
                href="/capture"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-3 border-black bg-pink-400 px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_#000] hover:bg-pink-300"
              >
                <Camera size={16} />
                Đến phòng chụp
              </Link>
            </div>
          )}
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 lg:sticky lg:top-8">
          <Y2kWindow
            title="GET_STRIP.EXE"
            bodyClassName="flex flex-col gap-3 bg-white p-4 sm:p-5"
          >
            <button
              onClick={handleDownload}
              disabled={!finalImage}
              className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-3 border-black bg-lime-400 px-5 py-3 font-black text-base text-black shadow-[3px_3px_0px_0px_#000] transition-all hover:bg-lime-300 hover:translate-x-0.5 hover:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={20} />
              TẢI ẢNH VỀ MÁY
            </button>

            <button
              onClick={handleShare}
              disabled={!finalImage}
              className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-3 border-black bg-cyan-400 px-5 py-3 font-black text-base text-black shadow-[3px_3px_0px_0px_#000] transition-all hover:bg-cyan-300 hover:translate-x-0.5 hover:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Share2 size={20} />
              CHIA SẺ NGAY
            </button>

            <Link
              href="/"
              onClick={clearSession}
              className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-black bg-zinc-100 px-5 py-2.5 font-bold text-sm text-black transition-all hover:bg-pink-300"
            >
              <Home size={18} />
              CHỤP LẠI TỪ ĐẦU
            </Link>
          </Y2kWindow>
        </div>
      </div>

      <FilmStripFooter text="SAVE • SHARE • REPEAT" />
    </Y2kShell>
  );
}

"use client";

import { usePhotoStore } from "@/stores/photoStore";
import Link from "next/link";
import {
  Download,
  Share2,
  Home,
  PartyPopper,
  Sparkles,
  Heart,
  Printer,
  Star,
  Camera,
} from "lucide-react";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

export default function ResultPage() {
  const { finalImage, clearSession, cutMode, customText } = usePhotoStore();

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

      {/* HEADER TITLE */}
      <div className="flex items-center justify-center gap-3 my-6 sm:my-8 z-10 px-3">
        <PartyPopper className="text-pink-500 shrink-0" size={36} />
        <h1 className="text-3xl md:text-5xl font-black uppercase text-center text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[4px_4px_0px_#000]">
          Ta-da! Hoàn tất
        </h1>
        <PartyPopper className="text-cyan-500 transform scale-x-[-1] shrink-0" size={36} />
      </div>

      {/* MAIN CONTAINER: CENTERED & BALANCED */}
      <div className="w-full max-w-5xl px-4 sm:px-6 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-12 z-10 mb-10">
        
        {/* PHOTO STRIP PREVIEW (Straight, Centered, No Tilting) */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative">
            {finalImage ? (
              <div className="bg-white p-3 sm:p-4 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalImage}
                  alt="Final Photo Booth"
                  className="w-64 sm:w-72 md:w-80 h-auto max-h-[75vh] object-contain rounded-lg block mx-auto"
                />
              </div>
            ) : (
              <div className="w-72 sm:w-80 h-96 bg-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_#000] flex items-center justify-center p-6 text-center">
                <div>
                  <p className="font-black text-xl mb-2 uppercase">Chưa có ảnh</p>
                  <p className="text-sm text-zinc-500 font-bold mb-4">
                    Vui lòng quay lại studio chụp ảnh nhé.
                  </p>
                  <Link href="/capture">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 bg-pink-400 hover:bg-pink-300 border-3 border-black px-4 py-2 font-black rounded-xl text-xs uppercase shadow-[3px_3px_0px_0px_#000] cursor-pointer"
                    >
                      <Camera size={16} />
                      Đến phòng chụp
                    </button>
                  </Link>
                </div>
              </div>
            )}

            {/* Badges neatly positioned */}
            <div className="absolute -top-3 -left-3 bg-yellow-300 border-2 border-black font-black text-[10px] px-2.5 py-1 rounded-full shadow-[2px_2px_0px_0px_#000] z-20 flex items-center gap-1">
              <Sparkles size={12} />
              ORIGINAL STRIP
            </div>
            <div className="absolute -bottom-3 -right-3 bg-pink-400 text-white border-2 border-black font-black text-[10px] px-2.5 py-1 rounded-lg shadow-[2px_2px_0px_0px_#000] z-20">
              ★ PRINT READY
            </div>
          </div>
        </div>

        {/* ACTIONS & INFO SIDEBAR */}
        <div className="w-full max-w-md flex flex-col gap-4 lg:sticky lg:top-8">
          <Y2kWindow
            title="GET_STRIP.EXE"
            badge={<Sparkles size={14} className="text-yellow-300" />}
            bodyClassName="p-5 sm:p-6 flex flex-col gap-4 bg-white"
          >
            <div className="inline-block bg-yellow-400 text-black border-2 border-black text-sm font-black px-4 py-1 rounded-full uppercase w-max">
              Nhận ảnh thôi!
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="border-2 border-black rounded-xl p-2 text-center bg-pink-50">
                <p className="font-black text-lg leading-none">{cutMode === "2cut" ? "2" : "4"}</p>
                <p className="text-[9px] font-bold uppercase text-zinc-500">cuts</p>
              </div>
              <div className="border-2 border-black rounded-xl p-2 text-center bg-cyan-50">
                <p className="font-black text-lg leading-none">PNG</p>
                <p className="text-[9px] font-bold uppercase text-zinc-500">export</p>
              </div>
              <div className="border-2 border-black rounded-xl p-2 text-center bg-yellow-50">
                <p className="font-black text-lg leading-none">Y2K</p>
                <p className="text-[9px] font-bold uppercase text-zinc-500">vibe</p>
              </div>
            </div>

            {customText ? (
              <p className="text-xs font-bold bg-zinc-50 border-2 border-dashed border-black rounded-xl px-3 py-2 font-mono text-center uppercase">
                “{customText}”
              </p>
            ) : null}

            <button
              onClick={handleDownload}
              disabled={!finalImage}
              className="group flex items-center justify-center gap-3 w-full bg-lime-400 hover:bg-lime-300 text-black px-6 py-4 rounded-2xl font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Download size={22} className="group-hover:animate-bounce" />
              TẢI ẢNH VỀ MÁY
            </button>

            <button
              onClick={handleShare}
              disabled={!finalImage}
              className="group flex items-center justify-center gap-3 w-full bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-4 rounded-2xl font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Share2 size={22} className="group-hover:rotate-12 transition-transform" />
              CHIA SẺ NGAY
            </button>

            <div className="w-full h-1 bg-black my-1 border-dashed border-t-4 border-white" />

            <Link href="/" onClick={clearSession} className="block w-full">
              <button
                type="button"
                className="group flex items-center justify-center gap-2 w-full bg-gray-100 text-black px-6 py-3.5 rounded-2xl font-bold text-base border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-pink-300 hover:translate-y-0.5 hover:translate-x-0.5 active:translate-y-1 active:translate-x-1 active:shadow-none transition-all cursor-pointer"
              >
                <Home size={18} />
                CHỤP LẠI TỪ ĐẦU
              </button>
            </Link>
          </Y2kWindow>

          <div className="bg-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] flex gap-3">
            <Printer size={20} className="shrink-0 mt-0.5 text-black" />
            <div>
              <p className="font-black text-xs uppercase">In như booth Hàn</p>
              <p className="text-[11px] font-semibold text-zinc-600 mt-0.5">
                Tải file PNG về rồi in khổ dọc mini — dán sticker, viết bút gel lên viền cực xinh!
              </p>
            </div>
          </div>

          <div className="bg-pink-400 text-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_#000] flex gap-3">
            <Star size={20} className="shrink-0 fill-yellow-300 text-yellow-300" />
            <div>
              <p className="font-black text-xs uppercase">Share story Instagram</p>
              <p className="text-[11px] font-semibold mt-0.5">
                Đăng dải ảnh lên story, tag bạn thân và dùng hashtag #Life4Cut #Y2KBooth nhé.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-pink-500">
        <Heart size={16} fill="currentColor" />
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-black">
          thanks for visiting snapbooth
        </span>
        <Heart size={16} fill="currentColor" />
      </div>

      <FilmStripFooter text="SAVE • SHARE • REPEAT" />
    </Y2kShell>
  );
}

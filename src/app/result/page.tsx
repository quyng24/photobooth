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
} from "lucide-react";

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

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "My Photo Booth",
          text: "Check out my photo!",
          files: [file],
        });

        return;
      }

      alert(
        "Trình duyệt không hỗ trợ chia sẻ trực tiếp. Bạn có thể tải ảnh xuống trước.",
      );
    } catch (error) {
      if ((error as DOMException)?.name === "AbortError") {
        return;
      }
      console.error("Share failed:", error);
      alert("Không thể chia sẻ ảnh.");
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 bg-[linear-gradient(to_right,#3b82f622_2px,transparent_2px),linear-gradient(to_bottom,#3b82f622_2px,transparent_2px)] bg-size-[32px_32px] p-4 md:p-10 flex flex-col items-center overflow-hidden relative">
      {/* Decorations */}
      <div className="absolute top-10 left-10 md:left-20 text-pink-500 animate-bounce">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 text-yellow-400 animate-pulse">
        <Sparkles size={50} fill="currentColor" />
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-8 mt-4 z-10">
        <PartyPopper className="text-pink-500" size={40} />
        <h1 className="text-4xl md:text-5xl font-black uppercase text-center text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[4px_4px_0px_#000]">
          Ta-da! Hoàn tất
        </h1>
        <PartyPopper
          className="text-cyan-500 transform scale-x-[-1]"
          size={40}
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 z-10">
        {/* Final image */}
        <div className="relative group">
          <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-sm" />
          <div className="relative z-10 transform -rotate-3 transition-transform duration-300 group-hover:rotate-0">
            {finalImage ? (
              <div className="bg-white p-4 border-4 border-black shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={finalImage}
                  alt="Final Photo Booth"
                  className="w-full max-w-md h-auto block"
                />
              </div>
            ) : (
              <div className="w-80 h-96 bg-white border-4 border-black flex items-center justify-center p-6 text-center">
                <div>
                  <p className="font-black text-xl mb-2">Chưa có ảnh</p>
                  <p className="text-sm text-zinc-500 font-bold">
                    Vui lòng quay lại bước chỉnh sửa.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="w-full max-w-sm flex flex-col gap-6 bg-white p-8 border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="inline-block bg-yellow-400 text-black border-2 border-black text-sm font-black px-4 py-1 rounded-full uppercase w-max mb-2 transform -rotate-2">
            Nhận ảnh thôi!
          </div>
          <div className="flex flex-col gap-4">
            {/* Download */}
            <button
              onClick={handleDownload}
              disabled={!finalImage}
              className="group flex items-center justify-center gap-3 w-full bg-lime-400 text-black px-6 py-4 rounded-2xl font-black text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={24} className="group-hover:animate-bounce" />
              TẢI ẢNH VỀ MÁY
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              disabled={!finalImage}
              className="group flex items-center justify-center gap-3 w-full bg-cyan-400 text-black px-6 py-4 rounded-2xl font-black text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
              CHIA SẺ NGAY
            </button>
          </div>
          <div className="w-full h-1 bg-black my-2 border-dashed border-t-4 border-white" />

          {/* New session */}
          <Link href="/" onClick={clearSession} className="block w-full">
            <button className="group flex items-center justify-center gap-2 w-full bg-gray-100 text-black px-6 py-4 rounded-2xl font-bold text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-300 hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
              <Home size={20} />
              CHỤP LẠI TỪ ĐẦU
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

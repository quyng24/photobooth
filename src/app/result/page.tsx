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
  const { photos, clearPhotos } = usePhotoStore();

  const handleDownload = () => {
    alert("Đang tải bức ảnh tuyệt đẹp của bạn xuống! 📥");
  };

  return (
    <main className="min-h-screen bg-blue-50 bg-[linear-gradient(to_right,#3b82f622_2px,transparent_2px),linear-gradient(to_bottom,#3b82f622_2px,transparent_2px)] bg-size-[32px_32px] p-4 md:p-10 flex flex-col items-center overflow-hidden relative">
      <div className="absolute top-10 left-10 md:left-20 text-pink-500 animate-bounce">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 md:right-20 text-yellow-400 animate-pulse">
        <Sparkles size={50} fill="currentColor" />
      </div>

      <div className="flex items-center gap-3 mb-8 mt-4 z-10">
        <PartyPopper className="text-pink-500" size={40} />
        <h1 className="text-4xl md:text-5xl font-black uppercase text-center text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[4px_4px_0px_#000]">
          Ta-da! Hoàn tất 🎉
        </h1>
        <PartyPopper
          className="text-cyan-500 transform scale-x-[-1]"
          size={40}
        />
      </div>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-sm"></div>
          <div className="w-70 bg-white p-4 pb-16 border-4 border-black relative z-10 transform -rotate-3 transition-transform duration-300 group-hover:rotate-0 flex flex-col gap-3">
            {photos.length > 0
              ? photos.map((photoSrc: string, index: number) => (
                  <div
                    key={index}
                    className="w-full aspect-4/3 bg-gray-200 border-2 border-black overflow-hidden relative"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photoSrc}
                      alt={`Cut ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              : Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full aspect-4/3 bg-gray-200 border-2 border-black flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-pink-200 to-cyan-200 opacity-50"></div>
                    <span className="font-black text-gray-400 uppercase">
                      Photo {i + 1}
                    </span>
                  </div>
                ))}

            <div className="absolute bottom-4 left-0 w-full text-center">
              <p className="font-black text-2xl uppercase tracking-tighter text-black">
                Snap&Share
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-6 bg-white p-8 border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="inline-block bg-yellow-400 text-black border-2 border-black text-sm font-black px-4 py-1 rounded-full uppercase w-max mb-2 transform -rotate-2">
            Nhận ảnh thôi! 🚀
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleDownload}
              className="group flex items-center justify-center gap-3 w-full bg-lime-400 text-black px-6 py-4 rounded-2xl font-black text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
            >
              <Download size={24} className="group-hover:animate-bounce" />
              TẢI ẢNH VỀ MÁY
            </button>

            <button className="group flex items-center justify-center gap-3 w-full bg-cyan-400 text-black px-6 py-4 rounded-2xl font-black text-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
              <Share2
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
              CHIA SẺ NGAY
            </button>
          </div>

          <div className="w-full h-1 bg-black my-2 border-dashed border-t-4 border-white"></div>

          <Link href="/" onClick={clearPhotos} className="block w-full">
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

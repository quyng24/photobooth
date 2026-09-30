"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { usePhotoStore } from "@/stores/photoStore";

export default function SetupPage() {
  const { cutMode, setCutMode } = usePhotoStore();

  return (
    <main className="min-h-screen bg-fuchsia-50 bg-[radial-gradient(#d946ef_2px,transparent_2px)] background-size-[24px_24px] p-4 md:p-10 flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="text-yellow-500 animate-pulse" size={36} />
        <h1 className="text-4xl md:text-5xl font-black uppercase text-black drop-shadow-[4px_4px_0px_#22d3ee]">
          Chọn khung ảnh
        </h1>
        <Sparkles className="text-pink-500 animate-pulse" size={36} />
      </div>

      <div className="w-full max-w-3xl bg-white border-4 border-black rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
        <div className="bg-black px-4 py-2 flex items-center justify-between border-b-4 border-black">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400 border border-white"></div>
          </div>
          <span className="text-white text-xs font-mono tracking-widest font-bold">
            FRAME_SELECT.EXE
          </span>
        </div>

        <div className="p-8 md:p-12 flex flex-col items-center bg-yellow-50/50">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            <button
              onClick={() => setCutMode("2cut")}
              className={`relative flex flex-col items-center p-4 border-4 border-black rounded-2xl transition-all duration-200 w-44 md:w-52
                ${
                  cutMode === "2cut"
                    ? "bg-cyan-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                    : "bg-white hover:bg-gray-100 opacity-60 hover:opacity-100"
                }
              `}
            >
              <div className="w-24 bg-white border-2 border-black p-2 pb-6 shadow-inner rounded-sm flex flex-col gap-2 mb-4">
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-2 font-black text-2xl uppercase">
                <LayoutTemplate size={24} />2 CUT
              </div>

              {cutMode === "2cut" && (
                <div className="absolute -top-4 -right-4 bg-pink-500 text-white p-2 rounded-full border-2 border-black shadow-sm">
                  <Sparkles size={20} fill="currentColor" />
                </div>
              )}
            </button>

            <button
              onClick={() => setCutMode("4cut")}
              className={`relative flex flex-col items-center p-4 border-4 border-black rounded-2xl transition-all duration-200 w-44 md:w-52
                ${
                  cutMode === "4cut"
                    ? "bg-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-x-0.5 -translate-y-0.5"
                    : "bg-white hover:bg-gray-100 opacity-60 hover:opacity-100"
                }
              `}
            >
              <div className="w-24 bg-white border-2 border-black p-2 pb-6 shadow-inner rounded-sm flex flex-col gap-1.5 mb-4">
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
                <div className="w-full aspect-4/3 bg-gray-200 border border-gray-400 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-2 font-black text-2xl uppercase">
                <ImageIcon size={24} />4 CUT
              </div>

              {cutMode === "4cut" && (
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-black p-2 rounded-full border-2 border-black shadow-sm">
                  <Sparkles size={20} fill="currentColor" />
                </div>
              )}
            </button>
          </div>

          <Link href="/capture" className="w-full max-w-sm">
            <button className="group flex items-center justify-center w-full gap-3 bg-black text-white px-8 py-4 rounded-xl font-black text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(34,211,238,1)] hover:translate-y-1.5] hover:translate-x-1.5 hover:shadow-none hover:text-cyan-300 transition-all active:bg-gray-900">
              TIẾP TỤC
              <ArrowRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

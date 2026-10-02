"use client";

import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  Sparkles,
  Image as ImageIcon,
  Check,
  ArrowLeft,
} from "lucide-react";
import { usePhotoStore } from "@/stores/photoStore";
import { Y2kShell } from "@/components/y2k/Y2kShell";
import { Y2kWindow } from "@/components/y2k/Y2kWindow";
import { Y2kSteps } from "@/components/y2k/Y2kSteps";
import { Y2kMarquee } from "@/components/y2k/Y2kMarquee";
import { FilmStripFooter } from "@/components/y2k/FilmStripFooter";

export default function SetupPage() {
  const { cutMode, setCutMode } = usePhotoStore();

  return (
    <Y2kShell showStickers>
      <Y2kMarquee
        tone="cyan"
        items={["CHOOSE YOUR FRAME", "2-CUT MINI", "4-CUT CLASSIC", "Y2K BOOTH ONLINE"]}
      />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-4 px-4 py-4 sm:py-6">
        <div className="flex w-full items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-black bg-white px-3 py-1.5 text-xs font-extrabold shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300"
          >
            <ArrowLeft size={14} />
            TRANG CHỦ
          </Link>
          <Y2kSteps current={1} />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 shrink-0 text-yellow-400" fill="currentColor" />
          <h1 className="text-center text-2xl font-black uppercase tracking-tight drop-shadow-[2px_2px_0px_#22d3ee] sm:text-3xl">
            Chọn Khung Ảnh
          </h1>
          <Sparkles className="h-6 w-6 shrink-0 text-pink-500" fill="currentColor" />
        </div>

        <Y2kWindow
          title="FRAME_SELECT.EXE"
          className="w-full"
          bodyClassName="flex flex-col items-center bg-[#fffbe6] p-3 sm:p-4"
        >
          <div className="mb-2 grid w-full grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCutMode("2cut")}
              className={`relative flex cursor-pointer flex-col items-center rounded-2xl border-3 border-black p-3 text-center transition-all ${
                cutMode === "2cut"
                  ? "bg-cyan-300 shadow-[5px_5px_0px_0px_#000]"
                  : "bg-white opacity-80 shadow-[3px_3px_0px_0px_#000] hover:opacity-100"
              }`}
            >
              <div className="mb-2 flex w-20 flex-col gap-1 rounded-md border-2 border-black bg-white p-1.5">
                <div className="flex aspect-4/3 items-center justify-center rounded border border-black bg-pink-100">
                  <ImageIcon size={12} className="text-pink-400" />
                </div>
                <div className="flex aspect-4/3 items-center justify-center rounded border border-black bg-pink-100">
                  <ImageIcon size={12} className="text-pink-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 text-lg font-black uppercase">
                <LayoutTemplate size={16} /> 2 CUT
              </div>
              <span className="text-[11px] font-semibold">Dải 2 ảnh • Gọn nhẹ</span>
              {cutMode === "2cut" && (
                <div className="absolute -top-2 -right-2 rounded-full border-2 border-black bg-pink-500 p-1 text-white">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setCutMode("4cut")}
              className={`relative flex cursor-pointer flex-col items-center rounded-2xl border-3 border-black p-3 text-center transition-all ${
                cutMode === "4cut"
                  ? "bg-pink-400 shadow-[5px_5px_0px_0px_#000]"
                  : "bg-white opacity-80 shadow-[3px_3px_0px_0px_#000] hover:opacity-100"
              }`}
            >
              <div className="mb-2 grid w-20 grid-cols-2 gap-1 rounded-md border-2 border-black bg-white p-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex aspect-4/3 items-center justify-center rounded border border-black bg-cyan-100"
                  >
                    <ImageIcon size={10} className="text-cyan-500" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-lg font-black uppercase">
                <ImageIcon size={16} /> 4 CUT
              </div>
              <span className="text-[11px] font-semibold">Dải 4 ảnh • Chuẩn Hàn</span>
              {cutMode === "4cut" && (
                <div className="absolute -top-2 -right-2 rounded-full border-2 border-black bg-yellow-300 p-1">
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </button>
          </div>

          <p className="mb-3 text-center text-[11px] font-semibold text-zinc-600">
            Ánh sáng hướng về mặt · Tạo dáng theo countdown · Có thể retake từng ô
          </p>

          <Link
            href={`/capture?mode=${cutMode}`}
            className="group flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-xl border-3 border-black bg-black py-3 text-base font-black text-white shadow-[4px_4px_0px_0px_#22d3ee] hover:text-cyan-300"
          >
            TIẾP TỤC CHỤP
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Y2kWindow>
      </div>

      <FilmStripFooter text="PICK A FRAME • THEN SAY CHEESE" />
    </Y2kShell>
  );
}

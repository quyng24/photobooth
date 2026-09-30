"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Palette, Wand2, ArrowRight } from "lucide-react";
import { usePhotoStore } from "@/stores/photoStore";
import { renderPhotoStrip } from "@/utils/lib/renderPhotoStrip";

const FRAME_STYLES = [
  { id: "pink", name: "Y2K Pink", bg: "bg-pink-300", text: "text-pink-900" },
  { id: "cyan", name: "Cyber Cyan", bg: "bg-cyan-300", text: "text-cyan-950" },
  {
    id: "yellow",
    name: "Neon Yellow",
    bg: "bg-yellow-300",
    text: "text-yellow-950",
  },
  { id: "dark", name: "Retro Black", bg: "bg-zinc-900", text: "text-pink-400" },
];

const FILTER_STYLES = [
  { id: "none", name: "Normal", filter: "none" },
  {
    id: "vintage",
    name: "Y2K Film",
    filter: "sepia(0.3) contrast(1.1) saturate(1.3) hue-rotate(-10deg)",
  },
  { id: "bw", name: "B&W Film", filter: "grayscale(1) contrast(1.2)" },
];

export default function EditPage() {
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();
  const {
    photos,
    frameBg,
    frameText,
    setFrame,
    filter,
    setFilter,
    customText,
    setCustomText,
    setFinalImage,
  } = usePhotoStore();

  const handleExport = async () => {
    try {
      setIsExporting(true);

      const finalImage = await renderPhotoStrip({
        photos,
        frameBg,
        filter,
        customText,
      });

      setFinalImage(finalImage);
      router.push("/result");
    } catch (error) {
      console.error("Export image failed: ", error);
      alert("Không thể xuất ảnh. Vui lòng thử lại");
    } finally {
      setIsExporting(false);
    }
  };

  if (photos.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <p>Chưa có ảnh nào. Đang quay lại...</p>
        <button
          onClick={() => router.push("/")}
          className="ml-4 underline font-bold"
        >
          Về trang chủ
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pink-100 bg-[radial-gradient(#ff85c0_2px,transparent_2px)] bg-size-[24px_24px] p-4 md:p-10 font-sans text-black">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/2 bg-white p-6 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <div className="border-b-4 border-black pb-4">
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Trang Trí
            </h1>
            <p className="text-sm font-bold text-zinc-600">
              Làm cho bức ảnh của bạn thật phong cách!
            </p>
          </div>

          <div>
            <label className="text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" /> Chọn Màu Khung
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FRAME_STYLES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrame(f.bg, f.text)}
                  className={`p-3 text-xs font-bold rounded-xl border-2 border-black text-center transition-all ${f.bg} ${frameBg === f.bg ? "ring-4 ring-black scale-105" : "hover:scale-105"}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex text-sm font-black uppercase tracking-wider mb-3 items-center gap-2">
              <Wand2 className="w-5 h-5 text-pink-500" /> Chọn Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {FILTER_STYLES.map((ft) => (
                <button
                  key={ft.id}
                  onClick={() => setFilter(ft.filter)}
                  className={`px-4 py-2 text-xs font-bold rounded-full border-2 border-black transition-all ${filter === ft.filter ? "bg-black text-white" : "bg-zinc-100 hover:bg-zinc-200"}`}
                >
                  {ft.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-black uppercase tracking-wider mb-2">
              Chữ Ký Kỷ Niệm
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={25}
              className="w-full px-4 py-3 border-2 border-black rounded-xl font-mono text-sm font-bold bg-zinc-50 focus:bg-white outline-none ring-black focus:ring-2"
            />
          </div>

          <div className="pt-4 border-t-4 border-black">
            {/* <Link href="/result"> */}
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-4 rounded-xl font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
            >
              HOÀN THÀNH & XUẤT ẢNH{" "}
              {isExporting ? "Đang xuất ảnh" : "Hoàn Thành & Xuất Ảnh"}
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* </Link> */}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <div
            className={`relative p-4 rounded-xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-75 transition-all ${frameBg}`}
          >
            <div className="text-center mb-3 pb-2 border-b-2 border-dashed border-black/40">
              <span className="font-black text-xs uppercase tracking-widest block">
                ★ Y2K SNAP ★
              </span>
            </div>

            <div className="space-y-3">
              {photos.map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative aspect-4/3 bg-zinc-200 rounded-lg border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={`Snap ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ filter: filter }}
                  />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-mono px-1 rounded">
                    0{index + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-2 border-t-2 border-dashed border-black/40 text-center">
              <p
                className={`font-mono font-black text-sm tracking-wider uppercase ${frameText}`}
              >
                {customText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

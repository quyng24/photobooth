"use client";

import { usePhotoStore } from "@/stores/photoStore";
import Link from "next/link";

export default function EditPage() {
  const { photos } = usePhotoStore();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8">Trang trí ảnh</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-center">
        <div className="w-64 h-auto aspect-1/3 bg-white border-8 border-pink-200 shadow-xl flex flex-col gap-2 p-2">
          {photos.length > 0 ? (
            photos.map((photoSrc: string, index: number) => (
              <div
                key={index}
                className="flex-1 bg-gray-200 overflow-hidden relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoSrc}
                  alt={`Cut ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="flex-1 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
              Chưa có ảnh (Quay lại chụp)
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button className="bg-white px-6 py-3 rounded-xl border shadow-sm font-semibold">
            Đổi màu viền
          </button>
          <button className="bg-white px-6 py-3 rounded-xl border shadow-sm font-semibold">
            Thêm Sticker
          </button>

          <Link href="/result">
            <button className="bg-black text-white px-6 py-3 rounded-xl font-bold mt-4 hover:bg-pink-500">
              Hoàn thành
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

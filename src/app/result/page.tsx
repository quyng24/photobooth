import Link from "next/link";
import { Download, Share2, Home } from "lucide-react";

export default function ResultPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tác phẩm của bạn! 🎉
      </h1>

      <div className="w-64 h-96 bg-white border-8 border-pink-200 shadow-2xl flex flex-col gap-2 p-2 mb-8 transform rotate-2">
        <div className="bg-gray-300 flex-1 flex items-center justify-center">
          Photo
        </div>
        <div className="bg-gray-300 flex-1 flex items-center justify-center">
          Photo
        </div>
        <div className="bg-gray-300 flex-1 flex items-center justify-center">
          Photo
        </div>
        <div className="bg-gray-300 flex-1 flex items-center justify-center">
          Photo
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800">
          <Download size={20} /> Tải về
        </button>
        <button className="flex items-center gap-2 bg-white text-black border-2 border-black px-6 py-3 rounded-full font-bold hover:bg-gray-100">
          <Share2 size={20} /> Chia sẻ
        </button>
      </div>

      <Link href="/">
        <button className="mt-8 flex items-center gap-2 text-gray-500 hover:text-black font-semibold">
          <Home size={20} /> Chụp lại từ đầu
        </button>
      </Link>
    </main>
  );
}

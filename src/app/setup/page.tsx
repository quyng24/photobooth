import { Link } from "lucide-react";

export default function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-8">Chọn khung ảnh</h1>

      <div className="flex gap-6 mb-12">
        <div className="w-32 h-48 bg-white border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center cursor-pointer hover:border-pink-500">
          <span className="font-bold">2 CUT</span>
        </div>
        <div className="w-32 h-48 bg-white border-4 border-pink-500 rounded-xl flex items-center justify-center cursor-pointer shadow-lg">
          <span className="font-bold text-pink-500">4 CUT</span>
        </div>
      </div>

      <Link href="/capture">
        <button className="bg-black text-white px-10 py-3 rounded-full font-bold text-lg hover:bg-pink-500 transition-colors">
          Tiếp tục
        </button>
      </Link>
    </main>
  );
}

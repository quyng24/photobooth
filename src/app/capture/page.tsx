"use client";

import { Aperture, Camera, CameraOff, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePhotoStore } from "@/stores/photoStore";

const SAMPLE_PHOTOS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
];

export default function CapturePage() {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState<boolean>(false);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const { photos, addPhoto, clearSession } = usePhotoStore();

  useEffect(() => {
    clearSession();

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.warn("Camera failed, entering Mock Mode for VM:", err);
        setIsMockMode(true);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [clearSession]);

  const captureCanvasPhoto = useCallback(() => {
    if (isMockMode) {
      return SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)];
    }

    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 480;
      canvas.height = videoRef.current.videoHeight || 640;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg", 0.9);
      }
    }
    return null;
  }, [isMockMode]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const runCountdown = (): Promise<void> => {
    return new Promise((resolve) => {
      let count = 3;
      setCountdown(count);
      const interval = setInterval(() => {
        count -= 1;
        setCountdown(count > 0 ? count : null);
        if (count === 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const startPhotoSession = async () => {
    setIsCapturing(true);

    for (let i = 0; i < 4; i++) {
      await runCountdown();

      const photoDataUrl = captureCanvasPhoto();
      if (photoDataUrl) addPhoto(photoDataUrl);

      setFlash(true);
      setTimeout(() => setFlash(false), 200);

      if (i < 3) await sleep(1000);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    router.push("/edit");
  };
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-teal-50 bg-[linear-gradient(to_right,#0f766e22_1px,transparent_1px),linear-gradient(to_bottom,#0f766e22_1px,transparent_1px)] bg-size-[32px_32px] p-4 md:p-6 overflow-hidden">
      {flash && (
        <div className="absolute inset-0 bg-white z-100 transition-opacity duration-75"></div>
      )}

      <div className="w-full max-w-lg bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative z-10">
        <div className="bg-black px-4 py-2 flex items-center justify-between border-b-4 border-black rounded-t-2xl">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-cyan-400 border border-white"></div>
          </div>
          <span className="text-white text-xs font-mono tracking-widest font-bold">
            CAPTURE_STUDIO.EXE
          </span>
        </div>

        <div className="p-6 flex flex-col items-center bg-gray-50 rounded-b-2xl">
          <div className="w-full flex justify-between items-end mb-4 px-2">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-black flex items-center gap-2">
                SAY CHEESE!{" "}
                <Sparkles
                  className="text-yellow-400"
                  size={24}
                  fill="currentColor"
                />
              </h1>
              <p className="text-gray-500 font-bold text-sm">
                Chuẩn bị pose dáng nhé
              </p>
            </div>
            <div className="bg-cyan-300 text-black border-2 border-black font-black px-4 py-1 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3 transition-all">
              {photos.length} / 4
            </div>
          </div>

          <div className="relative w-full aspect-3/4 bg-black rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] mb-8 flex items-center justify-center group">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 z-20">
              <div
                className={`w-3 h-3 rounded-full ${isCapturing ? "bg-red-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span className="text-white text-xs font-bold font-mono tracking-wider">
                {isCapturing ? "REC" : "STBY"}
              </span>
            </div>

            <div className="absolute inset-4 border-2 border-white/30 pointer-events-none z-10">
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white"></div>
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white"></div>
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white"></div>
            </div>

            {isMockMode ? (
              <div className="text-center text-pink-500 flex flex-col items-center z-0">
                <CameraOff
                  size={48}
                  className="mb-4 text-pink-500 opacity-50"
                />
                <p className="font-mono text-sm px-4 text-zinc-400">
                  VM Mock Mode Active
                </p>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1] z-0"
              />
            )}

            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-30 transition-all">
                <span
                  className="text-[140px] font-black text-yellow-400 animate-bounce drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  style={{ WebkitTextStroke: "4px black" }}
                >
                  {countdown}
                </span>
              </div>
            )}
          </div>

          <div className="h-24 flex items-center justify-center">
            {!isCapturing ? (
              <button
                onClick={startPhotoSession}
                className="relative flex items-center justify-center w-20 h-20 bg-pink-500 text-black border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-400 active:translate-y-1.5 active:translate-x-1.5 active:shadow-none transition-all outline-none group"
              >
                <Camera
                  size={36}
                  fill="currentColor"
                  className="text-white drop-shadow-md group-hover:scale-110 transition-transform"
                />
              </button>
            ) : (
              <div className="flex flex-col items-center animate-pulse text-pink-500 font-bold">
                <Aperture size={32} className="animate-spin mb-2" />
                Đang chụp...
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

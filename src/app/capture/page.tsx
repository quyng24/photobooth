"use client";

import { Aperture } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePhotoStore } from "@/stores/photoStore";
import Webcam from "react-webcam";

export default function CapturePage() {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);

  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState<boolean>(false);

  const { photos, addPhoto, clearPhotos } = usePhotoStore();

  useEffect(() => {
    clearPhotos();
  }, [clearPhotos]);

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

  const captureSinglePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      addPhoto(imageSrc);
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
    }
  }, [addPhoto]);

  const startPhotoSession = async () => {
    setIsCapturing(true);

    for (let i = 0; i < 4; i++) {
      await runCountdown();
      captureSinglePhoto();
      if (i < 3) await sleep(1000);
    }

    router.push("/edit");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
      {flash && (
        <div className="absolute inset-0 bg-white z-50 transition-opacity duration-100"></div>
      )}

      <h1 className="text-white text-xl font-bold mb-4">
        Mỉm cười lên nào! ({photos.length}/4)
      </h1>

      <div className="relative w-full max-w-md aspect-3/4 bg-gray-900 rounded-2xl overflow-hidden mb-8 border-2 border-gray-600 z-10 shadow-2xl flex items-center justify-center">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
            aspectRatio: 3 / 4,
          }}
          className="w-full h-full object-cover"
        />

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
            <span className="text-[120px] font-black text-white drop-shadow-lg animate-pulse">
              {countdown}
            </span>
          </div>
        )}
      </div>

      {!isCapturing && (
        <button
          onClick={startPhotoSession}
          className="z-10 bg-white text-black p-6 rounded-full hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
        >
          <Aperture size={40} />
        </button>
      )}
    </main>
  );
}

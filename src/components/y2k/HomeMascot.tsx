"use client";

import { useEffect, useRef, useState } from "react";

interface HomeMascotProps {
  directions?: string;
  reactions?: string;
  className?: string;
}

export function HomeMascot({
  directions = "/mascots/cat-directions.webp",
  reactions = "/mascots/cat-reactions.webp",
  className = "",
}: HomeMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [col, setCol] = useState(1); // 0 (left), 1 (center), 2 (right)
  const [row, setRow] = useState(1); // 0 (top), 1 (center), 2 (bottom)
  const [isReacting, setIsReacting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Tính góc nhìn 3x3 theo vị trí con trỏ chuột
      const nextCol = dx < -50 ? 0 : dx > 50 ? 2 : 1;
      const nextRow = dy < -50 ? 0 : dy > 50 ? 2 : 1;

      setCol(nextCol);
      setRow(nextRow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    setIsReacting(true);
    setTimeout(() => setIsReacting(false), 1200);
  };

  // Sprite sheet 3x3
  const posX = col === 0 ? "0%" : col === 1 ? "50%" : "100%";
  const posY = row === 0 ? "0%" : row === 1 ? "50%" : "100%";

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      title="Bấm vào tớ nhé! Meow~"
      className={`relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${className}`}
    >
      <div
        className="w-full h-full drop-shadow-[2px_2px_0px_#000]"
        style={{
          backgroundImage: `url(${isReacting ? reactions : directions})`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${posX} ${posY}`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

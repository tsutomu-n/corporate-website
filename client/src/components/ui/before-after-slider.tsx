import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.src = beforeImage;
          }),
          new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.src = afterImage;
          }),
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, [beforeImage, afterImage]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setPosition(percentage);
  };

  if (isLoading) {
    return (
      <div className={cn(
        "animate-pulse bg-muted h-[400px] rounded-lg flex items-center justify-center", 
        className
      )}>
        <div className="text-muted-foreground">画像を読み込み中...</div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative h-[400px] select-none", className)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* After Image (Background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />

      {/* Before Image (Clip) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      />

      {/* Divider Line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize",
          isDragging ? "bg-primary" : "hover:bg-primary"
        )}
        style={{ left: `${position}%` }}
      />

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-2 py-1 rounded">
        施工前
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded">
        施工後
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const handleSliderChange = (value: number[]) => {
    setPosition(value[0]);
  };

  return (
    <div className={cn("relative h-[400px] select-none group", className)}>
      {/* After Image (Background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />

      {/* Before Image (Clip) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-[clip-path] duration-150"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      />

      {/* Divider Line with Drag Handle */}
      <div
        className={cn(
          "absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize transition-all",
          isDragging ? "bg-primary shadow-lg" : "hover:bg-primary",
        )}
        style={{ left: `${position}%` }}
      >
        <div className={cn(
          "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2",
          "w-8 h-8 rounded-full bg-white shadow-lg",
          "flex items-center justify-center",
          "transition-transform duration-200",
          isDragging ? "scale-110" : "group-hover:scale-110"
        )}>
          <ChevronLeft className="w-4 h-4 text-primary" />
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Slider Control */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <Slider
          min={0}
          max={100}
          step={0.1}
          value={[position]}
          onValueChange={handleSliderChange}
          onValueCommit={() => setIsDragging(false)}
          onPointerDown={() => setIsDragging(true)}
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-2 py-1 rounded backdrop-blur-sm">
        施工前
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded backdrop-blur-sm">
        施工後
      </div>
    </div>
  );
}
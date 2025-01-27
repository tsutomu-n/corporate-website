import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
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
      <div className={cn("animate-pulse bg-muted h-[400px] rounded-lg", className)} />
    );
  }

  return (
    <div className={cn("relative h-[400px] select-none", className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
        }}
      >
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${position}%` }}
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <Slider
          value={[position]}
          onValueChange={([value]) => setPosition(value)}
          className="cursor-ew-resize"
          step={0.1}
        />
      </div>
      <div className="absolute top-4 left-4 bg-black/60 text-white text-sm px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded">
        After
      </div>
    </div>
  );
}

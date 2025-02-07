import { cn } from "@/lib/utils";

interface ClockFaceProps {
  time: string | null;
  view: "hours" | "minutes";
  onChange: (newTime: string) => void;
}

export function ClockFace({ time, view, onChange }: ClockFaceProps) {
  const [hours, minutes] = time?.split(":").map(Number) ?? [0, 0];

  const handleClick = (value: number) => {
    if (view === "hours") {
      onChange(`${value.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
    } else {
      onChange(`${hours.toString().padStart(2, "0")}:${value.toString().padStart(2, "0")}`);
    }
  };

  const renderNumbers = () => {
    if (view === "hours") {
      return (
        <>
          {renderHourRing(1, 12, 100)} {/* Outer ring */}
          {renderHourRing(13, 24, 60)} {/* Inner ring - moved more towards center */}
        </>
      );
    } else {
      return renderMinuteRing();
    }
  };

  const renderHourRing = (start: number, end: number, radius: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start).map((num) => {
      const angle = (num - 3) * (360 / 12) * (Math.PI / 180);
      const left = 120 + radius * Math.cos(angle);
      const top = 120 + radius * Math.sin(angle);

      return (
        <button
          key={`hour-${radius}-${num}`}
          className={cn(
            "absolute flex items-center justify-center rounded-full text-sm transition-colors",
            num === hours ? "bg-primary text-primary-foreground" : "hover:bg-gray-200",
            radius === 100 ? "h-10 w-10 -ml-5 -mt-5" : "h-8 w-8 -ml-4 -mt-4"
          )}
          style={{ left: `${left}px`, top: `${top}px` }}
          onClick={() => handleClick(num)}
        >
          {num}
        </button>
      );
    });
  };

  const renderMinuteRing = () => {
    return Array.from({ length: 12 }, (_, i) => i * 5).map((num) => {
      const angle = (num - 15) * (360 / 60) * (Math.PI / 180);
      const radius = 100;
      const left = 120 + radius * Math.cos(angle);
      const top = 120 + radius * Math.sin(angle);

      return (
        <button
          key={`minute-${num}`}
          className={cn(
            "absolute flex h-10 w-10 -ml-5 -mt-5 items-center justify-center rounded-full text-sm transition-colors",
            num === minutes ? "bg-primary text-primary-foreground" : "hover:bg-gray-200"
          )}
          style={{ left: `${left}px`, top: `${top}px` }}
          onClick={() => handleClick(num)}
        >
          {num.toString().padStart(2, "0")}
        </button>
      );
    });
  };

  return (
    <div className="relative h-[240px] w-[240px] rounded-full border border-gray-200">
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      {renderNumbers()}
    </div>
  );
}

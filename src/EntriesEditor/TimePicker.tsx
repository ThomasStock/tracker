"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { ClockFace } from "./ClockFace";

export function TimePicker({ time, onTimeSelected }: { time: string | null; onTimeSelected: (time: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"hours" | "minutes">("hours");

  const handleTimeChange = (newTime: string) => {
    onTimeSelected(newTime);
    if (view === "hours") {
      setView("minutes");
    } else {
      setIsOpen(false);
      setView("hours");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input type="text" value={time ?? "- select -"} readOnly className="pr-8 text-center" />
          <Clock className="absolute right-6 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <ClockFace time={time} view={view} onChange={handleTimeChange} />
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              setView("hours");
            }}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

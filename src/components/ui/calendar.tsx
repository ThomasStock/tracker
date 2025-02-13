import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface CalendarProps {
  value: DateTime;
  onChange: (date: DateTime) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  const today = DateTime.now().startOf("day");
  const [viewedMonth, setViewedMonth] = useState(value.startOf("month"));
  const isToday = value.hasSame(today, "day");

  const days = useMemo(() => {
    const start = viewedMonth.startOf("month").startOf("week");
    const end = viewedMonth.endOf("month").endOf("week");

    const days: DateTime[] = [];
    let day = start;
    while (day <= end) {
      days.push(day);
      day = day.plus({ days: 1 });
    }
    return days;
  }, [viewedMonth]);

  const handleTodayClick = () => {
    setViewedMonth(today.startOf("month"));
    onChange(today);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="icon" onClick={() => setViewedMonth(viewedMonth.minus({ months: 1 }))}>
          <ChevronLeft className="!size-6" />
        </Button>
        <div className="flex flex-col items-center gap-1">
          <div className="font-semibold">{viewedMonth.toLocaleString({ month: "long", year: "numeric" })}</div>
          {!isToday && (
            <Button variant="outline" size="sm" onClick={handleTodayClick} className="h-6 text-xs">
              Today
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setViewedMonth(viewedMonth.plus({ months: 1 }))}>
          <ChevronRight className="!size-6" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-sm text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const isSelected = day.hasSame(value, "day");
          const isDayToday = day.hasSame(today, "day");
          const isCurrentMonth = day.hasSame(viewedMonth, "month");

          return (
            <Button
              key={day.toISO()}
              variant={isSelected ? "default" : isDayToday ? "secondary" : "ghost"}
              className={cn("h-9 w-9", !isCurrentMonth && "text-muted-foreground/50")}
              onClick={() => onChange(day)}
            >
              {day.toFormat("d")}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

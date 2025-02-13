import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  value: DateTime;
  onChange: (date: DateTime) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  const [viewedMonth, setViewedMonth] = React.useState(value.startOf("month"));
  const today = React.useMemo(() => DateTime.now(), []);

  const days = React.useMemo(() => {
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

  const weekDays = React.useMemo(() => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], []);

  const handleTodayClick = () => {
    setViewedMonth(today.startOf("month"));
    onChange(today);
  };

  return (
    <div className="w-full p-3">
      <div className="flex items-start justify-between mb-1">
        <Button variant="ghost" size="icon" onClick={() => setViewedMonth(viewedMonth.minus({ months: 1 }))}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="flex flex-col items-center mt-1.5">
          <div className="font-semibold">{viewedMonth.toLocaleString({ month: "long", year: "numeric" })}</div>
          {!viewedMonth.hasSame(today, "month") || !value.hasSame(today, "day") ? (
            <Button variant="link" size="sm" onClick={handleTodayClick} className="h-6 text-xs p-0">
              Today
            </Button>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setViewedMonth(viewedMonth.plus({ months: 1 }))}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="h-8 text-sm font-medium text-muted-foreground flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6 gap-1">
        {days.map((day) => {
          const isSelected = day.hasSame(value, "day");
          const isToday = day.hasSame(today, "day");
          const isOutsideMonth = !day.hasSame(viewedMonth, "month");

          return (
            <Button
              key={day.toISODate()}
              variant={isSelected ? "default" : "ghost"}
              size="icon"
              className={cn(
                "h-8 w-full rounded-md",
                isOutsideMonth && "text-muted-foreground/50",
                isToday && !isSelected && "border border-primary/50"
              )}
              onClick={() => onChange(day)}
            >
              <time dateTime={day.toISODate() ?? undefined}>{day.day}</time>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

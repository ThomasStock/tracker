import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StickyHeaderProps {
  children: ReactNode;
  className?: string;
  /**
   * Additional padding classes to override default padding
   */
  paddingClassName?: string;
}

export function StickyHeader({ children, className, paddingClassName }: StickyHeaderProps) {
  return (
    <header className={cn("sticky top-0 bg-background z-20 border-b mb-8", paddingClassName ?? "px-2 pb-4 pt-6", className)}>
      {children}
    </header>
  );
}

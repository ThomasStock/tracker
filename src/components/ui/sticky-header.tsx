import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StickyHeaderProps {
  children: ReactNode;
  className?: string;
}

export function StickyHeader({ children, className }: StickyHeaderProps) {
  return <header className={cn("sticky top-0 bg-background z-20 border-b mb-8", "px-2 pb-4 pt-6", className)}>{children}</header>;
}

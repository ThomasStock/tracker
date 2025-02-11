import { type ReactNode } from "react";

// Import version.txt as a string
import version from "@/version.txt?raw";

interface HeaderProps {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

export function Header({ leftButton, rightButton }: HeaderProps) {
  return (
    <div className="flex items-center justify-between sticky top-0 pt-2 z-20 bg-background">
      {leftButton ?? <div />}
      <span className="absolute left-1/2 -translate-x-1/2 text-xs text-muted-foreground">v{version.trim()}</span>
      {rightButton ?? <div />}
    </div>
  );
}

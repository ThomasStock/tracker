import { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Footer({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "z-30 fixed inset-4 top-[unset] flex flex-col py-1 rounded-xl bg-input border border-secondary-foreground/10 shadow-xl backdrop-blur-sm"
      )}
    >
      <div>{children}</div>
    </div>
  );
}

import { type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Footer({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "z-30 fixed bottom-2 left-2 right-2 flex flex-col py-1 rounded-xl bg-input border border-secondary-foreground/10 shadow-xl"
      )}
    >
      <div>{children}</div>
    </div>
  );
}

import { useState, type PropsWithChildren, type ReactNode } from "react";

// Import version.txt as a string
import version from "@/version.txt?raw";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeaderProps {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
}

const SCROLL_STICK_PIXELS = 50;

export function Header({ leftButton, rightButton, children }: PropsWithChildren<HeaderProps>) {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("down");
  const [scrollMultiplier, setScrollMultiplier] = useState(1);
  const [scrollYWhenUp, setScrollYWhenUp] = useState(0);

  console.log({ scrollYProgress: JSON.stringify(scrollY) });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - (scrollY.getPrevious() ?? -1);
    const previousScrollDirection = scrollDirection;
    const newScrollDirection = diff > 0 ? "down" : "up";
    setScrollDirection(newScrollDirection);

    let currentScrollWhenUp = scrollYWhenUp;
    if (previousScrollDirection === "down" && newScrollDirection === "up") {
      setScrollYWhenUp(latest);
      currentScrollWhenUp = scrollYWhenUp;
    }

    const relativeScroll =
      newScrollDirection === "down" || latest === 0
        ? Math.max(SCROLL_STICK_PIXELS - latest, 0)
        : Math.abs(Math.max(Math.min(latest - currentScrollWhenUp, 0), -SCROLL_STICK_PIXELS));
    setScrollMultiplier(relativeScroll ? relativeScroll / SCROLL_STICK_PIXELS : 0);
  });

  console.log({ scrollMultiplier, scrollDirection });

  const isDown = scrollDirection === "down";
  const showBox = scrollMultiplier === 0 && isDown;

  const applyMultiplier = (value: number) => value * scrollMultiplier;

  return (
    <div
      className={cn(
        "z-30 bg-background fixed top-0 left-0 right-0 flex flex-col pb-2 transition-all duration-100",
        showBox && "top-2 left-2 right-2 py-1 rounded-xl bg-input duration-300 border border-secondary-foreground/10 shadow-xl"
      )}
      style={{
        gap: applyMultiplier(10),
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          height: `${applyMultiplier(50)}px`,
          opacity: applyMultiplier(1),
        }}
      >
        {leftButton ?? <div />}
        <span className="absolute left-1/2 -translate-x-1/2 text-xs text-muted-foreground">v{version.trim()}</span>
        {rightButton ?? <div />}
      </div>
      <div>{children}</div>
    </div>
  );
}

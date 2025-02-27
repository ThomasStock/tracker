import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import NumberFlow, { continuous } from "@number-flow/react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="size-8 rounded-full border border-primary/50 bg-accent shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center">
        <span className="text-xs text-center">
          {props.value == undefined ? (
            ""
          ) : (
            <NumberFlow spinTiming={{ duration: 250 }} isolate plugins={[continuous]} value={props.value[0]} />
          )}
        </span>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

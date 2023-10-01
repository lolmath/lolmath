import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";

export interface CardProps extends ComponentProps<"div"> {
  borderProps?: ComponentProps<"div">;
}

export function Card({ children, className, style, borderProps }: CardProps) {
  const r = `1rem`;

  return (
    <div
      {...(borderProps ?? {})}
      className={twMerge("p-[3px]", borderGradient, borderProps?.className)}
      style={{
        WebkitMask: borderInverted(r),
        mask: borderInverted(r),
        ...(borderProps?.style ?? {}),
      }}
    >
      <div
        className={twMerge("bg-black w-full", className)}
        style={{
          WebkitMask: borderInverted(r),
          mask: borderInverted(r),
          ...(style ?? {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function borderInverted(r: string) {
  return `radial-gradient(${r} at ${r} ${r},#0000 98%,#000) -${r} -${r}`;
}

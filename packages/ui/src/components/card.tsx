import { ComponentProps } from "react";
import { borderGradient } from "../utilities/border";
import { tv } from "../utilities/tv";

export interface CardProps extends ComponentProps<"div"> {
  borderProps?: ComponentProps<"div">;
}

const cardBorder = tv({
  base: ["bg-gradient-to-t p-[2px]", borderGradient],
  variants: {},
});

const inner = tv({
  base: "bg-lol-grey-hextech-black w-full",
  variants: {},
});

export function Card({ children, className, style, borderProps }: CardProps) {
  const r = `1rem`;

  return (
    <div
      {...(borderProps ?? {})}
      className={cardBorder({
        className: borderProps?.className,
      })}
      style={{
        WebkitMask: borderInverted(r),
        mask: borderInverted(r),
        ...(borderProps?.style ?? {}),
      }}
    >
      <div
        className={inner({
          className,
        })}
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

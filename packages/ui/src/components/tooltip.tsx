import type { TooltipProps } from "react-aria-components";
import { Tooltip as AriaTooltip, OverlayArrow } from "react-aria-components";
import { goldGradient } from "../utilities/gradient";
import { resolveClassName } from "../utilities/resolve-class-name";
import { tv } from "../utilities/tv";

const tooltipBorder = tv({
  base: ["w-[280px] bg-gradient-to-t p-0.5 drop-shadow-lg", goldGradient],
  variants: {
    isEntering: {
      true: "animate-in fade-in data-[placement=bottom]:slide-in-from-top-1 data-[placement=top]:slide-in-from-bottom-1 fill-mode-forwards duration-200 ease-out",
    },
    isExiting: {
      true: "animate-out fade-out data-[placement=bottom]:slide-out-to-top-1 data-[placement=top]:slide-out-to-bottom-1 fill-mode-forwards duration-150 ease-in",
    },
    placement: {
      bottom: "mt-2",
      top: "mb-2",
      center: "",
      left: "",
      right: "",
    },
  },
});

const tooltipArrowBorder = tv({
  base: "fill-lol-gold-500 absolute block h-5 w-5",
  variants: {
    placement: {
      top: "-left-0.5 -translate-y-[1px]",
      bottom: "fill-lol-gold-200 -left-0.5 -translate-y-[3px] rotate-180",
      left: "fill-lol-gold-400 -top-0.5 -translate-x-px -rotate-90",
      right: "fill-lol-gold-400 -top-0.5 -translate-x-[3px] rotate-90",
      center: "",
    },
  },
});

const tooltipArrow = tv({
  base: "fill-lol-grey-300 block h-4 w-4",
  variants: {
    placement: {
      top: "-translate-y-0.5",
      bottom: "translate-y-0.5 rotate-180",
      left: "-translate-x-0.5 -rotate-90",
      right: "translate-x-0.5 rotate-90",
      center: "",
    },
  },
});

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip
      {...props}
      className={(values) =>
        tooltipBorder({
          ...values,
          className: resolveClassName(props?.className, values),
        })
      }
    >
      {(values) => (
        <>
          <OverlayArrow className="translate-y-1 transform">
            {(values) => (
              <>
                <svg viewBox="0 0 12 12" className={tooltipArrowBorder(values)}>
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
                <svg viewBox="0 0 12 12" className={tooltipArrow(values)}>
                  <path d="M0 0,L6 6,L12 0" />
                </svg>
              </>
            )}
          </OverlayArrow>
          <div className="bg-lol-grey-300">
            {typeof children === "function" ? children(values) : children}
          </div>
        </>
      )}
    </AriaTooltip>
  );
}

export { TooltipTrigger } from "react-aria-components";

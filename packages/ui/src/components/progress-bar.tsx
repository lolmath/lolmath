"use client";

import {
  ProgressBar as AriaProgressBar,
  Label,
  ProgressBarProps as AriaProgressBarProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { borderGradient } from "../utilities/border";

interface ProgressBarProps extends Omit<AriaProgressBarProps, "children"> {
  label?: string;
}

export function ProgressBar({
  className,
  label,
  ...props
}: ProgressBarProps): JSX.Element {
  return (
    <AriaProgressBar className={"flex w-56 flex-col gap-1 text-sm"} {...props}>
      {({ percentage, valueText }) => (
        <>
          <div className="font-beaufort text-lol-gold-100 flex font-bold uppercase">
            <Label className="flex-1 ">{label ?? "Loading"}</Label>
            <span>{valueText}</span>
          </div>
          <div
            className={twMerge(
              borderGradient,
              "-ml-0.5 -mr-1 h-3 rounded-full p-px",
            )}
          >
            <div
              className={twMerge("bg-lol-grey-950 h-full w-full rounded-full")}
            >
              <div
                className={twMerge(
                  "h-full rounded-full bg-gradient-to-r from-[#005A82] via-[#067F9B] to-[#73CCD5]",
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}

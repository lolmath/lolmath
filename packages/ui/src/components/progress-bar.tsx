import {
  ProgressBar as AriaProgressBar,
  Label,
  ProgressBarProps as AriaProgressBarProps,
} from "react-aria-components";
import { goldGradient } from "../utilities/gradient.js";
import { tv } from "../utilities/tv.js";

const progressBarBorder = tv({
  base: ["-ml-0.5 -mr-1 h-3 rounded-full bg-gradient-to-t p-px", goldGradient],
});

const progressBarBackground = tv({
  base: ["bg-lol-grey-300 h-full w-full rounded-full"],
});

const progressBarFill = tv({
  base: "from-lol-blue-400 to-lol-blue-200 h-full rounded-full bg-gradient-to-r",
});

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
            <Label className="flex-1">{label ?? "Loading"}</Label>
            <span>{valueText}</span>
          </div>
          <div className={progressBarBorder()}>
            <div className={progressBarBackground()}>
              <div
                className={progressBarFill()}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </>
      )}
    </AriaProgressBar>
  );
}

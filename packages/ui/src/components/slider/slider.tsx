import {
  SliderProps as AriaSliderProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderTrackRenderProps,
} from "react-aria-components";
import {
  Slider as AriaSlider,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  SliderOutput as AriaSliderOutput,
  Label,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  sliderActive,
  sliderDisabled,
  sliderHover,
  sliderNormal,
} from "./images";
import { resolveClassname } from "../../utilities/resolve-classname";

export function Slider<T extends number | number[]>({
  children,
  sliderThumbProps = {},
  sliderTrackProps = {},
  sliderTrackBackgroundClassName,
  sliderTrackForegroundClassName,
  ...props
}: AriaSliderProps<T> & {
  sliderTrackProps?: SliderTrackProps;
  sliderThumbProps?: SliderThumbProps;
  sliderTrackBackgroundClassName?:
    | string
    | ((values: SliderTrackRenderProps) => string);
  sliderTrackForegroundClassName?:
    | string
    | ((values: SliderTrackRenderProps) => string);
}) {
  return (
    <AriaSlider<T>
      {...props}
      className={(values) => {
        const resolvedClassName = resolveClassname(props.className, values);
        return twMerge("", resolvedClassName);
      }}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <AriaSliderTrack
            {...sliderTrackProps}
            className={(sliderTrackRenderProps) => {
              const resolvedClassName = resolveClassname(
                sliderTrackProps.className,
                sliderTrackRenderProps,
              );
              return twMerge("relative w-full h-7 group", resolvedClassName);
            }}
          >
            {(values) => {
              const left =
                values.state.values.length === 1
                  ? 0
                  : values.state.getThumbPercent(0) * 100;

              const width =
                values.state.values.length === 1
                  ? values.state.getThumbPercent(0) * 100
                  : (values.state.getThumbPercent(1) -
                      values.state.getThumbPercent(0)) *
                    100;

              return (
                <>
                  <div
                    className={twMerge(
                      "absolute h-0.5 top-[50%] transform translate-y-[-50%] w-full rounded-full bg-lol-gray-950",
                      resolveClassname(sliderTrackBackgroundClassName, values),
                    )}
                  />
                  <div
                    className={twMerge(
                      "absolute h-0.5 top-[50%] transform translate-y-[-50%] from-[#463714] to-[#695625] bg-gradient-to-r",
                      values.state.isDisabled
                        ? "from-transparent via-transparent to-transparent bg-[#5C5B57]"
                        : [
                            "group-hover:from-[#785a28] group-hover:via-[#c89b3c] group-hover:to-[#c8aa6e]",
                            "group-active:from-[#695625] group-active:via-[#463714] group-active:to-[#463714]",
                          ],
                      resolveClassname(sliderTrackForegroundClassName, values),
                    )}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                  {values.state.values.map((_, i) => {
                    let zIndex =
                      values.state.getThumbPercent(i === 1 ? 0 : 1) ===
                      (i === 1 ? 0 : 1)
                        ? 2
                        : undefined;

                    return (
                      <>
                        <AriaSliderThumb
                          key={i}
                          index={i}
                          {...sliderThumbProps}
                          className={(sliderThumbRenderProps) => {
                            const resolvedClassName = resolveClassname(
                              sliderThumbProps.className,
                              sliderThumbRenderProps,
                            );
                            return twMerge(
                              "bg-contain h-7 w-7 top-[50%] outline-none",
                              "[background-image:var(--normal)]",
                              sliderThumbRenderProps.isDisabled
                                ? "[background-image:var(--disabled)]"
                                : [
                                    sliderThumbRenderProps.state.isThumbDragging(
                                      i,
                                    ) && "[background-image:var(--active)]",
                                    !sliderThumbRenderProps.state.isThumbDragging(
                                      0,
                                    ) &&
                                      !sliderThumbRenderProps.state.isThumbDragging(
                                        1,
                                      ) &&
                                      "group-hover:[background-image:var(--hover)]",
                                  ],
                              resolvedClassName,
                            );
                          }}
                          style={
                            {
                              "--normal": sliderNormal,
                              "--hover": sliderHover,
                              "--active": sliderActive,
                              "--disabled": sliderDisabled,
                              zIndex,
                            } as any
                          }
                        />
                      </>
                    );
                  })}
                </>
              );
            }}
          </AriaSliderTrack>
        </>
      )}
    </AriaSlider>
  );
}

interface SliderLabelProps {
  children?: React.ReactNode;
}
export function SliderLabel({ children }: SliderLabelProps) {
  return (
    <div className="flex items-center justify-between font-spiegel text-xs text-lol-gray-300 font-normal tracking-wide">
      <Label className="">{children}</Label>
      <AriaSliderOutput className="">
        {(sliderRenderProps) =>
          sliderRenderProps.state.values
            .map((_, i) => sliderRenderProps.state.getThumbValueLabel(i))
            .join(" – ")
        }
      </AriaSliderOutput>
    </div>
  );
}

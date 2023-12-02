import {
  SliderProps as AriaSliderProps,
  SliderOutputProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderTrackRenderProps,
} from "react-aria-components";
import {
  Slider as AriaSlider,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
  SliderOutput as AriaSliderOutput,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import {
  sliderActive,
  sliderDisabled,
  sliderHover,
  sliderNormal,
} from "./images";
import { resolveClassName } from "../../utilities/resolve-class-name";

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
        const resolvedClassName = resolveClassName(props.className, values);
        return twMerge("", resolvedClassName);
      }}
    >
      {(values) => (
        <>
          {typeof children === "function" ? children(values) : children}
          <AriaSliderTrack
            {...sliderTrackProps}
            className={(sliderTrackRenderProps) => {
              const resolvedClassName = resolveClassName(
                sliderTrackProps.className,
                sliderTrackRenderProps,
              );
              return twMerge("group relative h-7 w-full", resolvedClassName);
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
                      "bg-lol-grey-950 absolute top-[50%] h-0.5 w-full translate-y-[-50%] transform rounded-full",
                      resolveClassName(sliderTrackBackgroundClassName, values),
                    )}
                  />
                  <div
                    className={twMerge(
                      "absolute top-[50%] h-0.5 translate-y-[-50%] transform bg-gradient-to-r from-[#463714] to-[#695625]",
                      values.state.isDisabled
                        ? "bg-[#5C5B57] from-transparent via-transparent to-transparent"
                        : [
                            "group-hover:from-[#785a28] group-hover:via-[#c89b3c] group-hover:to-[#c8aa6e]",
                            "group-active:from-[#695625] group-active:via-[#463714] group-active:to-[#463714]",
                          ],
                      resolveClassName(sliderTrackForegroundClassName, values),
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
                            const resolvedClassName = resolveClassName(
                              sliderThumbProps.className,
                              sliderThumbRenderProps,
                            );
                            return twMerge(
                              "top-[50%] h-7 w-7 bg-contain outline-none",
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

export function SliderOutput(props: SliderOutputProps) {
  return (
    <AriaSliderOutput
      className={(values) =>
        twMerge(
          "font-spiegel text-lol-grey-300 text-xs font-normal tracking-wide",
          resolveClassName(props.className, values),
        )
      }
      children={(sliderRenderProps) =>
        sliderRenderProps.state.values
          .map((_, i) => sliderRenderProps.state.getThumbValueLabel(i))
          .join(" – ")
      }
      {...props}
    />
  );
}

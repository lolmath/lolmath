import {
  SliderProps as AriaSliderProps,
  SliderThumbProps,
  SliderTrackProps,
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
} from "../utilities/constants";
import { resolveClassname } from "../utilities/resolve-classname";

export function Slider({
  children,
  sliderThumbProps = {},
  sliderTrackProps = {},
  ...props
}: AriaSliderProps & {
  sliderTrackProps?: SliderTrackProps;
  sliderThumbProps?: SliderThumbProps;
}) {
  return (
    <AriaSlider
      {...props}
      className={(values) => {
        const resolvedClassName = resolveClassname(props, values);
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
                sliderTrackProps,
                sliderTrackRenderProps,
              );
              return twMerge("relative w-full h-7 group", resolvedClassName);
            }}
          >
            {({ state }) => {
              const left =
                state.values.length === 1 ? 0 : state.getThumbPercent(0) * 100;

              const width =
                state.values.length === 1
                  ? state.getThumbPercent(0) * 100
                  : (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100;

              return (
                <>
                  <div className="absolute h-0.5 top-[50%] transform translate-y-[-50%] w-full rounded-full bg-lol-gray-950" />
                  <div
                    className={twMerge(
                      "absolute h-0.5 top-[50%] transform translate-y-[-50%] from-[#463714] to-[#695625] bg-gradient-to-r",
                      state.isDisabled
                        ? "from-transparent via-transparent to-transparent bg-[#5C5B57]"
                        : [
                            "group-hover:from-[#785a28] group-hover:via-[#c89b3c] group-hover:to-[#c8aa6e]",
                            "group-active:from-[#695625] group-active:via-[#463714] group-active:to-[#463714]",
                          ],
                    )}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                  {state.values.map((_, i) => {
                    let zIndex =
                      state.getThumbPercent(i === 1 ? 0 : 1) ===
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
                              sliderThumbProps,
                              sliderThumbRenderProps,
                            );
                            return twMerge(
                              "bg-contain h-7 w-7 top-[50%] outline-none",
                              "[background-image:var(--normal)]",
                              state.isDisabled
                                ? "[background-image:var(--disabled)]"
                                : [
                                    state.isThumbDragging(i) &&
                                      "[background-image:var(--active)]",
                                    !state.isThumbDragging(0) &&
                                      !state.isThumbDragging(1) &&
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

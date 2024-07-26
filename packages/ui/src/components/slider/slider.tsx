import type {
	SliderProps as AriaSliderProps,
	SliderOutputProps,
	SliderThumbProps,
	SliderTrackProps,
	SliderTrackRenderProps,
} from "react-aria-components";
import {
	Slider as AriaSlider,
	SliderOutput as AriaSliderOutput,
	SliderThumb as AriaSliderThumb,
	SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import { resolveClassName } from "../../utilities/resolve-class-name.js";
import { tv } from "../../utilities/tv.js";
import {
	sliderActive,
	sliderDisabled,
	sliderHover,
	sliderNormal,
} from "./images.js";

const sliderTrack = tv({
	base: "group relative h-7 w-full",
});

const sliderTrackBackground = tv({
	base: "bg-lol-grey-300 absolute top-[50%] h-0.5 w-full translate-y-[-50%] transform rounded-full",
});

const sliderTrackForeground = tv({
	base: "from-lol-gold-600 to-lol-gold-500 absolute top-[50%] h-0.5 translate-y-[-50%] transform bg-gradient-to-r",
	variants: {
		isDisabled: {
			true: "bg-[#5C5B57] from-transparent via-transparent to-transparent",
			false: [
				"group-hover:from-lol-gold-500 group-hover:via-lol-gold-400 group-hover:to-lol-gold-200",
				"group-active:from-lol-gold-500 group-active:via-lol-gold-600 group-active:to-lol-gold-600",
			],
		},
	},
});

const sliderThumb = tv({
	base: "top-[50%] h-7 w-7 bg-contain outline-none [background-image:var(--normal)]",
	variants: {
		isDisabled: {
			true: "[background-image:var(--disabled)]",
		},
		isThumbDragging: {
			true: "[background-image:var(--active)]",
		},
		isOtherThumbDragging: {
			true: "",
		},
	},
	compoundVariants: [
		{
			isThumbDragging: false,
			isOtherThumbDragging: false,
			className: "group-hover:[background-image:var(--hover)]",
		},
	],
});

export function Slider<T extends number | number[]>({
	children,
	className,
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
			className={(values) => resolveClassName(className, values)}
		>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<AriaSliderTrack
						{...sliderTrackProps}
						className={(sliderTrackRenderProps) =>
							sliderTrack({
								...sliderTrackRenderProps,
								className: resolveClassName(
									sliderTrackProps.className,
									sliderTrackRenderProps,
								),
							})
						}
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
										className={sliderTrackBackground({
											className: resolveClassName(
												sliderTrackBackgroundClassName,
												values,
											),
										})}
									/>
									<div
										className={sliderTrackForeground({
											...values.state,
											className: resolveClassName(
												sliderTrackForegroundClassName,
												values,
											),
										})}
										style={{ left: `${left}%`, width: `${width}%` }}
									/>
									{values.state.values.map((_, i) => {
										const zIndex =
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
														return sliderThumb({
															isDisabled: sliderThumbRenderProps.isDisabled,
															isThumbDragging:
																sliderThumbRenderProps.state.isThumbDragging(i),
															isOtherThumbDragging:
																sliderThumbRenderProps.state.isThumbDragging(
																	i === 1 ? 0 : 1,
																),
															className: resolveClassName(
																sliderThumbProps.className,
																sliderThumbRenderProps,
															),
														});
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

const sliderOutput = tv({
	base: "font-spiegel text-lol-grey-100 text-lol-sm",
});
export function SliderOutput(props: SliderOutputProps) {
	return (
		<AriaSliderOutput
			className={(values) =>
				sliderOutput({
					className: resolveClassName(props.className, values),
				})
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

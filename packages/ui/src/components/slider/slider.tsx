import { cva, cx } from "cva";
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
import { resolveClassName } from "../../utilities/resolve-class-name";
import textClasses from "../typography/text.module.css";
import classes from "./slider.module.css";

const sliderTrackForeground = cva({
	base: classes.foreground,
	variants: {
		isDisabled: {
			true: classes.disabled,
		},
	},
});

const sliderThumb = cva({
	base: classes.thumb,
	variants: {
		isThumbDragging: {
			true: classes.thumbDragging,
		},
		isOtherThumbDragging: {
			true: classes.otherThumbDragging,
		},
		isDisabled: {
			true: classes.disabled,
		},
		isHovered: {
			true: classes.hovered,
		},
	},
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
							cx(
								classes.track,
								resolveClassName(
									sliderTrackProps.className,
									sliderTrackRenderProps,
								),
							)
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
										className={cx(
											classes.background,
											resolveClassName(sliderTrackBackgroundClassName, values),
										)}
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
														sliderThumbRenderProps.isDragging;
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
													style={{
														zIndex,
													}}
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
				cx(
					textClasses.text,
					textClasses.sm,
					textClasses.grey100,
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

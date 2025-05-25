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
	composeRenderProps,
} from "react-aria-components";
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
		<AriaSlider<T> {...props} className={className}>
			{(values) => (
				<>
					{typeof children === "function" ? children(values) : children}
					<AriaSliderTrack
						{...sliderTrackProps}
						className={composeRenderProps(className, (className) =>
							cx(classes.track, className),
						)}
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
										className={composeRenderProps(
											sliderTrackBackgroundClassName,
											(className) => cx(className, classes.background),
										)(values)}
									/>
									<div
										className={composeRenderProps(
											sliderTrackForegroundClassName,
											(className) =>
												sliderTrackForeground({
													...values.state,
													className,
												}),
										)(values)}
										style={{ left: `${left}%`, width: `${width}%` }}
									/>
									{values.state.values.map((_, i) => {
										const zIndex =
											values.state.getThumbPercent(i === 1 ? 0 : 1) ===
											(i === 1 ? 0 : 1)
												? 2
												: undefined;

										return (
											<AriaSliderThumb
												key={i}
												index={i}
												style={{
													zIndex,
												}}
												{...sliderThumbProps}
												className={composeRenderProps(
													sliderThumbProps.className,
													(className, sliderThumbRenderProps) =>
														sliderThumb({
															isDisabled: sliderThumbRenderProps.isDisabled,
															isThumbDragging:
																sliderThumbRenderProps.state.isThumbDragging(i),
															isOtherThumbDragging:
																sliderThumbRenderProps.state.isThumbDragging(
																	i === 1 ? 0 : 1,
																),
															className,
														}),
												)}
											/>
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

export function SliderOutput({
	children,
	className,
	...props
}: SliderOutputProps) {
	return (
		<AriaSliderOutput
			className={composeRenderProps(className, (className) =>
				cx(textClasses.text, textClasses.sm, textClasses.grey100, className),
			)}
			{...props}
		>
			{(sliderRenderProps) =>
				sliderRenderProps.state.values
					.map((_, i) => sliderRenderProps.state.getThumbValueLabel(i))
					.join(" – ")
			}
		</AriaSliderOutput>
	);
}

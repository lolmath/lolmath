import type { ComponentProps } from "react";
import {
	ToggleButton as AriaToggleButton,
	type ToggleButtonProps as AriaToggleButtonProps,
} from "react-aria-components";
import {
	dimmedGradient,
	disabledGradient,
	goldGradient,
	goldGradientHover,
	goldGradientPressed,
	hextechGradient,
	hextechGradientHover,
	hextechGradientPressed,
} from "../utilities/gradient.js";
import { resolveClassName } from "../utilities/resolve-class-name.js";
import { tv } from "../utilities/tv.js";

export type ToggleButtonShape = "round" | "square" | "normal";
export type ToggleButtonPreset = "gold" | "hextech" | "dimmed";

const toggleButtonBorder = tv({
	base: "bg-gradient-to-t p-0.5 outline-none transition-colors duration-200",
	variants: {
		preset: {
			gold: "",
			hextech: "",
			dimmed: dimmedGradient,
		},
		shape: {
			round: "aspect-square rounded-full",
			square: "aspect-square",
			normal: "",
		},
		isHovered: {
			true: "",
		},
		isPressed: {
			true: "",
		},
		isDisabled: {
			true: "",
		},
		isFocused: {
			true: "",
		},
		isFocusVisible: {
			true: "",
		},
		isSelected: {
			true: "",
		},
		thin: {
			true: "p-px",
		},
	},
	compoundVariants: [
		{
			preset: ["dimmed"],
			isSelected: true,
			class: [goldGradient],
		},
		{
			preset: ["gold"],
			class: goldGradient,
		},
		{
			preset: ["gold", "dimmed"],
			isHovered: true,
			class: goldGradientHover,
		},
		{
			preset: ["gold", "dimmed"],
			isPressed: true,
			class: goldGradientPressed,
		},
		{
			preset: ["gold", "dimmed"],
			isDisabled: true,
			class: disabledGradient,
		},
		{
			preset: ["gold"],
			isFocusVisible: true,
			class: "outline outline-offset-2 outline-yellow-50",
		},
		{
			preset: ["hextech"],
			class: hextechGradient,
		},
		{
			preset: ["hextech"],
			isHovered: true,
			class: hextechGradientHover,
		},
		{
			preset: ["hextech"],
			isPressed: true,
			class: hextechGradientPressed,
		},
		{
			preset: ["hextech"],
			isDisabled: true,
			class: disabledGradient,
		},
	],
});
const toggleButton = tv({
	base: "text-lol-gold-300 font-beaufort block font-bold uppercase tracking-wide transition-colors duration-200",
	variants: {
		preset: {
			gold: "bg-lol-grey-300",
			hextech: "text-lol-blue-100 bg-lol-grey-300",
			dimmed: "bg-lol-grey-hextech-black",
		},
		isHovered: {
			true: "text-lol-gold-100",
		},
		isPressed: {
			true: "text-lol-grey-150",
		},
		isDisabled: {
			true: "text-lol-grey-150",
		},
		isFocused: {
			true: "",
		},
		isSelected: {
			true: [
				hextechGradient,
				"text-lol-blue-100 shadow-lol-grey-300 bg-gradient-to-t shadow shadow-inner",
			],
		},
		isFocusVisible: {
			true: "",
		},
		shape: {
			round: "rounded-full",
			square: "",
			normal: "",
		},
	},
	compoundVariants: [
		{
			preset: ["gold", "hextech", "dimmed"],
			class: "px-4 py-2",
		},
		{
			preset: ["hextech"],
			isHovered: true,
			class: "text-lol-blue-100",
		},
		{
			preset: ["hextech"],
			isPressed: true,
			class: "text-lol-blue-400",
		},
		{
			preset: ["hextech"],
			isSelected: true,
			class: "",
		},

		{
			shape: ["round", "square"],
			class:
				"flex aspect-square h-7 items-center justify-center p-0 font-black leading-none",
		},
	],
});

interface ToggleButtonProps extends AriaToggleButtonProps {
	innerProps?: ComponentProps<"span">;
	preset?: ToggleButtonPreset;
	thin?: boolean;
	shape?: ToggleButtonShape;
}

export function ToggleButton({
	children,
	className,
	innerProps = {},
	preset = "gold",
	shape = "normal",
	thin = preset === "dimmed",
	...props
}: ToggleButtonProps) {
	return (
		<AriaToggleButton
			{...props}
			className={(values) =>
				toggleButtonBorder({
					...values,
					preset,
					shape,
					thin,
					className: resolveClassName(className, values),
				})
			}
		>
			{(values) => (
				<span
					{...innerProps}
					className={toggleButton({
						...values,
						preset,
						shape,
						className: resolveClassName(innerProps.className, values),
					})}
					style={
						{
							// backgroundImage: hextechMagic,
							// backgroundPosition: "center",
						}
					}
				>
					{typeof children === "function" ? children(values) : children}
				</span>
			)}
		</AriaToggleButton>
	);
}

import { type Ref, forwardRef } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	type ButtonRenderProps,
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

export type ButtonShape = "round" | "square" | "normal";
export type ButtonPreset =
	| "primary"
	| "secondary"
	| "text"
	| "hextech"
	| "dimmed";

interface ButtonProps extends AriaButtonProps {
	innerClassName?: string | ((values: ButtonRenderProps) => string);
	preset?: ButtonPreset;
	thin?: boolean;
	shape?: ButtonShape;
}

const buttonBorder = tv({
	base: "bg-gradient-to-t p-0.5 outline-none transition-colors duration-200",
	variants: {
		preset: {
			primary: "",
			secondary: "",
			text: "",
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
		thin: {
			true: "p-px",
		},
	},
	compoundVariants: [
		{
			preset: ["primary", "secondary"],
			class: goldGradient,
		},
		{
			preset: ["primary", "secondary", "dimmed"],
			isHovered: true,
			class: goldGradientHover,
		},
		{
			preset: ["primary", "secondary", "dimmed"],
			isPressed: true,
			class: goldGradientPressed,
		},
		{
			preset: ["primary", "secondary", "dimmed"],
			isDisabled: true,
			class: disabledGradient,
		},
		{
			preset: ["primary", "secondary"],
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

const button = tv({
	base: "text-lol-gold-300 font-beaufort block h-full w-full font-bold uppercase tracking-wide transition-colors duration-200",
	variants: {
		preset: {
			primary:
				"from-lol-gold-600 via-lol-gold-600 to-lol-gold-700 bg-gradient-to-b",
			secondary: "",
			text: "",
			hextech: "text-lol-blue-100",
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
			preset: ["primary", "secondary", "hextech", "dimmed"],
			class: "px-4 py-2",
		},
		{
			preset: ["primary", "secondary", "hextech"],
			class: "bg-lol-grey-300",
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
			preset: ["text"],
			shape: ["normal", "square"],
			class:
				"relative after:absolute after:-bottom-2 after:-left-2 after:-right-2 after:-top-2",
		},
		{
			isHovered: true,
			preset: "primary",
			class: "from-lol-gold-600 via-lol-gold-600 to-lol-gold-500",
		},
		{
			isPressed: true,
			preset: "primary",
			class:
				"from-lol-gold-600 via-lol-gold-700 to-lol-gold-700 text-lol-gold-500",
		},
		{
			shape: ["round", "square"],
			class:
				"flex aspect-square h-7 items-center justify-center p-0 font-black leading-none",
		},
		{
			isHovered: true,
			preset: "text",
			shape: ["round", "square"],
			class: "bg-lol-grey-300",
		},
	],
});

function _Button(
	{
		children,
		className,
		preset = "secondary",
		shape = "normal",
		innerClassName,
		thin = preset === "dimmed" ? true : false,
		...props
	}: ButtonProps,
	ref: Ref<HTMLButtonElement>,
) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={(values) => {
				return buttonBorder({
					className: resolveClassName(className, values),
					preset,
					shape,
					thin,
					...values,
				});
			}}
		>
			{(values) => {
				return (
					<span
						className={button({
							className: resolveClassName(innerClassName, values),
							preset,
							shape,
							...values,
						})}
					>
						{typeof children === "function" ? children(values) : children}
					</span>
				);
			}}
		</AriaButton>
	);
}

export const Button = forwardRef(_Button);

import { cva } from "cva";
import type { Ref } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./preview-trigger.module.css";

// The closest thing this library has to a tooltip, and the reason there still
// is no tooltip component (see the note in popover.tsx): a preview opens on
// hover and focus like a tooltip does, but also on long press, so a touch user
// can reach it at all. Its content may be interactive — a link, a button —
// because the popover stays open while the pointer travels towards it and can
// be tabbed into.
//
// The trigger is the first child and the `Popover` the second. Any component
// that forwards its ref and props to a focusable DOM element works as the
// trigger (`PreviewButton`, `Button`, `ButtonLink`, a `Link`); wrap anything
// else in `Focusable` and give it a role, since a preview only a mouse can
// reach is not an accessible one.
//
//   <PreviewTrigger>
//     <ButtonLink href="/champions/ahri">Ahri</ButtonLink>
//     <Popover>
//       <PopoverBody>…</PopoverBody>
//     </Popover>
//   </PreviewTrigger>

export type { PreviewTriggerProps } from "react-aria-components";
export { PreviewTrigger } from "react-aria-components";

export const previewButton = cva({
	base: classes.previewButton,
});

export type PreviewButtonProps = AriaButtonProps & {
	ref?: Ref<HTMLButtonElement>;
};

/**
 * A term inside running text that reveals a preview: it inherits the size,
 * weight and leading of the sentence it sits in and marks itself with a dashed
 * gold underline, which goes solid while the preview is open.
 *
 * Use it as the trigger of a `PreviewTrigger` for a term the reader may not
 * know — an item, a rune, a stat — where a `Button` would interrupt the
 * sentence and a plain `<span>` would give a keyboard or screen reader user
 * nothing to act on. It is a real button, so it also works as the trigger of a
 * `DialogTrigger` (a toggle tip). When the term should also navigate
 * somewhere, use a `ButtonLink` or apply the exported `previewButton` styles
 * to a `Link` instead — a preview is never the only way to reach content.
 *
 *   <PreviewTrigger>
 *     <PreviewButton>Doran's Blade</PreviewButton>
 *     <Popover>
 *       <PopoverBody>…</PopoverBody>
 *     </Popover>
 *   </PreviewTrigger>
 */
export function PreviewButton({
	children,
	className,
	ref,
	...props
}: PreviewButtonProps) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={composeRenderProps(className, (className) =>
				previewButton({ className }),
			)}
		>
			{children}
		</AriaButton>
	);
}

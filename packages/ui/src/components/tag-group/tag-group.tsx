"use client";

import { cva, cx } from "cva";
import {
	Button as AriaButton,
	Tag as AriaTag,
	TagGroup as AriaTagGroup,
	type TagGroupProps as AriaTagGroupProps,
	TagList as AriaTagList,
	type TagListProps as AriaTagListProps,
	type TagProps as AriaTagProps,
	composeRenderProps,
} from "react-aria-components";
import classes from "./tag-group.module.css";

export interface TagProps extends AriaTagProps {
	variant?: "gold" | "hextech" | "grey";
}

const tag = cva({
	base: classes.tag,
	variants: {
		variant: {
			gold: classes.gold,
			hextech: classes.hextech,
			grey: classes.grey,
		},
	},
	defaultVariants: { variant: "gold" },
});

export function Tag({
	children,
	className,
	variant = "gold",
	...props
}: TagProps) {
	return (
		<AriaTag
			{...props}
			className={composeRenderProps(className, (className, values) =>
				cx(tag({ variant, className, ...values })),
			)}
		>
			{composeRenderProps(children, (children) => (
				<>
					<span className={classes.text}>{children}</span>
					<AriaButton slot="remove" className={classes.remove} />
				</>
			))}
		</AriaTag>
	);
}

export const tagGroup = cva({
	base: classes.tagGroup,
});

export interface TagGroupProps extends AriaTagGroupProps {}

export function TagGroup({ children, className, ...props }: TagGroupProps) {
	return (
		<AriaTagGroup {...props} className={tagGroup({ className })}>
			{children}
		</AriaTagGroup>
	);
}

export const tagList = cva({
	base: classes.tagList,
});

export interface TagListProps<T extends object = {}>
	extends AriaTagListProps<T> {
	children?: React.ReactNode;
	className?: string;
	selectLabel: (item: T) => string;
	variant?: TagProps["variant"];
}

export function TagList<T extends object>({
	children,
	className,
	selectLabel,
	variant = "hextech",
	...props
}: TagListProps<T> & {
	selectLabel: (item: T) => string;
	variant?: TagProps["variant"];
}) {
	return (
		<AriaTagList {...props} className={tagList({ className })}>
			{(item) => <Tag variant={variant}>{selectLabel(item)}</Tag>}
		</AriaTagList>
	);
}

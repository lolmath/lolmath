import { cva, cx } from "cva";
import {
	Breadcrumb as AriaBreadcrumb,
	Breadcrumbs as AriaBreadcrumbs,
	type BreadcrumbProps,
	type BreadcrumbsProps,
	Link,
	composeRenderProps,
} from "react-aria-components";
import classes from "../breadcrumbs/breadcrumbs.module.css";
import divider from "./divider.png";

export function Breadcrumbs<T extends object>({
	className,
	...props
}: BreadcrumbsProps<T>) {
	return (
		<AriaBreadcrumbs
			{...props}
			className={cx(classes.breadcrumbs, className)}
		/>
	);
}

const breadcrumbLink = cva({
	base: classes.link,
	variants: {
		isHovered: { true: classes.hover },
	},
});

export function Breadcrumb({
	className,
	...props
}: BreadcrumbProps & {
	href?: string;
}) {
	return (
		<AriaBreadcrumb
			{...props}
			className={composeRenderProps(className, (className) =>
				cx(classes.item, className),
			)}
		>
			<Link
				className={(values) =>
					breadcrumbLink({
						isHovered: values.isHovered,
					})
				}
				{...props}
			/>
			{props.href && <img src={divider} alt="" className={classes.divider} />}
		</AriaBreadcrumb>
	);
}

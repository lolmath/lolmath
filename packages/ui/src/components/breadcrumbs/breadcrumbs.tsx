import { cx } from "cva";
import {
	Breadcrumb as AriaBreadcrumb,
	Breadcrumbs as AriaBreadcrumbs,
	type BreadcrumbProps,
	type BreadcrumbsProps,
	composeRenderProps,
	Link,
} from "react-aria-components";
import classes from "../breadcrumbs/breadcrumbs.module.css";
import divider from "./breadcrumbs-divider.png";

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

export function Breadcrumb({
	className,
	children,
	href,
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
			<Link className={classes.link} href={href}>
				{children}
			</Link>
			{href && <img src={divider} alt="" className={classes.divider} />}
		</AriaBreadcrumb>
	);
}

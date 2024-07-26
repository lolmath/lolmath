import {
	Breadcrumb as AriaBreadcrumb,
	Breadcrumbs as AriaBreadcrumbs,
	type BreadcrumbProps,
	type BreadcrumbsProps,
	Link,
	type LinkProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { resolveClassName } from "../utilities/resolve-class-name.js";

const breadCrumbIconSrc =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAALCAYAAACtWacbAAAA+0lEQVQYV12QsUoDURBF74xbxHLB9NqHbWwSwUJIutSbQCqb5BPMJ8RPcBttlMR8ggYLkRVxm8XGyk9IFQgx+668zb7N4sDAvJnDu3NHUIk0nrWDVu+52rO1uEb6Ph0KcSNE1Djrj6pgDjnADQRy3Wj1xuX7+/PhaPOrdQBvAHwAS4p2QPpOWkhK+jE/NiajR1lQNVRjhhTYHAXNflTu9PNyWzu5uFx/xbMJwSsnRSIsIbcboInQPBXSCbdZJ4fsL6vDWpeUuXVnVCOhmXCbhcH5YLlzF08HAtwB8HZ3+ecuh17vffEOrMSpcxc0w2R/kqIqwEeKjquAHf8Bd1xn7M0vJ+QAAAAASUVORK5CYII=";

const breadCrumbs = tv({
	base: "flex gap-1",
});

export function Breadcrumbs<T extends object>(props: BreadcrumbsProps<T>) {
	return (
		<AriaBreadcrumbs
			{...props}
			className={breadCrumbs({ className: props.className })}
		/>
	);
}

const breadCrumb = tv({
	base: "flex items-center",
});

const breadCrumbLink = tv({
	base: "font-beaufort text-lol-gold-300 relative text-sm font-medium uppercase tracking-widest px-4",
	variants: {
		isHovered: { true: "text-lol-gold-100" },
	},
});

export function Breadcrumb(props: BreadcrumbProps & LinkProps) {
	return (
		<AriaBreadcrumb
			{...props}
			className={(values) =>
				breadCrumb({
					className: resolveClassName(props.className, values),
				})
			}
		>
			<Link
				className={(values) =>
					breadCrumbLink({
						isHovered: values.isHovered,
					})
				}
				{...props}
			/>
			{props.href && (
				<img src={breadCrumbIconSrc} alt="" className="h-[11px]" />
			)}
		</AriaBreadcrumb>
	);
}

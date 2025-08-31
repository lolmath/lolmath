import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/[...slug]">) {
	const b = baseOptions();

	return (
		<DocsLayout tree={source.pageTree} {...b} nav={{ ...b.nav, enabled: true }}>
			{children}
		</DocsLayout>
	);
}

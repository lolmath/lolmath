import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

export default function Layout({ children }: LayoutProps<"/docs">) {
	return (
		<DocsLayout
			tree={source.get}
			{...baseOptions()}
			nav={{ enabled: true }}
		>
			{children}
		</DocsLayout>
	);
}

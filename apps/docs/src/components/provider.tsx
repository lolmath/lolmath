"use client";
import { RouterProvider } from "@lolmath/ui";
import { RootProvider } from "fumadocs-ui/provider";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import SearchDialog from "@/components/search";

export function Provider({ children }: { children: ReactNode }) {
	const router = useRouter();

	return (
		<RootProvider
			search={{
				SearchDialog,
			}}
			theme={{
				forcedTheme: "dark",
			}}
		>
			<RouterProvider navigate={router.push}>{children}</RouterProvider>
		</RootProvider>
	);
}

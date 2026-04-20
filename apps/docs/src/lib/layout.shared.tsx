import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { SquareCode } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<>
					<img src="/img/logo.svg" alt="Logo" width="24" height="24" />
					lolmath docs
				</>
			),
		},
		// see https://fumadocs.dev/docs/ui/navigation/links
		links: [
			{
				text: "Calc",
				url: "/calc/",
			},
			{
				text: "Dev",
				url: "/dev/",
			},
			{
				text: "UI",
				url: "/ui/",
			},
			{
				text: "DDragon",
				url: "/ddragon/",
			},
			{
				text: "UI Storybook",
				url: "https://ui.lolmath.net/",
			},
			{
				type: "icon",
				label: "Gitlab",
				icon: <SquareCode />,
				text: "Gitlab",
				url: "https://gitlab.com/lol-math/lolmath",
			},
		],
		themeSwitch: {
			enabled: false,
		},
	};
}

import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

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
					<img
						src="/img/logo.svg"
						alt="Logo"
				  	width="24"
            height="24"
					/>
					lolmath docs
				</>
			),
		},
		// see https://fumadocs.dev/docs/ui/navigation/links
		links: [],
		themeSwitch: {
			enabled: false,
		},
	};
}

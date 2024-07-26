import "../globals.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";

import type { AppProps } from "next/app";
import type { ReactNode } from "react";

type NextraAppProps = AppProps & {
	Component: AppProps["Component"] & {
		getLayout: (page: ReactNode) => ReactNode;
	};
};

export default function Nextra({ Component, pageProps }: NextraAppProps) {
	return <Component {...pageProps} />;
}

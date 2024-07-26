import { flushSync } from "react-dom";

export function startViewTransition(callback: () => void) {
	if ("startViewTransition" in document) {
		(document.startViewTransition as any)(() => {
			flushSync(callback);
		});
	} else {
		callback();
	}
}

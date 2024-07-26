import { useId } from "react";

export function useCssId() {
	return useId().replaceAll(":", "");
}

import { useMemo } from "react";
import {
	type ExternalToast,
	toast as sonnerToast,
	Toaster,
	type ToasterProps,
} from "sonner";
import { button } from "../button";
import { Spinner } from "../spinner/spinner";
import { heading } from "../typography/heading";
import { text } from "../typography/text";
import classes from "./sonner.module.css";
import sonnerError from "./sonner-error.svg";
import sonnerInfo from "./sonner-info.svg";
import sonnerSuccess from "./sonner-success.svg";
import type { Toast } from "./sonner-types";
import sonnerWarning from "./sonner-warning.svg";

export type ToastVariant = "default" | "hextech";

export const sonner: Toast = sonnerToast;

export type SonnerProps = ExternalToast;

export function Sonner(props: ToasterProps) {
	return (
		<Toaster
			{...props}
			toastOptions={useMemo(
				() => ({
					...props.toastOptions,
					unstyled: true,
					classNames: {
						actionButton: button({
							preset: "dimmed",
							size: "small",
							thin: true,
							className: classes.button,
						}),
						cancelButton: button({
							preset: "dimmed",
							size: "small",
							thin: true,
							className: classes.button,
						}),
						closeButton: button({
							preset: "dimmed",
							size: "small",
							shape: "round",
							thin: true,
							className: classes.closeButton,
						}),
						// content: classes.content,
						toast: classes.toast,
						title: heading({ preset: "h5", className: classes.title }),
						description: text({
							preset: "sm",
							color: "grey100",
						}),
						icon: classes.icon,
						default: classes.default,
						loader: classes.loader,
						content: classes.content,
					},
				}),
				[props.toastOptions],
			)}
			icons={{
				loading: <Spinner />,
				success: <img src={sonnerSuccess} alt="" />,
				error: <img src={sonnerError} alt="" />,
				warning: <img src={sonnerWarning} alt="" />,
				info: <img src={sonnerInfo} alt="" />,
			}}
		/>
	);
}

import { cva } from "cva";
import {
	DialogTrigger as AriaDialogTrigger,
	type DialogTriggerProps as AriaDialogTriggerProps,
	Heading as AriaHeading,
	type HeadingProps as AriaHeadingProps,
	Modal as AriaModal,
	Dialog,
	type DialogProps,
	ModalOverlay,
	type ModalOverlayProps,
} from "react-aria-components";
import { resolveClassName } from "../utilities/resolve-class-name";
import classes from "./modal.module.css";

const overlay = cva({
	base: classes.overlay,
});

const modal = cva({
	base: classes.modal,
});

const dialog = cva({
	base: classes.dialog,
});

interface ModalProps extends Omit<ModalOverlayProps, "children"> {
	modalOverlayClassName?: ModalOverlayProps["className"];
	dialogProps?: Omit<DialogProps, "children">;
	children?: DialogProps["children"];
}

export function Modal({
	modalOverlayClassName,
	dialogProps = {},
	children,
	className,
	...modalProps
}: ModalProps) {
	return (
		<ModalOverlay
			{...modalProps}
			className={(values) => {
				return overlay({
					className: resolveClassName(modalOverlayClassName, values),
				});
			}}
		>
			<AriaModal
				{...modalProps}
				className={(values) =>
					modal({
						className: resolveClassName(className, values),
					})
				}
			>
				<Dialog
					{...dialogProps}
					className={dialog({
						className: dialogProps.className,
					})}
				>
					{children}
				</Dialog>
			</AriaModal>
		</ModalOverlay>
	);
}

const dialogHeading = cva({
	base: classes.dialogHeading,
});

export function DialogHeading({ className, ...props }: AriaHeadingProps) {
	return (
		<AriaHeading
			{...props}
			className={dialogHeading({
				className,
			})}
		/>
	);
}

export function DialogButtons({ children }: { children: React.ReactNode }) {
	return <div className={classes.dialogButtons}>{children}</div>;
}

export function DialogTrigger(props: AriaDialogTriggerProps) {
	return <AriaDialogTrigger {...props} />;
}
